
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TOOLS, DISPLAY_ORDER } from '../constants.tsx';
import { Category } from '../types.ts';
import AdSlot from './Common/AdSlot.tsx';
import { GoogleGenAI } from "@google/genai";
import { Logo } from './Layout/Header.tsx';

interface DashboardNewsItem {
  title: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const [indiaNews, setIndiaNews] = useState<DashboardNewsItem[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);

  useEffect(() => {
    const fetchDashboardNews = async () => {
      try {
        setNewsError(false);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: "Provide the top 4 most important headlines from India for today. Format each headline as exactly: TITLE: [headline text]. Do not include summaries or other text.",
          config: { 
            tools: [{ googleSearch: {} }],
            temperature: 0.1 
          },
        });

        const text = response.text || "";
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        // Better extraction: look for lines starting with TITLE:
        const extracted = text.split('\n')
          .filter(l => l.toUpperCase().includes('TITLE:'))
          .map((line, i) => {
            const cleanTitle = line.replace(/TITLE:\s*/i, '').trim();
            return {
              title: cleanTitle,
              url: chunks[i]?.web?.uri || "https://news.google.co.in"
            };
          })
          .filter(item => item.title.length > 5)
          .slice(0, 4);

        if (extracted.length > 0) {
          setIndiaNews(extracted);
        } else {
          setNewsError(true);
        }
      } catch (err) { 
        console.error("Dashboard news error:", err); 
        setNewsError(true); 
      } finally { 
        setIsNewsLoading(false); 
      }
    };
    fetchDashboardNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-20 pb-32 px-4 md:px-0">
      {/* Premium Hero Section */}
      <section className="text-center space-y-10 pt-10">
        <div className="animate-float inline-block">
          <Logo size="lg" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Everything you need. <br/>
            <span className="text-brand-orange">One Unified Universe.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Professional-grade utilities, real-time intelligence, and specialized calculators—engineered for the modern web.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <div className="px-6 py-2 rounded-full glass-card text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            v0.1 Premium Stable
          </div>
          <div className="px-6 py-2 rounded-full glass-card text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">
            Gemini Powered
          </div>
        </div>
      </section>

      {/* Bento Tool Hub */}
      <div className="space-y-24">
        {DISPLAY_ORDER.map((category) => {
          const categoryTools = TOOLS.filter(t => t.category === category);
          if (categoryTools.length === 0) return null;

          return (
            <section key={category} className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="flex items-center gap-6">
                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em]">{category}</h3>
                <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category === Category.NEWS && (
                  <div className="lg:col-span-1 bento-card glass-card rounded-4xl p-10 flex flex-col border-brand-orange/20 relative">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <i className="fas fa-bolt-lightning text-6xl text-brand-orange"></i>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg mb-8">
                      <i className="fas fa-newspaper"></i>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Live Intelligence</h4>
                    <div className="space-y-4 flex-1">
                      {isNewsLoading ? (
                        Array(3).fill(0).map((_,i) => <div key={i} className="h-10 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse"></div>)
                      ) : newsError ? (
                        <div className="p-4 rounded-2xl bg-red-500/5 text-center">
                          <p className="text-[10px] font-black uppercase text-red-500">Service Temporarily Offline</p>
                          <p className="text-[9px] text-gray-400 mt-1">Unable to sync live headlines</p>
                        </div>
                      ) : (
                        indiaNews.map((n, i) => (
                          <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-2xl hover:bg-brand-orange/10 border border-transparent hover:border-brand-orange/20 transition-all group/item">
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 line-clamp-1 group-hover/item:text-brand-orange transition-colors">{n.title}</p>
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                )}
                
                {categoryTools.map(tool => (
                  <NavLink 
                    key={tool.id} 
                    to={tool.path}
                    className="bento-card glass-card rounded-4xl p-10 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-navy dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-brand-navy flex items-center justify-center mb-8 transition-all duration-500 shadow-inner">
                      <i className={`fas ${tool.icon} text-xl`}></i>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">{tool.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{tool.description}</p>
                    <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 group-hover:text-brand-orange transition-colors">
                      Enter Tool <i className="fas fa-chevron-right text-[8px]"></i>
                    </div>
                  </NavLink>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="pt-20">
        <AdSlot type="horizontal" className="rounded-4xl overflow-hidden" />
      </div>
    </div>
  );
};

export default Dashboard;
