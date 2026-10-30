import React from 'react';
import { Send, Heart, Phone, Sparkles, MessageCircle } from 'lucide-react';
import { PRODUCT_INFO } from '../data/productData';

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

export default function Footer({ onOrderClick }) {
  return (
    <footer className="bg-[#2A0515] text-cream-200 pt-16 pb-12 border-t-4 border-[#470923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Spiritual Islamic Closing Reminder Banner */}
        <div className="bg-[#470923]/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-cream-200/20 text-center max-w-3xl mx-auto space-y-3">
          <div className="w-10 h-10 rounded-full bg-cream-200/20 text-cream-200 flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-amiri text-lg sm:text-2xl text-cream-100 font-bold leading-relaxed">
            « يُقَالُ لِصَاحِبِ الْقُرْآنِ: اقْرَأْ وَارْتَقِ وَرَتِّلْ كَمَا كُنْتَ تُرَتِّلُ فِي الدُّنْيَا، فَإِنَّ مَنْزِلَتَكَ عِنْدَ آخِرِ آيَةٍ تَقْرَؤُهَا »
          </p>
          <p className="text-xs text-cream-200/70">
            حديث شريف • نسأل الله أن يرزقكِ بركة القرآن ونوره في الدنيا والآخرة
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center">
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
                <span className="font-amiri text-2xl font-bold text-white block">مِشْكَاة</span>
                <span className="text-[10px] text-cream-300 tracking-wider">GRAPHICS BY BI</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed max-w-sm">
              مشروع جزائري يهدف إلى تصميم أدوات إيمانية وتنظيمية راقية، تعين المرأة المسلمة على تثبيت وتدبر كتاب الله بأسلوب علمي وعصري مبهج.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/graphics.by.bl"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream-200 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream-200 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <span className="text-xs text-cream-200/70 font-mono">
                @Graphics.by.Bl
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <a href="#contents" className="hover:text-white transition-colors">محتويات البوكس</a>
              </li>
              <li>
                <a href="#why-mishkat" className="hover:text-white transition-colors">لماذا بوكس مشكاة؟</a>
              </li>
              <li>
                <a href="#video" className="hover:text-white transition-colors">فيديو تفاصيل البوكس</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">تجارب المشتركات</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">الأسئلة الشائعة</a>
              </li>
            </ul>
          </div>

          {/* Direct CTA */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">هل أنتِ جاهزة لبدء رحلتكِ؟</h4>
            <p className="text-xs text-cream-200/75 leading-relaxed">
              احجزي نسختكِ اليوم واستفيدي من تخفيض الدفعة الحالية مع التوصيل السريع لولايتكِ.
            </p>
            <button
              onClick={onOrderClick}
              className="w-full py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-[#470923] font-bold text-xs transition-colors shadow-sm"
            >
              اطلبي بوكس مشكاة (3,900 دج) 🌸
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} بوكس مشكاة • جميع الحقوق محفوظة لـ Graphics by BI</p>
          <p className="flex items-center gap-1.5">
            <span>صُنع بحب وعناية لخدمة كتاب الله</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
}
