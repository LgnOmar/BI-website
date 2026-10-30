import React from 'react';
import { EMOTIONAL_BENEFITS } from '../data/productData';
import { Sparkles, XCircle, CheckCircle, Heart, Star, Gift, Compass } from 'lucide-react';

export default function WhyMishkat({ onOrderClick }) {
  return (
    <section id="why-mishkat" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF8F8] to-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 text-[#470923] text-xs sm:text-sm font-bold border border-cream-300">
            <Heart className="w-4 h-4 text-[#470923] fill-current" />
            <span>لماذا صممنا بوكس مشكاة؟</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
            لأن القرآن الكريم يستحق أن نعيش معه بأجمل وأدق طريقة
          </h2>

          <p className="text-sm sm:text-base text-[#68414E] leading-relaxed">
            كم مرة عاهدتِ نفسكِ على البدء في حفظ سورة، ثم تلاشى الحماس وسط دوامة المشاغل؟ صممنا بوكس مشكاة ليكون الحل العملي والروحي لكل العقبات التي واجهتك سابقاً.
          </p>
        </div>

        {/* Problem vs Solution Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EMOTIONAL_BENEFITS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-plum-100 shadow-soft hover:shadow-plum transition-all duration-300 text-right space-y-5 flex flex-col justify-between"
            >
              {/* Problem Statement */}
              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>المعاناة السابقة:</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed pr-6">
                  "{item.problem}"
                </p>
              </div>

              {/* Solution with Mishkat */}
              <div className="bg-[#FAF0F2] p-4 rounded-2xl border border-plum-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-[#470923] font-bold text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>الحل المبتكر مع بوكس مشكاة:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#470923] font-medium leading-relaxed pr-6">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emotional Quote & Gifting Highlight */}
        <div className="mt-14 bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#F9EACD] shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="w-12 h-12 mx-auto rounded-full bg-cream-200/70 flex items-center justify-center text-[#470923]">
              <Gift className="w-6 h-6 text-[#470923]" />
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-amiri text-[#470923] leading-snug">
              "أعظم هدية تقدمينها لنفسكِ... أو لمن تحبين"
            </h3>

            <p className="text-sm sm:text-base text-[#68414E] leading-relaxed">
              تخيلي فرحة والدتكِ، أختكِ، ابنتكِ، أو أعز صديقاتكِ حين تفتح هذا الصندوق وتجد فيه رفيقاً يقرّبها إلى الله تعالى كل يوم. كل حرف تتلوه وكل سورة تحفظها ستكون في ميزان حسناتك بإذن الله.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOrderClick}
                className="px-8 py-3.5 rounded-full bg-[#470923] hover:bg-plum-800 text-white font-extrabold text-sm shadow-plum transition-all duration-300 hover:scale-105"
              >
                اطلبي بوكس مشكاة كهدية فاخرة اليوم 🌸
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

