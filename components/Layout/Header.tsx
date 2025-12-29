
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { UserProfile } from '../../App.tsx';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  
  return (
    <div className={`flex items-center gap-3 ${isLg ? 'flex-col' : 'flex-row'}`}>
      <div className={`
        ${isSm ? 'w-9 h-9 rounded-xl p-1.5' : isLg ? 'w-36 h-36 rounded-4xl p-6' : 'w-12 h-12 rounded-2xl p-2.5'} 
        bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6
      `}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A21" />
              <stop offset="100%" stopColor="#D45B0D" />
            </linearGradient>
          </defs>
          <path d="M20,80 L50,20 L80,80 Z" fill="none" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="55" r="12" fill="#0D234D" />
          <path d="M50,20 L50,43" stroke="#FF7A21" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <h1 className={`logo-brand-text ${isSm ? 'text-lg' : isLg ? 'text-6xl mt-8' : 'text-2xl'}`}>
        <span className="text-brand-navy dark:text-white">Multi</span><span className="text-brand-orange">Verse</span>
      </h1>
    </div>
  );
};

export const Header: React.FC<{
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}> = ({ toggleSidebar, isDarkMode, toggleDarkMode, user, onOpenAuth, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="h-28 w-full" /> {/* Top padding for floating nav */}
      <nav className="navbar px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-brand-navy dark:text-slate-300 md:hidden hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            <i className="fas fa-bars-staggered"></i>
          </button>
          <NavLink to="/" className="group flex items-center transition-all">
            <Logo size="sm" />
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-all"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun text-amber-500' : 'fa-moon text-indigo-400'}`}></i>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-transparent hover:border-brand-orange/30 transition-all"
              >
                <img src={user.avatar} alt="User" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                <i className={`fas fa-chevron-down text-[8px] text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 animate-in slide-in-from-top-2 border border-slate-100 dark:border-slate-800">
                  <div className="p-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Authenticated</p>
                    <p className="text-xs font-bold truncate dark:text-white">{user.email}</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 p-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="px-6 py-2 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-navy/10"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
