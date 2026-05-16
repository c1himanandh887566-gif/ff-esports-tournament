import { announcements } from '../../data/mockData';
import { Bell, ArrowRight, Zap, Trophy, ShieldAlert } from 'lucide-react';

const Announcements = () => {
  return (
    <section className="py-20 relative bg-[#09090b] border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4 tracking-tight">
            Tournament <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Updates</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {announcements.map((item, idx) => {
            const isAlert = item.tag === 'Alert';
            const Icon = isAlert ? ShieldAlert : item.tag === 'News' ? Zap : Trophy;
            const colorClass = isAlert ? 'text-red-400' : item.tag === 'News' ? 'text-cyan-400' : 'text-purple-400';
            const bgClass = isAlert ? 'bg-red-500/10 border-red-500/30' : item.tag === 'News' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-purple-500/10 border-purple-500/30';

            return (
              <div key={item.id} className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Background glow effect on hover */}
                <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 ${bgClass.split(' ')[0]}`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl border ${bgClass} ${colorClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-black/50 px-3 py-1 rounded-full border border-white/5">{item.date}</span>
                  </div>
                  
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${colorClass}`}>
                    {item.tag}
                  </span>
                  <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
