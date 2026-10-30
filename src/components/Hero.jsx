import React from 'react';
import { Sparkles, CheckCircle2, ArrowDown, ShoppingBag, Star, ShieldCheck, Truck, Gift } from 'lucide-react';
import { PRODUCT_INFO } from '../data/productData';

export default function Hero({ onOrderClick }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#FAF7F2] via-[#FDF5F6] to-[#FAF7F2]">
      {/* Decorative background orbs */}
      <div className="absolute top-10 right-[-10%] w-96 h-96 rounded-full bg-[#FCE7EC]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-80 h-80 rounded-full bg-[#F9EACD]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Text Content Column (Right in RTL) */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6">
            
            {/* Top Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#470923] text-cream-200 shadow-sm">
                <Truck className="w-3.5 h-3.5" />
                <span>التوصيل متوفر لكل الولايات 🇩🇿</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100 text-plum-900 border border-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-plum-700" />
                <span>الإصدار الحصري للمرأة المسلمة</span>
              </span>
            </div>

            {/* Catchy Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#470923] leading-[1.3] font-amiri">
                رفيقتكِ في رحلة مع القرآن...
                <span className="block mt-1 bg-gradient-to-l from-[#470923] via-[#7B1537] to-[#B02652] bg-clip-text text-transparent font-amiri">
                  رحلةٌ تُزهِـرُ فيها رُوحُـك
                </span>
              </h1>
            </div>

            {/* Subheadline Highlighting the Complete Box Experience */}
            <p className="text-base sm:text-lg text-[#5A3844] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              العدة الروحية والعملية المتكاملة التي تجمع لكِ بين <span className="font-bold text-[#470923]">الحفظ الممنهج</span>، <span className="font-bold text-[#470923]">التثبيت الذكي بالتكرار</span>، و<span className="font-bold text-[#470923]">التدبر اليومي لأسماء الله</span>، لتجعلي القرآن ربيع قلبك ورفيق دربك بلا تشتت أو تسويف.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-right">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-plum-100 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-plum-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#470923]" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#470923]">تكرار وتثبيت ذكي</p>
                  <p className="text-plum-700">وداعاً لنسيان وتفلت الآيات</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-plum-100 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#470923]" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#470923]">خريطة الـ 114 سورة</p>
                  <p className="text-plum-700">تحفيز بصري وشغف مستمر</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-plum-100 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#470923]" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#470923]">تدبر أسماء الله</p>
                  <p className="text-plum-700">99 بطاقة مع حامل مكتبي</p>
                </div>
              </div>
            </div>

            {/* Pricing Anchor & CTA Button */}
            <div className="pt-3 space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#470923]">
                      3,900 <span className="text-xl">دج</span>
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      5,400 دج
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block border border-emerald-200">
                    وفري 1,500 دج اليوم (خصم 28%)
                  </span>
                </div>

                <button
                  onClick={onOrderClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white bg-[#470923] hover:bg-plum-800 font-extrabold text-lg shadow-plum-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 group animate-pulse-subtle"
                >
                  <ShoppingBag className="w-5 h-5 text-cream-200 transition-transform group-hover:rotate-12" />
                  <span>اطلبي بوكس مشكاة الآن</span>
                </button>
              </div>

              {/* Trust Features Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#5A3844] pt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>الدفع عند الاستلام بعد المعاينة</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Gift className="w-4 h-4 text-plum-700" />
                  <span>تغليف هدايا فاخر جاهز للإهداء</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>تقييم 4.9/5 (1,400+ أخت مشتركة)</span>
                </span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Column (Left in RTL) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cream-300 via-rose-200 to-plum-200 rounded-3xl blur-xl opacity-60"></div>
              
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border-2 border-[#F9EACD]">
                <div className="relative aspect-[4/4.2] rounded-2xl overflow-hidden bg-[#FCE7EC]/30">
                  <img
                    src="/images/box-hero.jpg"
                    alt="بوكس مشكاة متكامل لحفظ وتدبر القرآن"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      // Fallback to overview image if needed
                      e.target.onerror = null;
                      e.target.src = '/images/box-overview.png';
                    }}
                  />
                  
                  {/* Floating Tag 1: Top Right */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-plum-100 flex items-center gap-2 text-xs font-bold text-[#470923] animate-float">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>5 أدوات متكاملة في بوكس واحد</span>
                  </div>

                  {/* Floating Tag 2: Bottom Left */}
                  <div className="absolute bottom-4 left-4 bg-[#470923]/90 backdrop-blur-md text-cream-200 px-3.5 py-2 rounded-2xl shadow-xl border border-cream-200/30 text-xs font-bold text-right space-y-0.5">
                    <p className="text-[10px] text-cream-300 font-normal">تغليف فاخر بشريط ساتان</p>
                    <p className="flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-cream-200" />
                      <span>جاهز للإهداء المباشر 🎁</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Social Proof Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-plum border border-plum-100 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden rtl:space-x-reverse">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-plum-100 flex items-center justify-center text-xs font-bold text-plum-900">م</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-900">س</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-900">خ</div>
                </div>
                <div className="text-right">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-[#470923]">2,500+ امرأة بدأن رحلتهن</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll down pill */}
        <div className="text-center pt-14 pb-2">
          <a
            href="#contents"
            className="inline-flex items-center gap-2 text-xs font-bold text-plum-800 hover:text-[#470923] transition-colors py-2 px-4 rounded-full bg-white/60 hover:bg-white border border-plum-100 shadow-sm"
          >
            <span>اكتشفي محتويات البوكس بالتفصيل</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

