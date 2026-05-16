// 3v3 Tournament Mock Data

export const teams = [
  {
    id: 1,
    name: "Australia",
    logo: "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128",
    players: ["TEL CHANDU", "LADDU 07", "THE ASHOK"],
    stats: { winRate: "0%", avgKills: "0" }
  },
  {
    id: 2,
    name: "England",
    logo: "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128",
    players: ["CHARAN_RAJ", "SMOOTH777?", "TEL SNIPER"],
    stats: { winRate: "0%", avgKills: "0" }
  },
  {
    id: 3,
    name: "India",
    logo: "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128",
    players: ["YASHU 07", "LUCKY! ff", "TW CRAZY"],
    stats: { winRate: "0%", avgKills: "0" }
  },
  {
    id: 4,
    name: "New Zealand",
    logo: "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128",
    players: ["VINAY ff", "SAIRAJ FF 2", "}€honey{€."],
    stats: { winRate: "0%", avgKills: "0" }
  },
  {
    id: 5,
    name: "South Africa",
    logo: "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128",
    players: ["TEL RUSHER", "TE Bhuv4N!?", "AK SPRINTER"],
    stats: { winRate: "0%", avgKills: "0" }
  },
  {
    id: 6,
    name: "Sri Lanka",
    logo: "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128",
    players: ["?Ghost?.", "DESTROYER", "TW SHIVA"],
    stats: { winRate: "0%", avgKills: "0" }
  },
  {
    id: 7,
    name: "West Indies",
    logo: "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128",
    players: ["NOT CLOWN 99", "SALAAR", "ElishaW0438G"],
    stats: { winRate: "0%", avgKills: "0" }
  }
];

// Initial empty standings
export const standings = teams.map((team, index) => ({
  rank: index + 1,
  team: team.name,
  matchesPlayed: 0,
  wins: 0,
  losses: 0,
  nrr: 0,
  points: 0
}));

// A few initial matches for the schedule
export const upcomingMatches = [
  {
    "id": 1,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 1",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 2,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 1",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 3,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "day": "Day 1",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 4,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 1",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 5,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 2",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 6,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 2",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 7,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 2",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 8,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "day": "Day 2",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 9,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 3",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 10,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 3",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 11,
    "team1": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 3",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 12,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "day": "Day 3",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 13,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "day": "Day 4",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 14,
    "team1": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 4",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 15,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "day": "Day 4",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 16,
    "team1": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 4",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 17,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "day": "Day 5",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 18,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "day": "Day 5",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 19,
    "team1": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 5",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 20,
    "team1": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 5",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 21,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 6",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 22,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "day": "Day 6",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 23,
    "team1": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 6",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 24,
    "team1": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 6",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 25,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 7",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 26,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 7",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 27,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "day": "Day 7",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 28,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 7",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 29,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 8",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 30,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 8",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 31,
    "team1": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 8",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 32,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 8",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 33,
    "team1": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 9",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 34,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 9",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 35,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "day": "Day 9",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 36,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 9",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 37,
    "team1": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 9",
    "status": "upcoming",
    "map": "Bermuda",
    "type": "League Stage"
  },
  {
    "id": 38,
    "team1": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "team2": {
      "id": 5,
      "name": "South Africa",
      "logo": "https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=128"
    },
    "day": "Day 10",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 39,
    "team1": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "team2": {
      "id": 6,
      "name": "Sri Lanka",
      "logo": "https://ui-avatars.com/api/?name=SL&background=a855f7&color=fff&size=128"
    },
    "day": "Day 10",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 40,
    "team1": {
      "id": 1,
      "name": "Australia",
      "logo": "https://ui-avatars.com/api/?name=AU&background=10b981&color=fff&size=128"
    },
    "team2": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "day": "Day 10",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 41,
    "team1": {
      "id": 4,
      "name": "New Zealand",
      "logo": "https://ui-avatars.com/api/?name=NZ&background=000000&color=fff&size=128"
    },
    "team2": {
      "id": 7,
      "name": "West Indies",
      "logo": "https://ui-avatars.com/api/?name=WI&background=ef4444&color=fff&size=128"
    },
    "day": "Day 10",
    "status": "upcoming",
    "map": "Kalahari",
    "type": "League Stage"
  },
  {
    "id": 42,
    "team1": {
      "id": 2,
      "name": "England",
      "logo": "https://ui-avatars.com/api/?name=EN&background=3b82f6&color=fff&size=128"
    },
    "team2": {
      "id": 3,
      "name": "India",
      "logo": "https://ui-avatars.com/api/?name=IN&background=f97316&color=fff&size=128"
    },
    "day": "Day 10",
    "status": "upcoming",
    "map": "Purgatory",
    "type": "League Stage"
  },
  {
    "id": 43,
    "team1": {
      "name": "Rank 1",
      "logo": "https://ui-avatars.com/api/?name=R1&background=8b5cf6&color=fff"
    },
    "team2": {
      "name": "Rank 2",
      "logo": "https://ui-avatars.com/api/?name=R2&background=8b5cf6&color=fff"
    },
    "day": "Day 11",
    "status": "upcoming",
    "map": "TBD",
    "type": "Qualifier 1"
  },
  {
    "id": 44,
    "team1": {
      "name": "Rank 3",
      "logo": "https://ui-avatars.com/api/?name=R3&background=8b5cf6&color=fff"
    },
    "team2": {
      "name": "Rank 4",
      "logo": "https://ui-avatars.com/api/?name=R4&background=8b5cf6&color=fff"
    },
    "day": "Day 11",
    "status": "upcoming",
    "map": "TBD",
    "type": "Eliminator"
  },
  {
    "id": 45,
    "team1": {
      "name": "Loser Q1",
      "logo": "https://ui-avatars.com/api/?name=LQ1&background=8b5cf6&color=fff"
    },
    "team2": {
      "name": "Winner Elim",
      "logo": "https://ui-avatars.com/api/?name=WE&background=8b5cf6&color=fff"
    },
    "day": "Day 12",
    "status": "upcoming",
    "map": "TBD",
    "type": "Qualifier 2"
  },
  {
    "id": 46,
    "team1": {
      "name": "Winner Q1",
      "logo": "https://ui-avatars.com/api/?name=WQ1&background=eab308&color=fff"
    },
    "team2": {
      "name": "Winner Q2",
      "logo": "https://ui-avatars.com/api/?name=WQ2&background=eab308&color=fff"
    },
    "day": "Day 13",
    "status": "upcoming",
    "map": "TBD",
    "type": "Grand Final"
  }
];

export const announcements = [
  { id: 1, text: "Welcome to the 3v3 Free Fire CS Championship!", date: "10 mins ago", tag: "Alert" },
  { id: 2, text: "Matches begin tonight. Good luck to all 7 teams.", date: "1 hour ago", tag: "News" }
];

export const tournamentStats = {
  teams: 7,
  matches: 21,
  prizePool: "TBD",
  viewers: "Live"
};

// Empty player stats to start
export const playerStats = {
  mvp: { name: "TBD", team: "TBD", value: "0 Rating", icon: "🏆", badge: "Gold Badge", color: "text-yellow-400", bg: "bg-yellow-400/20", border: "border-yellow-400/30" },
  mostKills: { name: "TBD", team: "TBD", value: "0 Kills", icon: "⚔️", badge: "Orange Badge", color: "text-orange-500", bg: "bg-orange-500/20", border: "border-orange-500/30" },
  mostRevives: { name: "TBD", team: "TBD", value: "0 Revives", icon: "💚", badge: "Green Badge", color: "text-green-500", bg: "bg-green-500/20", border: "border-green-500/30" },
  mostAssists: { name: "TBD", team: "TBD", value: "0 Assists", icon: "🤝", badge: "Purple Badge", color: "text-purple-500", bg: "bg-purple-500/20", border: "border-purple-500/30" },
  headshotHunter: { name: "TBD", team: "TBD", value: "0% HS Rate", icon: "🎯", badge: "Red Badge", color: "text-red-500", bg: "bg-red-500/20", border: "border-red-500/30" },
  damageDealer: { name: "TBD", team: "TBD", value: "0 DMG", icon: "🔥", badge: "Flame Badge", color: "text-rose-500", bg: "bg-rose-500/20", border: "border-rose-500/30" }
};
