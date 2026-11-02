import React from 'react';
import { Truck, Sparkles, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#470923] text-cream-200 py-2.5 px-4 text-xs sm:text-sm font-medium border-b border-plum-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cream-200/20 text-cream-200">
            <Sparkles className="w-3 h-3 text-[#F9EACD]" />
          </span>
          <span className="font-semibold text-white">عرض خاص لفترة محدودة:</span>
          <span>تخفيض استثنائي على بوكس مشكاة الأصلي (2,700 دج فقط) 🌸</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-cream-100/90 text-xs">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-cream-300" />
            <span>التوصيل متوفر لـ 58 ولاية 🇩🇿</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cream-300" />
            <span>الدفع عند الاستلام بعد المعاينة</span>
          </div>
        </div>
      </div>
    </div>
  );
}

