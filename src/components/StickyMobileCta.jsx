import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function StickyMobileCta({ onOrderClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 350px
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md p-3 border-t border-plum-100 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-right">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#470923]">3,900 دج</span>
            <span className="text-xs text-gray-400 line-through">5,400 دج</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            التوصيل متوفر لـ 58 ولاية 🇩🇿
          </span>
        </div>

        <button
          onClick={onOrderClick}
          className="flex-1 py-3 px-4 rounded-xl bg-[#470923] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-plum active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cream-200" />
          <span>اطلبي بوكس مشكاة الآن</span>
        </button>
      </div>
    </div>
  );
}

