
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import AdSlot from '../Common/AdSlot.tsx';

interface WellnessPlan {
  summary: string;
  habits: string[];
  mindfulness: string;
  nutrition: string;
}

const WellnessGoals = [
  { id: 'mental-clarity', label: 'Mental Clarity', icon: 'fa-brain', color: 'bg-indigo-500' },
  { id: 'better-sleep', label: 'Better Sleep', icon: 'fa-moon', color: 'bg-slate-700' },
  { id: 'weight-management', label: 'Weight Balance', icon: 'fa-scale-balanced', color: 'bg-emerald-500' },
  { id: 'energy-boost', label: 'High Energy', icon: 'fa-bolt', color: 'bg-amber-500' },
  { id: 'muscle-growth', label: 'Strength', icon: 'fa-dumbbell', color: 'bg-rose-500' },
  { id: 'stress-relief', label: 'Stress Relief', icon: 'fa-wind', color: 'bg-cyan-500' }
];

const HealthWellness: React.FC = () => {
  const [goal, setGoal] = useState('mental-clarity');
  const [intensity, setIntensity] = useState('moderate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<WellnessPlan | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const generateWellnessPlan = async () => {
    setIsGenerating(true);
    setPlan(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const goalLabel = WellnessGoals.find(g => g.id === goal)?.label || goal;
      
      const prompt = `Act as a holistic wellness coach. Create a personalized wellness plan for a user with the goal: "${goalLabel}" and preferred intensity: "${intensity}".
      
      You must format the response exactly like this:
      SUMMARY: [2-sentence encouraging overview]
      HABITS: [3 specific daily habits, comma separated]
      MINDFULNESS: [One specific meditation or breathing exercise]
      NUTRITION: [One key dietary focus or pillar]`;

      const result = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.95,
        }
      });

      const text = result.text || "";
      
      const summaryMatch = text.match(/SUMMARY:\s*(.*)/i);
      const habitsMatch = text.match(/HABITS:\s*(.*)/i);
      const mindfulnessMatch = text.match(/MINDFULNESS:\s*(.*)/i);
      const nutritionMatch = text.match(/NUTRITION:\s*(.*)/i);

      const newPlan = {
        summary: summaryMatch ? summaryMatch[1].trim() : "Your personalized wellness synthesis is ready.",
        habits: habitsMatch ? habitsMatch[1].split(',').map(s => s.trim()) : ["Maintain hydration", "Regular movement", "Consistent sleep"],
        mindfulness: mindfulnessMatch ? mindfulnessMatch[1].trim() : "5-minute mindfulness breathing.",
        nutrition: nutritionMatch ? nutritionMatch[1].trim() : "Focus on whole, unprocessed foods."
      };

      setPlan(newPlan);

      // Auto-scroll to results on mobile
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error("Wellness Generation failed", err);
      alert("Wellness sync interrupted. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 px-4 md:px-0">
      <header className="space-y-4 mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">
          Holistic Lifestyle
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
          Wellness <span className="text-emerald-500">Universe.</span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl font-medium">
          Personalized health synthesis powered by Gemini intelligence. Align your body and mind with tailored daily pillars.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Input Controls */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="glass-card p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Select Your Goal</label>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {WellnessGoals.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`flex flex-col items-center text-center gap-2 md:gap-3 p-4 md:p-5 rounded-2xl md:rounded-3xl border transition-all ${goal === g.id ? 'bg-white dark:bg-slate-800 border-emerald-500 shadow-xl' : 'bg-gray-50/50 dark:bg-slate-900/50 border-transparent hover:border-gray-200'}`}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${goal === g.id ? g.color : 'bg-gray-200 dark:bg-slate-700'} text-white flex items-center justify-center transition-all`}>
                      <i className={`fas ${g.icon} text-sm md:text-base`}></i>
                    </div>
                    <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-tighter ${goal === g.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Intensity Level</label>
              <div className="flex p-1 bg-gray-100 dark:bg-slate-900 rounded-xl md:rounded-2xl border border-gray-100 dark:border-white/5">
                {['Gentle', 'Moderate', 'Intense'].map(level => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level.toLowerCase())}
                    className={`flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${intensity === level.toLowerCase() ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-gray-500'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateWellnessPlan}
              disabled={isGenerating}
              className="w-full py-4 md:py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Syncing Universe...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sparkles"></i>
                  <span>Generate Wellness Synthesis</span>
                </>
              )}
            </button>
          </div>

          <div className="hidden lg:block">
            <AdSlot type="square" className="rounded-[2.5rem] overflow-hidden" />
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7" ref={resultsRef}>
          {isGenerating ? (
            <div className="h-full min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center space-y-6 md:space-y-8 bg-white/40 dark:bg-slate-800/20 rounded-3xl md:rounded-[3.5rem] border border-dashed border-gray-200 dark:border-white/5 p-8 md:p-12 text-center backdrop-blur-sm">
               <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
                  <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
                  <i className="fas fa-leaf text-4xl md:text-5xl text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></i>
               </div>
               <div className="space-y-2">
                 <p className="text-xs md:text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.4em]">Optimizing Bio-Sync</p>
                 <p className="text-[10px] md:text-xs text-gray-400 max-w-xs leading-relaxed mx-auto">Aligning goals with modern holistic research to craft your daily flow...</p>
               </div>
            </div>
          ) : plan ? (
            <div className="space-y-6 animate-in zoom-in duration-500">
              <div className="glass-card rounded-3xl md:rounded-[3.5rem] p-6 md:p-14 border border-gray-100 dark:border-white/5 shadow-2xl backdrop-blur-md">
                <div className="space-y-8 md:space-y-12">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Synthesis Successful</p>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">Your Wellness Core</h2>
                  </div>

                  <div className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-base md:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed italic">
                      "{plan.summary}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                        <i className="fas fa-calendar-check text-emerald-500"></i> Daily Habits
                      </h3>
                      <div className="space-y-2 md:space-y-3">
                        {plan.habits.map((habit, i) => (
                          <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50/50 dark:bg-white/5 group border border-transparent hover:border-emerald-500/20 transition-all">
                            <span className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-emerald-500 text-white text-[9px] md:text-[10px] font-black flex items-center justify-center shrink-0">{i+1}</span>
                            <span className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-300">{habit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                          <i className="fas fa-om text-indigo-500"></i> Mindfulness Focus
                        </h3>
                        <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10">
                          <p className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-300 leading-relaxed">
                            {plan.mindfulness}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                          <i className="fas fa-plate-wheat text-orange-500"></i> Nutrition Pillar
                        </h3>
                        <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10">
                          <p className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-300 leading-relaxed">
                            {plan.nutrition}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 md:pt-10 border-t border-gray-100 dark:border-white/5">
                     <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 p-6 md:p-8 bg-brand-navy rounded-2xl md:rounded-[2.5rem] text-white">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-emerald-500 flex items-center justify-center text-2xl md:text-3xl shadow-xl shadow-emerald-500/20 shrink-0">
                           <i className="fas fa-heart-pulse"></i>
                        </div>
                        <div className="text-center sm:text-left">
                           <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-1">Coach Pro-Tip</p>
                           <p className="text-[11px] md:text-sm font-medium text-slate-300 leading-relaxed">Wellness is a compound effect. Even on gentle days, maintain the "Mindfulness Focus" to keep your bio-rhythms aligned.</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] md:min-h-[500px] flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white/40 dark:bg-slate-800/20 rounded-3xl md:rounded-[3.5rem] border border-dashed border-gray-200 dark:border-white/5 opacity-50 transition-opacity">
               <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 md:mb-8">
                 <i className="fas fa-sun text-3xl md:text-4xl text-slate-300 dark:text-slate-600"></i>
               </div>
               <h3 className="text-xl md:text-2xl font-black text-gray-600 dark:text-gray-400">Ready for Synthesis</h3>
               <p className="text-[11px] md:text-sm text-gray-400 mt-4 max-w-sm leading-relaxed font-medium">Configure your wellness trajectory using the goals on the left to receive a Gemini-powered holistic action plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthWellness;
