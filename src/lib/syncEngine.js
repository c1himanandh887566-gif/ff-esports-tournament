import { getDocs, collection, doc, writeBatch, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Helper to calculate Levenshtein distance for fuzzy matching
const levenshtein = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
                   matrix[i - 1][j] + 1) // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

// Fuzzy match a player name against all teams to find which team they belong to
export const identifyTeam = (playerName, teams) => {
  let bestMatch = null;
  let minDistance = Infinity;

  const cleanPlayerName = playerName.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const team of teams) {
    for (const p of team.players) {
      const cleanP = p.toLowerCase().replace(/[^a-z0-9]/g, '');
      const dist = levenshtein(cleanPlayerName, cleanP);
      
      // Exact match or very close match
      if (dist < minDistance && dist <= 3) { // Tolerance of 3 characters
        minDistance = dist;
        bestMatch = team.name;
      }
    }
  }
  
  return bestMatch;
};

// Fuzzy match a player name against registered tournament players
export const identifyPlayer = (extractedName, registeredNames) => {
  let bestMatch = null;
  let minDistance = Infinity;

  const cleanExtracted = extractedName.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const regName of registeredNames) {
    const cleanReg = regName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const dist = levenshtein(cleanExtracted, cleanReg);
    
    // Tolerance of 4 characters to handle OCR errors (e.g., "OT CLOWN 99" -> "NOT CLOWN 99")
    if (dist < minDistance && dist <= 4) { 
      minDistance = dist;
      bestMatch = regName;
    }
  }
  
  return bestMatch;
};

export const publishMatchResult = async (match, parsedTeamsData, matchScores) => {
  try {
    const matchId = match.id.toString();
    const teamsSnap = await getDocs(collection(db, 'teams'));
    const allTeams = teamsSnap.docs.map(d => d.data());
    
    // Group players into left and right based on gemini flag
    let leftTeamPlayers = [];
    let rightTeamPlayers = [];
    
    parsedTeamsData.forEach(player => {
      if (player.isLeftTeam) {
        leftTeamPlayers.push(player);
      } else {
        rightTeamPlayers.push(player);
      }
    });

    // Identify which actual team names correspond to left and right
    const identifyTeamGroup = (players) => {
      const counts = {};
      players.forEach(p => {
        const t = identifyTeam(p.name, allTeams);
        if (t) {
          counts[t] = (counts[t] || 0) + 1;
        }
      });
      // Return team with most matches
      const best = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
      return best || 'Unknown';
    };

    const leftTeamName = identifyTeamGroup(leftTeamPlayers);
    const rightTeamName = identifyTeamGroup(rightTeamPlayers);

    const expectedTeam1 = match.team1?.name;
    const expectedTeam2 = match.team2?.name;

    // Verify teams
    if (leftTeamName !== 'Unknown' && leftTeamName !== expectedTeam1 && leftTeamName !== expectedTeam2) {
      throw new Error(`Verification Failed: Image contains players from ${leftTeamName}, but the scheduled match is ${expectedTeam1} vs ${expectedTeam2}.`);
    }
    if (rightTeamName !== 'Unknown' && rightTeamName !== expectedTeam1 && rightTeamName !== expectedTeam2) {
      throw new Error(`Verification Failed: Image contains players from ${rightTeamName}, but the scheduled match is ${expectedTeam1} vs ${expectedTeam2}.`);
    }

    // Force teams to be expected teams if they were Unknown but we have match scores
    // Actually, we can just map left->team1, right->team2 for score assignment if AI failed to identify team
    let finalLeftTeam = leftTeamName !== 'Unknown' ? leftTeamName : expectedTeam1;
    let finalRightTeam = rightTeamName !== 'Unknown' ? rightTeamName : expectedTeam2;

    // Ensure they don't map to the same team
    if (finalLeftTeam === finalRightTeam) {
      finalRightTeam = finalLeftTeam === expectedTeam1 ? expectedTeam2 : expectedTeam1;
    }

    let winningTeam = null;
    let losingTeam = null;
    let winningScore = 0;
    let losingScore = 0;

    if (matchScores.left > matchScores.right) {
      winningTeam = finalLeftTeam;
      winningScore = matchScores.left;
      losingTeam = finalRightTeam;
      losingScore = matchScores.right;
    } else if (matchScores.right > matchScores.left) {
      winningTeam = finalRightTeam;
      winningScore = matchScores.right;
      losingTeam = finalLeftTeam;
      losingScore = matchScores.left;
    }

    const batch = writeBatch(db);

    // 1. Update Standings
    if (winningTeam && winningTeam !== 'Unknown') {
      const winRef = doc(db, 'standings', winningTeam);
      const winSnap = await getDoc(winRef);
      if (winSnap.exists()) {
        const winData = winSnap.data();
        const roundDiff = winningScore - losingScore;
        batch.update(winRef, {
          matchesPlayed: (winData.matchesPlayed || 0) + 1,
          wins: (winData.wins || 0) + 1,
          nrr: (winData.nrr || 0) + roundDiff,
          points: (winData.points || 0) + 5
        });
      }
    }

    if (losingTeam && losingTeam !== 'Unknown') {
      const loseRef = doc(db, 'standings', losingTeam);
      const loseSnap = await getDoc(loseRef);
      if (loseSnap.exists()) {
        const loseData = loseSnap.data();
        const roundDiff = losingScore - winningScore; // This will be negative
        
        let bonusPoints = 0;
        if (winningScore - losingScore <= 3) {
          bonusPoints = 2; // Loss by 3 or less rounds
        }

        batch.update(loseRef, {
          matchesPlayed: (loseData.matchesPlayed || 0) + 1,
          losses: (loseData.losses || 0) + 1,
          nrr: (loseData.nrr || 0) + roundDiff,
          points: (loseData.points || 0) + bonusPoints
        });
      }
    }

    // 2. Update All Players Stats
    const allPlayersSnap = await getDocs(collection(db, 'allPlayers'));
    const allPlayersMap = {};
    allPlayersSnap.forEach(d => allPlayersMap[d.id] = d.data());

    parsedTeamsData.forEach(player => {
      const team = identifyTeam(player.name, allTeams) || 'Unknown';
      const k = parseInt(player.k || 0);
      const r = parseInt(player.revives || 0);
      const a = parseInt(player.a || 0);
      const dmg = parseInt(player.dmg || 0);
      const isMvp = player.mvp ? 1 : 0;
      const hsPercentage = player.hs ? parseFloat(player.hs.replace('%', '')) : 0;
      const playerRating = player.rating ? parseFloat(player.rating) : 0;

      // Fuzzy match the extracted name against the registered tournament players
      const registeredNames = Object.keys(allPlayersMap);
      const matchedRegisteredName = identifyPlayer(player.name, registeredNames);

      if (matchedRegisteredName) {
        const pData = allPlayersMap[matchedRegisteredName];
        batch.update(doc(db, 'allPlayers', matchedRegisteredName), {
          kills: (pData.kills || 0) + k,
          revives: (pData.revives || 0) + r,
          assists: (pData.assists || 0) + a,
          damage: (pData.damage || 0) + dmg,
          mvps: (pData.mvps || 0) + isMvp,
          matchesPlayed: (pData.matchesPlayed || 0) + 1,
          totalHsPercentage: (pData.totalHsPercentage || 0) + hsPercentage,
          totalRating: (pData.totalRating || 0) + playerRating
        });
      } else {
        // If the player is a random/non-tournament player or OCR failed completely,
        // we DO NOT add them to the database to prevent polluting the stats.
        console.warn(`Player ${player.name} not found in registered roster. Ignoring stats.`);
      }
    });

    // 3. Update Match
    const matchRef = doc(db, 'matches', matchId);
    batch.update(matchRef, {
      status: 'completed',
      resultData: parsedTeamsData,
      winner: winningTeam || 'Unknown',
      scores: {
        [finalLeftTeam]: matchScores.left,
        [finalRightTeam]: matchScores.right
      }
    });

    await batch.commit();
    return { success: true, winningTeam, losingTeam };
    
  } catch (error) {
    console.error("Error in sync engine:", error);
    throw error;
  }
};
