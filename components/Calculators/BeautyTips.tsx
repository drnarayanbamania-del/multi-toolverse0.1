
import React, { useState, useEffect } from 'react';

type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal';
type Concern = 'Acne' | 'Aging' | 'Hydration' | 'Dullness';

interface TipProfile {
  skin: SkinType;
  concern: Concern;
  advice: string;
  routine: string[];
  ingredient: string;
}

const tipsDatabase: TipProfile[] = [
  {
    skin: 'Oily',
    concern: 'Acne',
    advice: "Focus on 'Double Cleansing' and avoid heavy oils. Look for non-comedogenic formulas that balance sebum production without stripping natural moisture.",
    routine: ['Salicylic Acid Cleanser', 'Oil-free Moisturizer', 'Niacinamide Serum'],
    ingredient: 'Salicylic Acid'
  },
  {
    skin: 'Dry',
    concern: 'Hydration',
    advice: "Your skin barrier needs lipids. Layer humectants under occlusives to lock in every drop of moisture. Avoid hot showers which strip oils.",
    routine: ['Milk Cleanser', 'Hyaluronic Acid', 'Ceramide Cream'],
    ingredient: 'Hyaluronic Acid'
  },
  {
    skin: 'Sensitive',
    concern: 'Acne',
    advice: "Gentle is better. Use Azelaic acid instead of harsh benzoyl peroxide to treat blemishes while soothing redness.",
    routine: ['Gentle Gel Cleanser', 'Azelaic Acid', 'Cica Soothing Cream'],
    ingredient: 'Centella Asiatica'
  },
  {
    skin: 'Combination',
    concern: 'Dullness',
    advice: "Multi-masking is your best friend. Clay on the T-zone and Vitamin C on the cheeks will brighten your overall complexion.",
    routine: ['Foaming Cleanser', 'Vitamin C Serum', 'Lightweight Lotion'],
    ingredient: 'Vitamin C'
  },
  {
    skin: 'Normal',
    concern: 'Aging',
    advice: "Retinoids are the gold standard. Start slow and always use SPF in the morning as your primary defense against further damage.",
    routine: ['Cream Cleanser', 'Retinol Night Cream', 'Broad Spectrum SPF'],
    ingredient: 'Retinol'
  }
];

const BeautyTips: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>('Normal');
  const [concern, setConcern] = useState<Concern>('Hydration');
  const [activeTip, setActiveTip] = useState<TipProfile | null>(null);
  const [isSurprising, setIsSurprising] = useState(false);

  useEffect(() => {
    // Find exact match or default to a close one
    const match = tipsDatabase.find(t => t.skin === skinType && t.concern === concern) || 
                  tipsDatabase.find(t => t.skin === skinType) || 
                  tipsDatabase[0];
    setActiveTip(match);
  }, [skinType, concern]);

  const handleSurpriseMe = () => {
    setIsSurprising(true);
    const randomIndex = Math.floor(Math.random() * tipsDatabase.length);
    const randomTip = tipsDatabase[randomIndex];
    
    // Set states to trigger useEffect and update the UI
    setSkinType(randomTip.skin);
    setConcern(randomTip.concern);
    
    // Brief animation state
    setTimeout(() => setIsSurprising(false), 600);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800 text-[10px] font-black text-pink-600 dark:text-pink-300 uppercase tracking-widest">
            Beauty & Skincare
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Glow Guide<span className="text-pink-500">.</span></h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Personalized skincare intelligence. Tell us about your skin, and we'll craft your ideal routine.
          </p>
        </div>

        <button 
          onClick={handleSurpriseMe}
          className={`
            group flex items-center gap-3 px-6 py-4 rounded-[2rem] bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300
            ${isSurprising ? 'animate-pulse' : ''}
          `}
        >
          <i className={`fas fa-wand-magic-sparkles text-lg transition-transform duration-500 group-hover:rotate-12 ${isSurprising ? 'rotate-[360deg]' : ''}`}></i>
          <span className="text-sm font-black uppercase tracking-widest">Surprise Me!</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Configuration */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-xl backdrop-blur-sm space-y-10">
            
            <div className="space-y-6">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Your Skin Type</label>
              <div className="grid grid-cols-2 gap-3">
                {(['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'] as SkinType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setSkinType(type)}
                    className={`p-4 rounded-2xl border text-sm font-bold transition-all ${skinType === type ? 'bg-pink-500 text-white border-pink-500 shadow-lg' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Primary Concern</label>
              <div className="flex flex-wrap gap-3">
                {(['Acne', 'Aging', 'Hydration', 'Dullness'] as Concern[]).map(c => (
                  <button
                    key={c}
                    onClick={() => setConcern(c)}
                    className={`flex-1 min-w-[120px] p-4 rounded-2xl border text-sm font-bold transition-all ${concern === c ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <i className="fas fa-magic text-7xl group-hover:rotate-12 transition-transform duration-700"></i>
             </div>
             <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <i className="fas fa-droplet text-pink-400"></i> Pro Tip
             </h4>
             <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Always apply your skincare from thinnest consistency (serums) to thickest (creams). This ensures maximum absorption of active ingredients.
             </p>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {activeTip && (
            <div className={`bg-white/80 dark:bg-slate-800/60 rounded-[3rem] border border-gray-100 dark:border-white/5 p-10 md:p-14 shadow-2xl backdrop-blur-sm animate-in zoom-in duration-500 relative overflow-hidden ${isSurprising ? 'opacity-50 blur-[2px]' : 'opacity-100 blur-0 transition-all duration-300'}`}>
              
              <div className="absolute top-10 right-10">
                 <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-2xl animate-pulse-slow">
                    <i className="fas fa-sparkles"></i>
                 </div>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em]">Your Skin Prescription</p>
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">The {skinType} Glow Routine</h2>
                </div>

                <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5">
                   <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic leading-relaxed">
                     "{activeTip.advice}"
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <i className="fas fa-list-check text-indigo-500"></i> Core Steps
                    </h3>
                    <ul className="space-y-4">
                       {activeTip.routine.map((step, idx) => (
                         <li key={step} className="flex items-center gap-3 group">
                            <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center group-hover:scale-110 transition-transform">{idx + 1}</span>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{step}</span>
                         </li>
                       ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <i className="fas fa-flask text-pink-500"></i> Key Ingredient
                    </h3>
                    <div className="p-6 rounded-2xl bg-pink-500/5 border border-pink-500/10 text-center">
                       <p className="text-2xl font-black text-pink-600 dark:text-pink-400 mb-1">{activeTip.ingredient}</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recommended Hero</p>
                    </div>
                  </div>
                </div>

                <footer className="pt-8 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 flex items-center justify-center text-[10px] text-gray-400`}>
                           <i className="fas fa-user"></i>
                        </div>
                      ))}
                      <div className="px-3 flex items-center text-[10px] font-bold text-gray-400 ml-4">
                         Used by 2.4k others with {skinType} skin
                      </div>
                   </div>
                   <button className="text-xs font-black text-pink-500 uppercase hover:underline">Share Routine</button>
                </footer>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl">
                   <i className="fas fa-sun"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AM Rule</p>
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Protect & Hydrate</p>
                </div>
             </div>
             <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xl">
                   <i className="fas fa-moon"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PM Rule</p>
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Repair & Treatment</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyTips;
