import React, { useState, useEffect } from 'react';
import { BUNDLE_OPTIONS, PRODUCT_INFO } from '../data/productData';
import { Sparkles, Check, ShoppingBag, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function PricingOffer({ selectedBundle, onSelectBundle, onOrderClick }) {
  // Urgency Countdown Timer (e.g. 05 hours, 38 mins, 42 secs remaining)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#FDF5F6] to-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plum-100 text-[#470923] text-xs sm:text-sm font-bold border border-plum-200">
            <Sparkles className="w-4 h-4 text-[#470923]" />
            <span>عروض اليوم الحصرية</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
            اختاري الباقة الأنسب لكِ واستفيدي من تخفيض اليوم
          </h2>

          {/* Countdown urgency box */}
          <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-plum-200 shadow-sm mt-2">
            <Clock className="w-4 h-4 text-plum-700 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#470923]">ينتهي العرض الاستثنائي خلال:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-[#470923] text-xs sm:text-sm">
              <span className="bg-plum-100 px-2 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-plum-100 px-2 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-plum-100 px-2 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {BUNDLE_OPTIONS.map((bundle) => {
            const isSelected = selectedBundle === bundle.id;

            return (
              <div
                key={bundle.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 text-right ${
                  bundle.popular
                    ? 'bg-white border-2 border-[#470923] shadow-plum-lg scale-100 lg:-translate-y-2 ring-4 ring-plum-100'
                    : 'bg-white/80 border border-plum-100 shadow-soft hover:shadow-plum'
                }`}
              >
                {/* Popular Ribbon */}
                {bundle.popular && (
                  <div className="absolute -top-3.5 inset-x-0 mx-auto w-max px-4 py-1 rounded-full bg-[#470923] text-cream-200 text-xs font-extrabold shadow-md">
                    {bundle.badge}
                  </div>
                )}

                {!bundle.popular && (
                  <div className="mb-2">
                    <span className="text-xs font-bold text-plum-700 bg-plum-50 px-3 py-1 rounded-full">
                      {bundle.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <h3 className="text-xl font-bold text-[#470923] font-amiri">
                    {bundle.title}
                  </h3>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-3xl font-extrabold text-[#470923]">
                      {bundle.price.toLocaleString()} <span className="text-lg">دج</span>
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {bundle.originalPrice.toLocaleString()} دج
                    </span>
                  </div>

                  <div className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                    وفرتي {bundle.saving.toLocaleString()} دج 💸
                  </div>

                  {/* Included items checklist */}
                  <ul className="space-y-2.5 pt-4 border-t border-plum-100 text-xs sm:text-sm text-[#44232E]">
                    {bundle.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-cream-200 flex items-center justify-center shrink-0 mt-0.5 text-[#470923]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-snug">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      onSelectBundle(bundle.id);
                      onOrderClick();
                    }}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                      bundle.popular
                        ? 'bg-[#470923] hover:bg-plum-800 text-white shadow-plum hover:scale-[1.02]'
                        : 'bg-plum-50 hover:bg-[#470923] text-[#470923] hover:text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>اختاري هذه الباقة الآن</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security guarantee line */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#7A5864] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>لا يلزم إدخال بطاقة بنكية • الدفع 100% نقداً عند الاستلام بعد تفحص البوكس</span>
          </p>
        </div>

      </div>
    </section>
  );
}

