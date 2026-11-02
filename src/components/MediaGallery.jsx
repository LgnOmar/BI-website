import React, { useState, useRef } from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, Sparkles, Volume2, VolumeX } from 'lucide-react';

const MEDIA_ITEMS = [
  {
    type: 'video',
    src: '/images/box-video.mp4',
    poster: '/images/box-overview.png',
    title: 'فيديو فتح ومعاينة البوكس (Unboxing)',
    badge: 'فيديو حقيقي 🎥',
    thumbLabel: 'فيديو البوكس',
  },
  {
    type: 'image',
    src: '/images/box-new.jpeg',
    title: 'صورة حقيقية لمكونات بوكس مشكاة الأنيقة',
    badge: 'مكونات البوكس 📸',
    thumbLabel: 'مكونات البوكس',
  },
  {
    type: 'image',
    src: '/images/item-1.jpg',
    title: '1. مفكرة مشكاة الشاملة (3 في 1 للحفظ والتدبر)',
    badge: 'مفكرة 3 في 1 📖',
    thumbLabel: 'المفكرة',
  },
  {
    type: 'image',
    src: '/images/item-2.jpg',
    title: '2. دفتر مشكاة (الحفظ والمراجعة، استوقفتني آية، نصيبي من العلم الشرعي)',
    badge: '3 أقسام إيمانية ✨',
    thumbLabel: 'دفتر مشكاة',
  },
  {
    type: 'image',
    src: '/images/item-3.jpg',
    title: '3. خريطة قلب السور الـ 114 الملونة',
    badge: 'خريطة السور 🗺️',
    thumbLabel: 'خريطة السور',
  },
  {
    type: 'image',
    src: '/images/item-4.jpg',
    title: '4. بطاقات تدبر أسماء الله الحسنى (20 بطاقة) + حامل مكتبي أنيق ومتين',
    badge: '20 بطاقة + حامل 🌿',
    thumbLabel: 'بطاقات الأسماء',
  },
  {
    type: 'image',
    src: '/images/item-5.jpg',
    title: '5. فواصل مصحفية مغناطيسية راقية بألوان جذابة',
    badge: 'فواصل مغناطيسية ✨',
    thumbLabel: 'الفواصل',
  },
  {
    type: 'image',
    src: '/images/box-overview.png',
    title: 'علبة بوكس مشكاة الفاخرة الصلبة لحفظ المحتويات',
    badge: 'العلبة الفاخرة ✨',
    thumbLabel: 'العلبة الفاخرة',
  },
];

export default function MediaGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const currentMedia = MEDIA_ITEMS[currentIndex];

  const handleSelectMedia = (index) => {
    if (currentIndex === 0 && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % MEDIA_ITEMS.length;
    handleSelectMedia(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length;
    handleSelectMedia(prevIdx);
  };

  const toggleVideoPlay = () => {
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
    <div className="w-full max-w-full space-y-3 sm:space-y-4">
      {/* Title & Badge Above Gallery */}
      <div className="space-y-1.5 text-right">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-[#470923] text-xs font-bold border border-rose-200">
          <Sparkles className="w-3.5 h-3.5 text-plum-700" />
          <span>الإصدار الأصلي للمرأة المسلمة 🌸</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-[#470923] font-amiri leading-tight">
          بوكس مشكاة: رفيقتكِ في رحلة مع القرآن
        </h1>
        <p className="text-xs sm:text-sm text-[#5A3844] font-medium leading-relaxed">
          حفظ متقن، تثبيت ذكي، وتدبر يومي في حقيبة روحية واحدة متكاملة وراقية.
        </p>
      </div>

      {/* Main Showcase Viewer - fully responsive on both mobile and desktop */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-plum-950 border-2 border-[#F9EACD] shadow-xl aspect-square sm:aspect-[4/3] max-h-[460px] flex items-center justify-center">
        {currentMedia.type === 'video' ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src={currentMedia.src}
              poster={currentMedia.poster}
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-contain sm:object-cover cursor-pointer"
              onClick={toggleVideoPlay}
            />

            {!isPlaying && (
              <div
                onClick={toggleVideoPlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 text-[#470923] flex items-center justify-center shadow-xl transition-transform hover:scale-110">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                </div>
                <p className="mt-3 text-white font-bold text-[11px] sm:text-xs bg-black/60 px-3 py-1 rounded-full">
                  اضغطي لتشغيل الفيديو الحقيقي 🎥
                </p>
              </div>
            )}

            {/* Video Controls overlay */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-black/60 backdrop-blur-md rounded-xl p-2 flex items-center justify-between text-white text-xs">
              <button
                type="button"
                onClick={toggleVideoPlay}
                className="flex items-center gap-1.5 hover:text-cream-200 transition-colors font-bold"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'إيقاف' : 'تشغيل'}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1 hover:text-cream-200 transition-colors"
                aria-label="الصوت"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-[#FAF0F2]">
            <img
              src={currentMedia.src}
              alt={currentMedia.title}
              className="w-full h-full object-contain sm:object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/box-overview.png';
              }}
            />
          </div>
        )}

        {/* Floating Top Badge */}
        <div className="absolute top-2.5 right-2.5 bg-[#470923]/90 backdrop-blur-md text-cream-200 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
          {currentMedia.badge}
        </div>

        {/* Prev / Next Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#470923] shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#470923] shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Caption bar */}
        <div className="absolute bottom-2 inset-x-2 text-center pointer-events-none">
          <span className="inline-block bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-lg max-w-[90%] truncate">
            {currentMedia.title} ({currentIndex + 1}/{MEDIA_ITEMS.length})
          </span>
        </div>
      </div>

      {/* Thumbnails Strip - smooth touch scroll on mobile */}
      <div className="w-full overflow-x-auto pb-1 flex items-center gap-2 no-scrollbar touch-pan-x">
        {MEDIA_ITEMS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectMedia(idx)}
            className={`shrink-0 w-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all p-0.5 text-center ${
              currentIndex === idx
                ? 'border-[#470923] ring-2 ring-plum-200 bg-white shadow-md'
                : 'border-gray-200 hover:border-plum-300 opacity-70 hover:opacity-100 bg-[#FAF7F2]'
            }`}
          >
            <div className="aspect-square rounded-lg overflow-hidden relative bg-black/10">
              {item.type === 'video' ? (
                <div className="w-full h-full bg-[#470923] flex items-center justify-center text-cream-200">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.thumbLabel}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold text-[#470923] truncate px-1 py-0.5">
              {item.thumbLabel}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
