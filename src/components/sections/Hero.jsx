import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trophy, Users, Swords, ChevronRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [statsData, setStatsData] = useState({ teams: 0, matches: 0 });

  useEffect(() => {
    const unsubscribeTeams = onSnapshot(collection(db, 'teams'), (snapshot) => {
      setStatsData(prev => ({ ...prev, teams: snapshot.size }));
    });
    
    const unsubscribeMatches = onSnapshot(collection(db, 'matches'), (snapshot) => {
      setStatsData(prev => ({ ...prev, matches: snapshot.size }));
    });

    return () => {
      unsubscribeTeams();
      unsubscribeMatches();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hex-pattern">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="animate-fade-in-up w-full">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-purple-500/30 mb-8 animate-float">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Live Tournament</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase leading-tight">
              Free Fire CS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 neon-text-primary">
                Championship
              </span>
            </h1>
            
            <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
              Witness the ultimate 4v4 tactical battle. Battle through the brackets to claim the ultimate glory.
            </p>

            {/* Integrated Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
              <div className="glass-panel px-6 py-4 flex items-center gap-4 border-l-2 border-l-purple-500 group hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Registered</p>
                  <p className="text-2xl font-bold text-white">{statsData.teams} Teams</p>
                </div>
              </div>
              
              <div className="glass-panel px-6 py-4 flex items-center gap-4 border-l-2 border-l-cyan-500 group hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Swords className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Total Battles</p>
                  <p className="text-2xl font-bold text-white">{statsData.matches} Matches</p>
                </div>
              </div>

              <div className="glass-panel px-6 py-4 flex items-center gap-4 border-l-2 border-l-yellow-500 group hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Ultimate Prize</p>
                  <p className="text-2xl font-bold text-white">1 Champion</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/schedule" className="btn-primary group flex items-center justify-center gap-2">
                <CalendarDays className="w-5 h-5" />
                View Schedule
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/standings" className="btn-secondary group flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                Live Standings
              </Link>
            </div>
          </div>

          </div>
      </div>
    </div>
  );
};

export default Hero;
