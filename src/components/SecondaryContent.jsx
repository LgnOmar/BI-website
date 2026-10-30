import React, { useState } from 'react';
import { CORE_ITEMS, TESTIMONIALS, FAQS } from '../data/productData';
import { Check, Star, ChevronDown, Sparkles, Heart, ShieldCheck, ArrowUp } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function SecondaryContent({ onScrollToOrder }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-16 pt-12 border-t border-plum-100">
      
      {/* 1. What's Inside the Box (5 Core Items) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200 text-[#470923] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>محتويات البوكس الخمسة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-amiri text-[#470923]">
            ماذا ستجدين داخل بوكس مشكاة؟
          </h2>
          <p className="text-xs sm:text-sm text-[#68414E]">
            خمس أدوات صُممت بتناغم لترافقكِ في الحفظ، التثبيت، والتدبر اليومي
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-plum-100 shadow-sm hover:shadow-md transition-all text-right flex gap-3.5 items-start"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-plum-50 shrink-0 border border-plum-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-bold text-plum-700 bg-plum-50 px-2 py-0.5 rounded-full inline-block">
                  {item.badge}
                </span>
                <h3 className="text-sm font-bold text-[#470923] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#68414E] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Card: Gift packaging */}
          <div className="bg-gradient-to-r from-plum-900 to-[#601233] text-cream-100 rounded-2xl p-4 shadow-sm text-right flex gap-3.5 items-center">
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-cream-200 text-2xl">
              🎁
            </div>
            <div className="space-y-0.5 flex-1">
              <span className="text-[10px] font-bold text-cream-200 bg-white/20 px-2 py-0.5 rounded-full inline-block">
                هدية مجانية
              </span>
              <h3 className="text-sm font-bold text-white">
                تغليف هدايا فاخر وبطاقة إهداء
              </h3>
              <p className="text-xs text-cream-200/80">
                جاهز لتقديمه لنفسكِ أو لأغلى الناس مباشرة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Customer Reviews */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-[#470923] text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>آراء الأخوات المشتركات</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-amiri text-[#470923]">
            تجارب حقيقية من ولايات الوطن
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.slice(0, 3).map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-plum-100 shadow-sm text-right space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#4A202D] leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-plum-50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#470923] block">{rev.name}</span>
                  <span className="text-[11px] text-gray-500">{rev.wilaya}</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                  شراء مؤكد ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FAQ Accordion */}
      <section className="space-y-5 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold font-amiri text-[#470923]">
            الأسئلة الشائعة
          </h2>
          <p className="text-xs text-gray-600">
            كل ما تودين معرفته قبل تأكيد طلبكِ
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-plum-100 overflow-hidden text-right"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-[#470923] hover:text-plum-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-plum-600 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-xs text-[#5C3A46] leading-relaxed border-t border-plum-50 bg-[#FAF7F2]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Return to Top Order CTA Banner */}
      <div className="text-center pt-2">
        <button
          onClick={onScrollToOrder}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#470923] hover:bg-plum-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
        >
          <span>اصعدي لملء استمارة الطلب (3,900 دج)</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Footer */}
      <footer className="pt-8 border-t border-plum-200/80 text-center space-y-4 text-xs text-plum-900">
        <p className="font-amiri text-base font-bold text-[#470923] leading-relaxed max-w-lg mx-auto">
          « يُقَالُ لِصَاحِبِ الْقُرْآنِ: اقْرَأْ وَارْتَقِ وَرَتِّلْ كَمَا كُنْتَ تُرَتِّلُ فِي الدُّنْيَا، فَإِنَّ مَنْزِلَتَكَ عِنْدَ آخِرِ آيَةٍ تَقْرَؤُهَا »
        </p>

        <div className="flex items-center justify-center gap-4 text-xs">
          <a
            href="https://www.instagram.com/graphics.by.bl"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-bold hover:text-[#470923]"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@Graphics.by.Bl</span>
          </a>
        </div>

        <p className="text-[11px] text-gray-500">
          جميع الحقوق محفوظة © {new Date().getFullYear()} لـ بوكس مشكاة • الدفع نقداً عند الاستلام 🇩🇿
        </p>
      </footer>

    </div>
  );
}

