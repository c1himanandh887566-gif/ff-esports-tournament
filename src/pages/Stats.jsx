import React, { useState, useEffect } from 'react';
import { Trophy, Target, Flame, HeartPulse, Crosshair, Users } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import StatRankingModal from '../components/sections/StatRankingModal';

const Stats = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'allPlayers'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setAllPlayers(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching stats:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateTopStats = (players) => {
    // Default placeholders if no players yet
    const defaults = [
      { id: 'mvps', badge: 'Tournament MVP', name: 'TBD', team: 'TBD', value: '0 MVPs', icon: <Trophy className="w-8 h-8" />, color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/30' },
      { id: 'kills', badge: 'Most Kills', name: 'TBD', team: 'TBD', value: '0 Kills', icon: <Target className="w-8 h-8" />, color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/30' },
      { id: 'damage', badge: 'Damage Dealer', name: 'TBD', team: 'TBD', value: '0 DMG', icon: <Flame className="w-8 h-8" />, color: 'text-rose-500', bg: 'bg-rose-500/20', border: 'border-rose-500/30' },
      { id: 'revives', badge: 'Top Medic', name: 'TBD', team: 'TBD', value: '0 Revives', icon: <HeartPulse className="w-8 h-8" />, color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/30' },
      { id: 'assists', badge: 'Top Assist', name: 'TBD', team: 'TBD', value: '0 Assists', icon: <Users className="w-8 h-8" />, color: 'text-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
      { id: 'hs', badge: 'Headshot Hunter', name: 'TBD', team: 'TBD', value: '0% Avg HS', icon: <Crosshair className="w-8 h-8" />, color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/30' }
    ];

    if (!players || players.length === 0) return defaults;

    const mvp = [...players].sort((a, b) => (b.mvps || 0) - (a.mvps || 0))[0];
    const mostKills = [...players].sort((a, b) => (b.kills || 0) - (a.kills || 0))[0];
    const mostRevives = [...players].sort((a, b) => (b.revives || 0) - (a.revives || 0))[0];
    const mostAssists = [...players].sort((a, b) => (b.assists || 0) - (a.assists || 0))[0];
    const headshotHunter = [...players].sort((a, b) => {
      const avgA = a.matchesPlayed ? (a.totalHsPercentage || 0) / a.matchesPlayed : 0;
      const avgB = b.matchesPlayed ? (b.totalHsPercentage || 0) / b.matchesPlayed : 0;
      return avgB - avgA;
    })[0];
    const damageDealer = [...players].sort((a, b) => (b.damage || 0) - (a.damage || 0))[0];

    return [
      {
        id: 'mvps',
        badge: 'Tournament MVP',
        name: mvp?.mvps > 0 ? mvp.name : 'TBD',
        team: mvp?.mvps > 0 ? mvp.team : 'TBD',
        value: mvp?.mvps > 0 ? `${mvp.mvps} MVPs` : '0 MVPs',
        icon: <Trophy className="w-8 h-8" />,
        color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/30'
      },
      {
        id: 'kills',
        badge: 'Most Kills',
        name: mostKills?.kills > 0 ? mostKills.name : 'TBD',
        team: mostKills?.kills > 0 ? mostKills.team : 'TBD',
        value: mostKills?.kills > 0 ? `${mostKills.kills} Kills` : '0 Kills',
        icon: <Target className="w-8 h-8" />,
        color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/30'
      },
      {
        id: 'damage',
        badge: 'Damage Dealer',
        name: damageDealer?.damage > 0 ? damageDealer.name : 'TBD',
        team: damageDealer?.damage > 0 ? damageDealer.team : 'TBD',
        value: damageDealer?.damage > 0 ? `${damageDealer.damage} DMG` : '0 DMG',
        icon: <Flame className="w-8 h-8" />,
        color: 'text-rose-500', bg: 'bg-rose-500/20', border: 'border-rose-500/30'
      },
      {
        id: 'revives',
        badge: 'Top Medic',
        name: mostRevives?.revives > 0 ? mostRevives.name : 'TBD',
        team: mostRevives?.revives > 0 ? mostRevives.team : 'TBD',
        value: mostRevives?.revives > 0 ? `${mostRevives.revives} Revives` : '0 Revives',
        icon: <HeartPulse className="w-8 h-8" />,
        color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/30'
      },
      {
        id: 'assists',
        badge: 'Top Assist',
        name: mostAssists?.assists > 0 ? mostAssists.name : 'TBD',
        team: mostAssists?.assists > 0 ? mostAssists.team : 'TBD',
        value: mostAssists?.assists > 0 ? `${mostAssists.assists} Assists` : '0 Assists',
        icon: <Users className="w-8 h-8" />,
        color: 'text-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500/30'
      },
      {
        id: 'hs',
        badge: 'Headshot Hunter',
        name: (headshotHunter?.matchesPlayed > 0 && headshotHunter?.totalHsPercentage > 0) ? headshotHunter.name : 'TBD',
        team: (headshotHunter?.matchesPlayed > 0 && headshotHunter?.totalHsPercentage > 0) ? headshotHunter.team : 'TBD',
        value: (headshotHunter?.matchesPlayed > 0 && headshotHunter?.totalHsPercentage > 0) ? `${(headshotHunter.totalHsPercentage / headshotHunter.matchesPlayed).toFixed(2)}% Avg HS` : '0% Avg HS',
        icon: <Crosshair className="w-8 h-8" />,
        color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/30'
      }
    ];
  };

  const badges = calculateTopStats(allPlayers);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4 relative z-10">
            Tournament <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Leaders</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Celebrating the most outstanding performances in the Free Fire CS Championship. Click any stat to view the full leaderboard.
          </p>
          {loading && <p className="text-cyan-400 mt-4 animate-pulse">Loading live stats...</p>}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedStat(badge)}
              className={`glass-panel p-6 rounded-2xl border ${badge.border} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-20 ${badge.bg}`}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10 pointer-events-none">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${badge.bg} ${badge.color}`}>
                    {badge.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white font-heading">{badge.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{badge.team}</p>
                </div>
                <div className={`text-4xl w-14 h-14 rounded-full flex items-center justify-center ${badge.bg} ${badge.border} border`}>
                  {badge.icon}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5 relative z-10 flex justify-between items-center pointer-events-none">
                <p className={`text-3xl font-black ${badge.color} font-heading`}>
                  {badge.value}
                </p>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest group-hover:text-white transition-colors">View All →</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedStat && (
        <StatRankingModal 
          stat={selectedStat} 
          players={allPlayers} 
          onClose={() => setSelectedStat(null)} 
        />
      )}
    </div>
  );
};

export default Stats;
