import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { teams as mockTeams } from '../../data/mockData';
import { Target, TrendingUp } from 'lucide-react';

const TeamsShowcase = ({ isPreview = false }) => {
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubTeams = onSnapshot(collection(db, 'teams'), (snapshot) => {
      setTeams(snapshot.docs.map(doc => doc.data()));
    });
    const unsubStandings = onSnapshot(collection(db, 'standings'), (snapshot) => {
      setStandings(snapshot.docs.map(doc => doc.data()));
    });
    const unsubPlayers = onSnapshot(collection(db, 'allPlayers'), (snapshot) => {
      setAllPlayers(snapshot.docs.map(doc => doc.data()));
      setLoading(false);
    });

    return () => {
      unsubTeams();
      unsubStandings();
      unsubPlayers();
    };
  }, []);

  const getTeamStats = (teamName) => {
    const tStanding = standings.find(s => s.team === teamName);
    const tPlayers = allPlayers.filter(p => p.team === teamName);
    
    if (!tStanding || tStanding.matchesPlayed === 0) {
      return { winRate: '0%', avgKills: 0 };
    }

    const winRate = Math.round((tStanding.wins / tStanding.matchesPlayed) * 100);
    const totalKills = tPlayers.reduce((sum, p) => sum + (p.kills || 0), 0);
    const avgKills = (totalKills / tStanding.matchesPlayed).toFixed(1);

    return { winRate: `${winRate}%`, avgKills };
  };

  const displayTeams = isPreview ? teams.slice(0, 4) : teams;

  return (
    <section className="py-20 relative bg-[#0f172a]">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">
            Participating <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Teams</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-fuchsia-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTeams.map((team) => (
            <div key={team.id} className="glass-panel glass-panel-hover p-6 group flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-white/5 p-2 mb-6 group-hover:scale-110 transition-transform duration-500 neon-border-primary">
                <img src={team.logo} alt={team.name} className="w-full h-full rounded-full object-cover" />
              </div>
              
              <h3 className="text-xl font-heading font-bold text-white mb-4 text-center">{team.name}</h3>
              
              <div className="w-full space-y-2 mb-6">
                {team.players.map((player, idx) => (
                  <div key={idx} className="bg-white/5 px-3 py-2 rounded-md text-sm text-gray-300 text-center font-medium border border-white/5 group-hover:border-purple-500/30 transition-colors">
                    {player}
                  </div>
                ))}
              </div>

              <div className="w-full pt-4 border-t border-white/10 flex justify-between">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-purple-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-bold">{getTeamStats(team.name).winRate}</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">Win Rate</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-cyan-400">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-bold">{getTeamStats(team.name).avgKills}</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">Avg Kills</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {isPreview && (
          <div className="mt-12 text-center">
            <Link to="/teams" className="text-purple-400 hover:text-purple-300 font-medium uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 mx-auto">
              View All Teams <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamsShowcase;
