import React, { useState } from 'react';
import { X, Lock, KeyRound } from 'lucide-react';

const AdminLoginModal = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      sessionStorage.setItem('isAdmin', 'true');
      onLogin();
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#09090b] border border-cyan-500/30 rounded-2xl w-full max-w-md p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-black text-white font-heading uppercase tracking-wider">Admin Access</h2>
          <p className="text-sm text-gray-400 mt-2">Enter the shared password to authorize.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-500/50'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-cyan-500'} transition-all`}
                placeholder="Enter password"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-xs mt-2 font-medium flex items-center gap-1">⚠️ {error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            Unlock Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
