import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { upcomingMatches as mockMatches } from '../../data/mockData';
import { CalendarDays, MapPin, Upload, Lock, Unlock, Trophy, Image as ImageIcon, X } from 'lucide-react';
import UploadModal from '../admin/UploadModal';
import AdminLoginModal from '../admin/AdminLoginModal';
import UploadProofModal from '../admin/UploadProofModal';

const UpcomingMatches = ({ isPreview = false }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [proofMatch, setProofMatch] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [viewResultImage, setViewResultImage] = useState(null);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
    const q = query(collection(db, 'matches'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      if (data.length > 0) {
        setMatches(data);
      } else {
        setMatches(mockMatches);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching matches:", error);
      setMatches(mockMatches);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayMatches = isPreview ? matches.filter(m => m.status === 'upcoming').slice(0, 2) : matches;

  return (
    <section className="py-20 relative bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center relative">
          {!isPreview && (
            <div className="absolute right-0 top-0 flex items-center gap-2">
              {isAdmin ? (
                <>
                  <button 
                    onClick={async () => {
                      const isConfirmed = window.confirm('Are you sure you want to seed the database? WARNING: This will overwrite all current matches and stats and reset the tournament.');
                      if (!isConfirmed) return;
                      const { seedDatabase } = await import('../../lib/dbHelper');
                      await seedDatabase();
                      alert('Database Seeded Successfully!');
                    }}
                    className="text-xs bg-purple-900/50 text-purple-200 px-3 py-1 rounded hover:bg-purple-900/80 transition-colors"
                  >
                    Seed DB
                  </button>
                  <button 
                    onClick={() => {
                      sessionStorage.removeItem('isAdmin');
                      setIsAdmin(false);
                    }}
                    className="p-1 rounded bg-red-900/50 text-red-400 hover:bg-red-900/80 transition-colors"
                    title="Logout Admin"
                  >
                    <Unlock className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowAdminLogin(true)}
                  className="p-1 rounded bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                  title="Admin Login"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">
            Tournament <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Schedule</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4"></div>
          {loading && <p className="text-cyan-400 animate-pulse text-sm">Syncing Schedule...</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayMatches.map((match) => (
            <div key={match.id} className="glass-panel p-6 relative overflow-hidden group">
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 bg-white/5 text-white border rounded-full text-xs font-bold tracking-wider ${match.type !== 'League Stage' ? 'border-yellow-500/50 text-yellow-400' : 'border-white/10'}`}>
                  Match {match.id} <span className="opacity-50">|</span> {match.type || 'League Stage'}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                {match.status === 'completed' && !isPreview && isAdmin && !match.resultImageUrl && (
                  <button 
                    onClick={() => setProofMatch(match)}
                    className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-green-500/40 transition-colors"
                  >
                    <Upload className="w-3 h-3" /> Upload Proof
                  </button>
                )}
                {match.status === 'upcoming' && !isPreview && isAdmin && (
                  <button 
                    onClick={() => setSelectedMatch(match)}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-cyan-500/40 transition-colors"
                  >
                    <Upload className="w-3 h-3" /> Sync Stats
                  </button>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  match.status === 'live' ? 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse' :
                  match.status === 'upcoming' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' :
                  'bg-gray-500/20 text-gray-400 border-gray-500/50'
                }`}>
                  {match.status}
                </span>
              </div>

              <div className="flex flex-row items-center justify-between mt-8 gap-2 sm:gap-0">
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/5 p-1 transition-all duration-300 ${match.winner === match?.team1?.name ? 'ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105' : ''}`}>
                    <img src={match?.team1?.logo || 'https://ui-avatars.com/api/?name=T1'} alt={match?.team1?.name || 'Team 1'} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className={`font-heading font-bold text-xs sm:text-lg text-center mt-2 ${match.winner === match?.team1?.name ? 'text-cyan-400' : 'text-white'}`}>
                    {match?.team1?.name || 'Unknown'}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center w-1/3 my-0">
                  {match.status === 'completed' ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xl sm:text-3xl font-black text-white bg-black/50 px-2 sm:px-4 py-1 sm:py-2 rounded-xl border border-white/10 shadow-xl text-center">
                        {match.scores?.[match?.team1?.name] || 0} - {match.scores?.[match?.team2?.name] || 0}
                      </span>
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest mt-3 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 mb-3">Winner: {match.winner}</span>
                      {match.resultImageUrl && (
                        <button 
                          onClick={() => setViewResultImage(match.resultImageUrl)}
                          className="flex items-center gap-1 text-[10px] uppercase font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30"
                        >
                          <ImageIcon className="w-3 h-3" /> View Result
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-xl sm:text-3xl font-black text-gray-500 italic">VS</span>
                  )}
                  {match.map && match.status !== 'completed' && (
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{match.map}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/5 p-1 transition-all duration-300 ${match.winner === match?.team2?.name ? 'ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105' : ''}`}>
                    <img src={match?.team2?.logo || 'https://ui-avatars.com/api/?name=T2'} alt={match?.team2?.name || 'Team 2'} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className={`font-heading font-bold text-xs sm:text-lg text-center mt-2 ${match.winner === match?.team2?.name ? 'text-cyan-400' : 'text-white'}`}>
                    {match?.team2?.name || 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-cyan-400 font-bold tracking-widest uppercase text-sm">
                <CalendarDays className="w-4 h-4" />
                <span>{match.day || match.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        {isPreview && (
          <div className="mt-12 text-center">
            <Link to="/schedule" className="text-cyan-400 hover:text-cyan-300 font-medium uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 mx-auto">
              View Full Schedule <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>

      {selectedMatch && (
        <UploadModal 
          match={selectedMatch} 
          onClose={() => setSelectedMatch(null)} 
        />
      )}

      {proofMatch && (
        <UploadProofModal 
          match={proofMatch} 
          onClose={() => setProofMatch(null)} 
        />
      )}

      {showAdminLogin && (
        <AdminLoginModal 
          onClose={() => setShowAdminLogin(false)} 
          onLogin={() => {
            setIsAdmin(true);
            setShowAdminLogin(false);
          }} 
        />
      )}

      {viewResultImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setViewResultImage(null)}>
          <button 
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            onClick={() => setViewResultImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={viewResultImage} 
            alt="Match Result Proof" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
            onClick={e => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};

export default UpcomingMatches;
