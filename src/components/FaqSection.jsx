import React, { useState } from 'react';
import { FAQS } from '../data/productData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // open first question by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 text-[#470923] text-xs sm:text-sm font-bold border border-cream-300">
            <HelpCircle className="w-4 h-4 text-[#470923]" />
            <span>إجابات واضحة لأسئلتكِ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
            الأسئلة الأكثر شيوعاً حول بوكس مشكاة
          </h2>

          <p className="text-xs sm:text-sm text-[#68414E]">
            إذا كان لديكِ أي استفسار آخر، يسعدنا تواصلكِ معنا عبر الواتساب أو الإنستغرام
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-plum-100 bg-[#FAF7F2] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#470923] hover:text-plum-700 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#470923] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-plum-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#470923]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C3A46] leading-relaxed border-t border-plum-100/60 bg-white/70 animate-in fade-in">
                    <p className="pr-5">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

