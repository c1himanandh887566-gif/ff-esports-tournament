import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { standings as mockStandings } from '../../data/mockData';

const LiveStandings = ({ isPreview = false }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query without orderBy to avoid needing composite indexes on Firestore
    const q = query(collection(db, 'standings'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      
      // Sort client-side: Primary sort by points, secondary sort by NRR
      const sortedData = data.sort((a, b) => {
        const pointsDiff = (b.points || 0) - (a.points || 0);
        if (pointsDiff !== 0) return pointsDiff;
        return (b.nrr || 0) - (a.nrr || 0);
      });

      // Re-assign ranks based on sorted order
      const rankedData = sortedData.map((team, idx) => ({ ...team, rank: idx + 1 }));
      if (rankedData.length > 0) {
        setStandings(rankedData);
      } else {
        setStandings(mockStandings); // Fallback if empty
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching standings:", error);
      setStandings(mockStandings); // Fallback on error
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayStandings = isPreview ? standings.slice(0, 5) : standings;

  return (
    <section className="py-20 relative bg-[#09090b]">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left mb-12">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">
              Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Standings</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
          <p className="text-gray-400 mt-6 md:mt-0 font-medium uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {loading ? 'Connecting...' : 'Live Data'}
          </p>
        </div>

        <div className="glass-panel overflow-hidden border-purple-500/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-[10px] md:text-xs uppercase tracking-wider font-heading">
                  <th className="p-2 md:p-6 font-semibold w-12 md:w-24 text-center md:text-left">Pos</th>
                  <th className="p-2 md:p-6 font-semibold">Team</th>
                  <th className="p-2 md:p-6 font-semibold text-center" title="Matches Played"><span className="hidden md:inline">Matches Played</span><span className="md:hidden">MP</span></th>
                  <th className="p-2 md:p-6 font-semibold text-center" title="Wins"><span className="hidden md:inline">Wins</span><span className="md:hidden">W</span></th>
                  <th className="p-2 md:p-6 font-semibold text-center" title="Losses"><span className="hidden md:inline">Losses</span><span className="md:hidden">L</span></th>
                  <th className="p-2 md:p-6 font-semibold text-center" title="Net Round Rate"><span className="hidden md:inline">Net Round Rate</span><span className="md:hidden">NRR</span></th>
                  <th className="p-2 md:p-6 font-semibold text-center text-purple-400" title="Points"><span className="hidden md:inline">Points</span><span className="md:hidden">PTS</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayStandings.map((team, index) => (
                  <tr 
                    key={team.team} 
                    className={`transition-colors hover:bg-white/5 ${
                      index < 4 ? 'bg-gradient-to-r from-purple-900/10 to-transparent relative border-l-4 border-l-purple-500' : ''
                    }`}
                  >
                    <td className="p-2 md:p-6 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className={`font-heading font-bold text-sm md:text-lg ${
                          index === 0 ? 'text-yellow-400' : 
                          index === 1 ? 'text-gray-400' : 
                          index === 2 ? 'text-amber-700' : 
                          index === 3 ? 'text-purple-400' : 'text-gray-500'
                        }`}>
                          #{team.rank}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:p-6 font-bold text-white tracking-wide text-xs md:text-base">{team.team}</td>
                    <td className="p-2 md:p-6 text-center text-gray-400 text-xs md:text-base">{team.matchesPlayed || 0}</td>
                    <td className="p-2 md:p-6 text-center text-gray-400 text-xs md:text-base">{team.wins || 0}</td>
                    <td className="p-2 md:p-6 text-center text-gray-400 text-xs md:text-base">{team.losses || 0}</td>
                    <td className="p-2 md:p-6 text-center text-gray-400 text-xs md:text-base">{team.nrr > 0 ? `+${team.nrr}` : team.nrr || 0}</td>
                    <td className="p-2 md:p-6 text-center font-black text-sm md:text-xl text-purple-400">{team.points || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-6 glass-panel border border-cyan-500/30 text-sm text-gray-300">
          <h4 className="text-cyan-400 font-bold mb-3 text-lg uppercase tracking-widest font-heading">Points System</h4>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><span className="text-white font-bold">Win:</span> 5 points</li>
            <li><span className="text-white font-bold">Loss by 3 or less rounds:</span> 2 points</li>
          </ul>
          <p className="text-purple-400 font-bold text-base uppercase tracking-wider">Top 4 teams qualify for playoffs.</p>
        </div>
        
        {isPreview && (
          <div className="mt-12 text-center">
            <Link to="/standings" className="text-blue-400 hover:text-blue-300 font-medium uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 mx-auto">
              View Full Standings <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveStandings;
