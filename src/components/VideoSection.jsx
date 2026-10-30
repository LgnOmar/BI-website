import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function VideoSection({ onOrderClick }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="video" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Video Player Column */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden bg-plum-950 shadow-2xl border-4 border-[#F9EACD] aspect-[9/16] sm:aspect-[4/3] max-h-[580px] flex items-center justify-center group">
              <video
                ref={videoRef}
                src="/images/box-video.mp4"
                poster="/images/box-overview.png"
                playsInline
                loop
                muted={isMuted}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Play Overlay Button if not playing */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 text-[#470923] flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <p className="mt-4 text-white font-bold text-sm tracking-wide bg-black/50 px-4 py-1.5 rounded-full">
                    اضغطي لمشاهدة فيديو فتح البوكس (Unboxing) ✨
                  </p>
                </div>
              )}

              {/* Video Controls Bar */}
              <div className="absolute bottom-4 inset-x-4 bg-black/60 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-between text-white text-xs opacity-90 transition-opacity">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 hover:text-cream-200 transition-colors px-2 py-1"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>إيقاف مؤقت</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>تشغيل</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-cream-200 font-medium">
                  تصوير حقيقي لبوكس مشكاة 🌸
                </div>

                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:text-cream-200 transition-colors"
                  aria-label="كتم / تشغيل الصوت"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Video Description & Highlights */}
          <div className="lg:col-span-5 text-right space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-plum-100 text-[#470923] text-xs font-bold border border-plum-200">
              <Sparkles className="w-3.5 h-3.5 text-[#470923]" />
              <span>نظرة حقيقية عن قرب</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
              شاهدِي فخامة البوكس وأناقة تفاصيله قبل أن تطلبيه
            </h2>

            <p className="text-sm sm:text-base text-[#68414E] leading-relaxed">
              نحن نؤمن بأن الصورة الحقيقية أبلغ من ألف كلمة. صُنع بوكس مشكاة بأعلى معايير الإتقان لتلمسي روعة خامة الورق وسلاسة التصفح بنفسكِ فور فتح الصندوق.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-plum-50/60 p-3.5 rounded-2xl border border-plum-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#470923]">ورق عاجي عالي الكثافة (100gsm)</h4>
                  <p className="text-xs text-[#7A5864] mt-0.5">مريح للقراءة تحت الإضاءة ولا يطبع الحبر على الصفحة الخلفية.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-plum-50/60 p-3.5 rounded-2xl border border-plum-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#470923]">حامل خشبي طبيعي ناعم الملمس</h4>
                  <p className="text-xs text-[#7A5864] mt-0.5">محفور بعناية ليحمل بطاقة اليوم بأناقة على مكتبكِ أو رف الكتب.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-plum-50/60 p-3.5 rounded-2xl border border-plum-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#470923]">علبة هدايا صلبة ومغلفة بالساتان</h4>
                  <p className="text-xs text-[#7A5864] mt-0.5">تحمي محتوياتك وتحافظ على جمالها لسنوات قادمة.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-white bg-[#470923] hover:bg-plum-800 font-bold text-sm shadow-plum transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-cream-200" />
                <span>احجزي نسختك الآن قبل نفاد الدفعة</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

