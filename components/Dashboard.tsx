
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../constants.tsx';
import AdSlot from './Common/AdSlot.tsx';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-12">
      {/* Hero Section */}
      <section className="relative text-center pt-8 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-primary-500/10 dark:bg-primary-500/5 blur-[100px] -z-10 rounded-full animate-pulse-slow"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 mb-6 animate-in slide-in-from-top-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-[10px] font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest">New Tools Added Weekly</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          Multi Tool Verse<span className="text-primary-500">.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          The Swiss Army Knife of the digital world. <br className="hidden md:block"/>
          <span className="font-semibold text-gray-900 dark:text-gray-200">Fast, free, and beautiful</span> utilities for every daily task.
        </p>
      </section>

      {/* Main Banner Ad */}
      <AdSlot type="horizontal" className="mb-8" />

      {/* Main Content Grid */}
      <div className="space-y-20">
        {CATEGORIES.map((category, idx) => (
          <section key={category} className={`animate-in fade-in slide-in-from-bottom-8 duration-700`} style={{ animationDelay: `${idx * 150}ms` }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200 dark:to-white/10"></div>
              <h2 className="text-sm font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap">
                {category}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200 dark:to-white/10"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TOOLS.filter(t => t.category === category).map(tool => (
                <NavLink 
                  key={tool.id} 
                  to={tool.path}
                  className="group relative bg-white/80 dark:bg-slate-800/40 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden backdrop-blur-sm"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.04] group-hover:scale-150 transition-transform duration-700 group-hover:opacity-[0.08]">
                     <i className={`fas ${tool.icon} text-9xl`}></i>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-900/50 text-gray-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                    <i className={`fas ${tool.icon} text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{tool.description}</p>
                  
                  <div className="mt-8 flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-500">Go to Tool</span>
                  </div>
                </NavLink>
              ))}
            </div>

            {/* In-category Ad Placement */}
            {idx === 1 && (
              <div className="mt-12 flex justify-center">
                <AdSlot type="horizontal" className="w-full max-w-4xl" />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Feature Showcase */}
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-800/50 rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-3xl backdrop-blur-md">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Calculations at the <span className="text-primary-400 italic">Speed of Light</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We've engineered ToolVerse to be the fastest platform on the web. No loading bars, no server delays—just instant results processed right on your device.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               {['Private', 'Offline Ready', 'No Ads', 'Open Source'].map(tag => (
                 <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white tracking-wide">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center backdrop-blur-sm">
              <div className="text-4xl font-black text-primary-400 mb-2">0ms</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Latency</div>
            </div>
            <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center backdrop-blur-sm mt-8">
              <div className="text-4xl font-black text-secondary mb-2">100%</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client-Side</div>
            </div>
            <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center backdrop-blur-sm">
              <div className="text-4xl font-black text-accent mb-2">∞</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Free Forever</div>
            </div>
            <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center backdrop-blur-sm mt-8">
              <div className="text-4xl font-black text-white mb-2">Lite</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Architecture</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
