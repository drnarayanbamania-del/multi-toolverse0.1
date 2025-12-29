
import React, { useEffect, useRef } from 'react';
import { AD_CONFIG } from '../../constants.tsx';

interface AdSlotProps {
  type?: 'horizontal' | 'square' | 'vertical';
  className?: string;
  isTest?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSlot: React.FC<AdSlotProps> = ({ type = 'horizontal', className = '', isTest = false }) => {
  const activeTestMode = isTest || AD_CONFIG.enableTestMode;
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: any;
    
    const initAd = () => {
      // Ensure the container exists and has a width > 0 to prevent AdSense "availableWidth=0" error
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          if (typeof window !== 'undefined') {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          // Only log if not a standard "already filled" or "width 0" error which we're already trying to avoid
          if (process.env.NODE_ENV === 'development') {
            console.warn('AdSense Push Warning:', e);
          }
        }
      } else if (adRef.current) {
        // If width is still 0, retry once after a short delay
        timer = setTimeout(initAd, 200);
      }
    };

    // Use requestAnimationFrame to wait for the browser to finish layout/paint
    // and a small timeout to account for CSS animations (like animate-in)
    timer = setTimeout(() => {
      requestAnimationFrame(initAd);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const dimensions = {
    horizontal: 'w-full min-h-[90px]',
    square: 'w-full aspect-square max-w-[300px]',
    vertical: 'w-full h-[600px] max-w-[160px]'
  };

  return (
    <div ref={adRef} className={`relative group ${className} flex justify-center`}>
      <div className={`${dimensions[type]} bg-gray-50/50 dark:bg-slate-800/20 border border-gray-100 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden`}>
        {/* Ad Compliance Badge */}
        <div className={`absolute top-1 right-2 text-[8px] font-black uppercase tracking-widest z-10 pointer-events-none ${activeTestMode ? 'text-amber-500' : 'text-gray-400 dark:text-gray-600'}`}>
          {activeTestMode ? 'Test Ad' : 'Ad'}
        </div>
        
        {/* Google Ad Tag with configuration */}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', height: '100%' }}
             data-ad-client={AD_CONFIG.publisherId}
             data-ad-slot={AD_CONFIG.slotId}
             data-ad-format={type === 'horizontal' ? 'auto' : 'rectangle'}
             data-full-width-responsive="true"
             {...(activeTestMode ? { 'data-adtest': 'on' } : {})}
        >
        </ins>

        {/* Shine effect for visual feedback while loading */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AdSlot;
