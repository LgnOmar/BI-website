import React from 'react';
import { Truck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: Truck,
      title: "توصيل سريع لـ 58 ولاية",
      desc: "إلى باب منزلك أو أقرب مكتب استلام",
    },
    {
      icon: ShieldCheck,
      title: "الدفع عند الاستلام 100%",
      desc: "افحصي طلبيتك أولاً ثم ادفعي براحة تامة",
    },
    {
      icon: Sparkles,
      title: "ورق وخامات فاخرة",
      desc: "ورق عاجي سميك وطباعة حريرية تدوم",
    },
    {
      icon: HeartHandshake,
      title: "ضمان الرضا والاستبدال",
      desc: "فريقنا في خدمتك لمتابعة كل تفاصيل طلبك",
    },
  ];

  return (
    <section className="bg-white border-y border-plum-100 py-6 sm:py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-right gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF0F2] flex items-center justify-center shrink-0 text-[#470923] border border-plum-100 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#470923] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A5864] mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

