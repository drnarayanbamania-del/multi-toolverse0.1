import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdSlot from '../Common/AdSlot.tsx';

const BMICalculator: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL params if present, otherwise defaults
  const [weight, setWeight] = useState<number>(() => Number(searchParams.get('w')) || 70);
  const [height, setHeight] = useState<number>(() => Number(searchParams.get('h')) || 170);
  
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [colorClass, setColorClass] = useState<string>('from-emerald-500 to-green-600');
  const [isShareFeedback, setIsShareFeedback] = useState(false);

  // Synchronize BMI calculation
  useEffect(() => {
    if (weight > 0 && height > 0) {
      const score = weight / ((height / 100) ** 2);
      setBmi(parseFloat(score.toFixed(1)));
      
      if (score < 18.5) { 
        setCategory('Underweight'); 
        setColorClass('from-blue-500 to-cyan-500'); 
      } else if (score < 25) { 
        setCategory('Healthy'); 
        setColorClass('from-emerald-500 to-green-500'); 
      } else if (score < 30) { 
        setCategory('Overweight'); 
        setColorClass('from-orange-400 to-orange-600'); 
      } else { 
        setCategory('Obese'); 
        setColorClass('from-rose-500 to-red-600'); 
      }

      // Update URL params without triggering a full re-render loop
      const newParams = new URLSearchParams(searchParams);
      newParams.set('w', weight.toString());
      newParams.set('h', height.toString());
      setSearchParams(newParams, { replace: true });
    }
  }, [weight, height]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `My BMI is ${bmi} (${category})! Check yours on Multi ToolVerse.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My BMI Result',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      // Fallback: Copy to Clipboard
      navigator.clipboard.writeText(shareUrl);
      setIsShareFeedback(true);
      setTimeout(() => setIsShareFeedback(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-black text-brand-orange uppercase tracking-[0.2em]">
          Health Management
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
          BMI <span className="text-brand-orange">Calculator</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl font-medium">
          Professional-grade body mass index assessment with instant category analysis and sharing.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card p-10 rounded-4xl border border-gray-100 dark:border-white/5 space-y-12">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Body Weight</label>
                  <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600">Standard measurement (kg)</p>
                </div>
                <div className="px-6 py-3 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-2xl text-2xl font-black shadow-lg">
                  {weight} <span className="text-xs opacity-60">kg</span>
                </div>
              </div>
              <input 
                type="range" min="30" max="200" value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-orange"
              />
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Body Height</label>
                  <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600">Standard measurement (cm)</p>
                </div>
                <div className="px-6 py-3 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-2xl text-2xl font-black shadow-lg">
                  {height} <span className="text-xs opacity-60">cm</span>
                </div>
              </div>
              <input 
                type="range" min="100" max="250" value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-orange"
              />
            </div>
          </div>

          <div className="bg-brand-navy dark:bg-slate-800 p-8 rounded-4xl text-white flex items-center gap-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
               <i className="fas fa-heart-pulse text-8xl"></i>
             </div>
             <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0">
               <i className="fas fa-notes-medical text-brand-orange"></i>
             </div>
             <div className="relative z-10">
               <h3 className="font-black text-xl mb-1">Health Advisory</h3>
               <p className="text-sm text-slate-400 leading-relaxed">BMI is a screening tool, not a diagnostic. For a full clinical evaluation, please consult your healthcare provider.</p>
             </div>
          </div>
        </div>

        {/* Result */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="glass-card p-12 rounded-4xl border border-gray-100 dark:border-white/5 flex flex-col items-center text-center space-y-10 min-h-[480px] justify-center relative overflow-hidden">
            {bmi !== null ? (
              <div className="animate-in zoom-in-95 duration-500 space-y-10 w-full">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Current Score</p>
                  <div className={`text-9xl font-black bg-gradient-to-br ${colorClass} bg-clip-text text-transparent drop-shadow-sm`}>
                    {bmi}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`inline-flex px-10 py-4 rounded-3xl text-white font-black text-xl bg-gradient-to-r ${colorClass} shadow-xl shadow-opacity-20`}>
                    {category}
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1)`} style={{ width: `${Math.min((bmi/40)*100, 100)}%` }} />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 dark:border-white/5 w-full">
                  <button 
                    onClick={handleShare}
                    className="w-full group relative flex items-center justify-center gap-3 py-5 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
                  >
                    {isShareFeedback ? (
                      <span className="flex items-center gap-2 animate-in slide-in-from-bottom-2">
                        <i className="fas fa-check text-emerald-500"></i> Copied to Clipboard
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <i className="fas fa-share-nodes group-hover:rotate-12 transition-transform"></i> Share Result
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 opacity-20">
                <i className="fas fa-scale-balanced text-7xl text-slate-300"></i>
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Awaiting Inputs</p>
              </div>
            )}
          </div>
          
          <AdSlot type="square" className="rounded-4xl overflow-hidden" />
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;