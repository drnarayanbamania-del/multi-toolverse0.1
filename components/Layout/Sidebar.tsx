
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, TOOLS } from '../../constants.tsx';
import { UserProfile } from '../../App.tsx';
import { Logo } from './Header.tsx';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: UserProfile | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, user }) => {
  return (
    <>
      <aside className={`
        fixed inset-y-4 left-4 w-72 glass-card rounded-4xl 
        z-[1100] transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-[120%]'} 
        md:translate-x-0 md:static md:inset-auto md:w-80 md:h-[calc(100vh-2rem)] md:m-4 md:sticky md:top-4
      `} aria-label="Main Navigation">
        <div className="h-full flex flex-col p-8">
          <div className="mb-12 flex items-center justify-between">
            <NavLink to="/" className="group" onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}>
              <Logo size="sm" />
            </NavLink>
            <button onClick={toggleSidebar} className="md:hidden w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto pr-2 space-y-10 custom-scrollbar">
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-6 px-4">Core</p>
              <div className="space-y-1">
                <NavLink
                  to="/"
                  end
                  onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300
                    ${isActive 
                      ? 'bg-brand-navy text-white shadow-xl shadow-brand-navy/20 dark:bg-white dark:text-brand-navy' 
                      : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5'}
                  `}
                >
                  <i className="fas fa-home-alt w-5"></i>
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300
                    ${isActive 
                      ? 'bg-brand-navy text-white shadow-xl shadow-brand-navy/20 dark:bg-white dark:text-brand-navy' 
                      : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5'}
                  `}
                >
                  <i className="fas fa-info-circle w-5"></i>
                  <span>About Us</span>
                </NavLink>
              </div>
            </div>

            {CATEGORIES.map((cat) => {
              const categoryTools = TOOLS.filter(t => t.category === cat);
              if (categoryTools.length === 0) return null;

              return (
                <div key={cat}>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-6 px-4">{cat}</p>
                  <div className="space-y-1">
                    {categoryTools.map((tool) => (
                      <NavLink
                        key={tool.id}
                        to={tool.path}
                        onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                        className={({ isActive }) => `
                          flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group
                          ${isActive 
                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                            : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5'}
                        `}
                      >
                        <i className={`fas ${tool.icon} w-5 text-center group-hover:scale-125 transition-transform`}></i>
                        <span className="truncate">{tool.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="glass-card rounded-3xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white text-xs font-black">PRO</div>
              <div>
                <p className="text-xs font-black dark:text-white uppercase tracking-wider">Join Premium</p>
                <p className="text-[10px] text-slate-400">Unlock AI features</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;