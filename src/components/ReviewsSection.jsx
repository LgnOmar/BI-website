import React from 'react';
import { TESTIMONIALS, PRODUCT_INFO } from '../data/productData';
import { Star, CheckCircle, Quote, ThumbsUp, Heart } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plum-100 text-[#470923] text-xs sm:text-sm font-bold border border-plum-200">
            <Heart className="w-4 h-4 text-[#470923] fill-current" />
            <span>آراء وتجارب المشتركات</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
            ماذا قالت الأخوات اللاتي خضن التجربة معنا؟
          </h2>

          <p className="text-sm sm:text-base text-[#68414E]">
            أكثر من {PRODUCT_INFO.customersCount} أخت من مختلف ولايات الجزائر بدأن رحلتهن مع بوكس مشكاة
          </p>

          {/* Rating Summary Bar */}
          <div className="inline-flex items-center gap-3 bg-[#FAF0F2] px-5 py-2.5 rounded-2xl border border-plum-100 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-[#470923] text-sm">4.9 من 5</span>
            <span className="text-xs text-plum-700">|</span>
            <span className="text-xs text-plum-700 font-semibold">بناءً على 1,420+ تقييم حقيقي</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review, index) => (
            <div
              key={index}
              className="bg-[#FAF7F2] rounded-3xl p-6 border border-plum-100/80 shadow-sm hover:shadow-soft transition-all duration-300 text-right flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    <span>شراء مؤكد</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#4A202D] leading-relaxed relative z-10 font-medium">
                  "{review.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-3 border-t border-plum-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#470923]">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-[#7A5864]">
                    {review.wilaya} • <span className="text-gray-400">{review.date}</span>
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full ${review.avatarBg} font-bold text-xs flex items-center justify-center`}>
                  {review.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

