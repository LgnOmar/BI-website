import React, { useState } from 'react';
import { CORE_ITEMS } from '../data/productData';
import { Check, Sparkles, ShoppingBag, Eye, X, BookOpen, Layers, Heart, Bookmark, Compass } from 'lucide-react';

export default function ContentsSection({ onOrderClick }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const getIconForItem = (id) => {
    switch (id) {
      case 1: return BookOpen;
      case 2: return Layers;
      case 3: return Compass;
      case 4: return Heart;
      case 5: return Bookmark;
      default: return Sparkles;
    }
  };

  return (
    <section id="contents" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] to-[#FFF8F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plum-100 text-[#470923] text-xs sm:text-sm font-bold border border-plum-200">
            <Sparkles className="w-4 h-4 text-[#470923]" />
            <span>محتويات بوكس مشكاة الخمسة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
            كل قطعة في البوكس صُممت بعناية لتخدم هدفاً روحياً وعملياً محدداً
          </h2>
          
          <p className="text-sm sm:text-base text-[#68414E] leading-relaxed">
            وداعاً للتشتت بين مذكرات متفرقة وتطبيقات الهاتف. جمعنا لكِ 5 ركائز أساسية متناغمة تعينكِ على الحفظ، التثبيت، والتدبر اليومي.
          </p>
        </div>

        {/* 5 Core Items Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_ITEMS.map((item, idx) => {
            const Icon = getIconForItem(item.id);
            const isFullWidthOnLarge = idx === 3 || idx === 4; // Nice balanced layout

            return (
              <div
                key={item.id}
                className={`group bg-white rounded-3xl overflow-hidden border border-plum-100 shadow-soft hover:shadow-plum transition-all duration-300 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF0F2]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // fallback to overview
                      e.target.onerror = null;
                      e.target.src = '/images/box-overview.png';
                    }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-[#470923]/90 backdrop-blur-md text-cream-200 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {item.badge}
                  </div>

                  {/* Number pill */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-[#470923] font-extrabold text-sm flex items-center justify-center shadow-md">
                    0{item.id}
                  </div>

                  {/* Quick Inspect Button */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm"
                  >
                    <Eye className="w-5 h-5 text-cream-200" />
                    <span>عرض التفاصيل</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-right">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-plum-50 flex items-center justify-center text-[#470923] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-[#470923] group-hover:text-plum-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs font-medium text-plum-600">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[#5C3A46] leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 pt-3 border-t border-plum-100 text-xs text-[#44232E]">
                    {item.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-cream-200/60 flex items-center justify-center shrink-0 mt-0.5 text-[#470923]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card footer link */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-plum-50 hover:bg-[#470923] text-[#470923] hover:text-white text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <span>اكتشفي المزيد عن هذا المكون</span>
                    <span>←</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bonus/Gift Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#470923] via-[#630E33] to-[#470923] rounded-3xl p-6 sm:p-8 text-cream-100 shadow-plum-lg relative overflow-hidden">
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-cream-200/10 blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center md:text-right space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-cream-200/20 text-cream-200 text-xs font-bold">
                ✨ علبة فاخرة وأنيقة
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-amiri text-white">
                تغليف صلب وراقٍ يحفظ جميع محتوياتك
              </h3>
              <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl">
                يصلكِ البوكس في علبة صلبة فاخرة وأنيقة تجمع كل مكونات البوكس بتنسيق بديع، لتكون رفيقتكِ اليومية أو هدية تسر قلب من تحبين.
              </p>
            </div>

            <button
              onClick={onOrderClick}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cream-200 to-cream-300 hover:from-cream-300 hover:to-cream-400 text-[#470923] font-extrabold text-sm shadow-md transition-all duration-300 hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>اطلبي البوكس المتكامل (2,700 دج)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-plum-100 max-h-[90vh] flex flex-col text-right">
            
            <div className="relative aspect-video bg-[#FAF0F2]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/box-overview.png';
                }}
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 right-3 bg-[#470923] text-cream-200 px-3 py-1 rounded-full text-xs font-bold">
                {selectedItem.badge}
              </span>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#470923] font-amiri">
                  {selectedItem.title}
                </h3>
                <p className="text-xs font-medium text-plum-600 mt-0.5">
                  {selectedItem.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5A3844] leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#470923]">المميزات والمواصفات:</h4>
                <ul className="space-y-2 text-xs text-[#44232E]">
                  {selectedItem.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-cream-200 flex items-center justify-center shrink-0 mt-0.5 text-[#470923]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOrderClick();
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#470923] hover:bg-plum-800 text-white font-bold text-sm shadow-plum transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-cream-200" />
                  <span>اطلبي البوكس الآن</span>
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

