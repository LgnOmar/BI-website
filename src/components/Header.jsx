import React from 'react';
import { Truck, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-plum-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#470923]/20 bg-[#FAF7F2] p-1 flex items-center justify-center shrink-0">
              <img
                src="/images/logo.png"
                alt="شعار مشكاة"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-amiri text-2xl font-bold text-[#470923] tracking-wide block leading-none">
                مِشْكَاة
              </span>
              <span className="text-[10px] text-plum-700 font-semibold tracking-wider">
                MISHKAT • GRAPHICS BY BI
              </span>
            </div>
          </div>

          {/* Delivery & Trust Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#470923] text-cream-200 shadow-sm">
              <Truck className="w-3.5 h-3.5" />
              <span>التوصيل متوفر لكل 58 ولاية 🇩🇿</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>الدفع عند الاستلام</span>
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}

