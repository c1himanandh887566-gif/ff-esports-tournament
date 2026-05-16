import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { standings, playerStats, upcomingMatches, announcements, tournamentStats, teams } from '../data/mockData';

export const seedDatabase = async () => {
  const batch = writeBatch(db);

  // Clear existing teams
  const oldTeamsSnap = await getDocs(collection(db, 'teams'));
  oldTeamsSnap.forEach(d => batch.delete(d.ref));

  // Clear existing standings
  const oldStandingsSnap = await getDocs(collection(db, 'standings'));
  oldStandingsSnap.forEach(d => batch.delete(d.ref));

  // Clear existing matches
  const oldMatchesSnap = await getDocs(collection(db, 'matches'));
  oldMatchesSnap.forEach(d => batch.delete(d.ref));

  // Clear existing allPlayers
  const oldPlayersSnap = await getDocs(collection(db, 'allPlayers'));
  oldPlayersSnap.forEach(d => batch.delete(d.ref));

  // Seed Teams
  teams.forEach(team => {
    const ref = doc(collection(db, 'teams'), team.name);
    batch.set(ref, team);
  });

  // Seed Standings
  standings.forEach(team => {
    const ref = doc(collection(db, 'standings'), team.team);
    batch.set(ref, team);
  });

  // Seed Player Stats (legacy placeholder, keep for fallback if needed, or just clear)
  Object.keys(playerStats).forEach(key => {
    const ref = doc(collection(db, 'playerStats'), key);
    batch.set(ref, playerStats[key]);
  });

  // Seed All Players
  teams.forEach(team => {
    team.players.forEach(playerName => {
      const ref = doc(collection(db, 'allPlayers'), playerName);
      batch.set(ref, {
        name: playerName,
        team: team.name,
        kills: 0,
        assists: 0,
        damage: 0,
        revives: 0,
        mvps: 0,
        matchesPlayed: 0,
        totalHsPercentage: 0,
        totalRating: 0
      });
    });
  });

  // Seed Matches
  upcomingMatches.forEach(match => {
    const ref = doc(collection(db, 'matches'), match.id.toString());
    batch.set(ref, match);
  });

  // Seed Announcements
  announcements.forEach(ann => {
    const ref = doc(collection(db, 'announcements'), ann.id.toString());
    batch.set(ref, ann);
  });

  // Seed Tournament Stats
  const statsRef = doc(collection(db, 'tournamentStats'), 'main');
  batch.set(statsRef, tournamentStats);

  await batch.commit();
  console.log("Database seeded successfully!");
};
