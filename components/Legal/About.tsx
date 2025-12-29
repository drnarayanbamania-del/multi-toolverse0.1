import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Layout/Header.tsx';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-black text-brand-orange uppercase tracking-[0.2em]">
          Our Story
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Empowering the <span className="text-brand-orange">Digital Universe.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Multi ToolVerse is more than just a collection of utilities—it's a high-performance ecosystem designed to simplify your daily digital tasks.
        </p>
      </section>

      {/* Mission & Vision Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 md:p-14 rounded-[3rem] border border-slate-100 dark:border-white/5 space-y-6 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <i className="fas fa-rocket text-9xl"></i>
          </div>
          <h2 className="text-3xl font-black text-brand-navy dark:text-white">Our Mission</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            To provide a unified, accessible, and lightning-fast platform where precision meets simplicity. We believe that powerful tools should be free, intuitive, and available to everyone, regardless of their technical expertise.
          </p>
        </div>

        <div className="glass-card p-10 md:p-14 rounded-[3rem] border border-slate-100 dark:border-white/5 space-y-6 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <i className="fas fa-eye text-9xl"></i>
          </div>
          <h2 className="text-3xl font-black text-brand-navy dark:text-white">Our Vision</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            We envision a world where the "utility gap" is closed. By integrating advanced AI intelligence with standard mathematical models, we're building the first truly "intelligent" utility universe that grows with its users.
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Why Multi ToolVerse?</h3>
          <h2 className="text-4xl font-black text-brand-navy dark:text-white">Engineered for Excellence</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'fa-bolt-lightning', title: 'Ultra Fast', desc: 'Optimized for minimal latency and instant results.' },
            { icon: 'fa-shield-halved', title: 'Privacy First', desc: 'Your data stays in your browser. We don\'t track your inputs.' },
            { icon: 'fa-brain', title: 'AI Enhanced', desc: 'Powered by Gemini 2.5 and 3 models for smart insights.' },
            { icon: 'fa-universal-access', title: 'Accessible', desc: 'Built for everyone, following strict WCAG guidelines.' }
          ].map((benefit, i) => (
            <div key={i} className="glass-card p-8 rounded-4xl border border-slate-50 dark:border-white/5 hover:-translate-y-2 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange text-xl mb-6">
                <i className={`fas ${benefit.icon}`}></i>
              </div>
              <h4 className="text-xl font-black text-brand-navy dark:text-white mb-2">{benefit.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Stack */}
      <section className="bg-brand-navy dark:bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 M50 100 L100 50 M0 50 L50 0" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-4xl font-black">Powered by <span className="text-brand-orange">Cutting-Edge</span> Tech</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We leverage the world's most advanced technologies to ensure reliability and intelligence. Our platform is built on React for responsive UI, Tailwind for elegant styling, and Google's Gemini Pro API for real-time intelligence and personalized coaching.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest">React 19</span>
              <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest">Gemini Pro 3</span>
              <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest">Tailwind CSS</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-orange blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Logo size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 space-y-10">
        <h2 className="text-4xl font-black text-brand-navy dark:text-white">Ready to explore?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink to="/" className="px-10 py-5 bg-brand-orange text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all">
            Enter Dashboard
          </NavLink>
          <a href="mailto:support@multitoolverse.com" className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;