import React from 'react';
import { X, Trophy, Medal } from 'lucide-react';

const StatRankingModal = ({ stat, players, onClose }) => {
  // Determine how to sort and display the values based on the stat ID
  const sortedPlayers = [...players].sort((a, b) => {

    if (stat.id === 'hs') {
      const avgA = a.matchesPlayed ? (a.totalHsPercentage || 0) / a.matchesPlayed : 0;
      const avgB = b.matchesPlayed ? (b.totalHsPercentage || 0) / b.matchesPlayed : 0;
      return avgB - avgA;
    }
    // Default numerical sort (kills, damage, revives, assists)
    return (b[stat.id] || 0) - (a[stat.id] || 0);
  });

  const getDisplayValue = (player) => {
    if (stat.id === 'mvps') return `${player.mvps || 0} MVPs`;
    if (stat.id === 'hs') {
      const avg = player.matchesPlayed ? (player.totalHsPercentage || 0) / player.matchesPlayed : 0;
      return `${avg.toFixed(2)}% Avg HS`;
    }
    if (stat.id === 'damage') return `${player.damage || 0} DMG`;
    if (stat.id === 'kills') return `${player.kills || 0} Kills`;
    if (stat.id === 'revives') return `${player.revives || 0} Revives`;
    if (stat.id === 'assists') return `${player.assists || 0} Assists`;
    return player[stat.id];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`relative bg-[#09090b] border ${stat.border} rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl`}>
        {/* Glow Effect */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[80px] opacity-20 pointer-events-none ${stat.bg}`}></div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} ${stat.border} border`}>
              {stat.icon}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white font-heading uppercase tracking-wider">{stat.badge} Leaderboard</h2>
              <p className="text-gray-400 text-sm">Full Player Rankings</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="overflow-y-auto p-4 flex-1 custom-scrollbar relative z-10">
          {sortedPlayers.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No player data available yet.</p>
          ) : (
            <div className="space-y-2">
              {sortedPlayers.map((player, idx) => (
                <div 
                  key={player.name}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    idx === 0 ? `bg-white/5 ${stat.border}` : 'bg-transparent border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 font-black text-lg text-center">
                      {idx === 0 ? <Trophy className={`w-6 h-6 mx-auto ${stat.color}`} /> : 
                       idx === 1 ? <Medal className="w-6 h-6 mx-auto text-gray-400" /> : 
                       idx === 2 ? <Medal className="w-6 h-6 mx-auto text-amber-700" /> : 
                       <span className="text-gray-600">#{idx + 1}</span>}
                    </div>
                    <div>
                      <h4 className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-300'}`}>{player.name}</h4>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{player.team}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`font-black text-lg ${idx === 0 ? stat.color : 'text-gray-400'}`}>
                      {getDisplayValue(player)}
                    </span>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">{player.matchesPlayed || 0} Matches</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatRankingModal;
