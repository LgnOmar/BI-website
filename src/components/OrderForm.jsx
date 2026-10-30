import React, { useState } from 'react';
import { WILAYAS } from '../data/wilayas';
import { BUNDLE_OPTIONS, PRODUCT_INFO } from '../data/productData';
import { 
  ShoppingBag, 
  Truck, 
  Home, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  User, 
  MapPin, 
  Gift, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderForm({ selectedBundleId, onSelectBundle }) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilayaCode, setSelectedWilayaCode] = useState('16'); // Default to Alger 16
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'desk'
  const [notes, setNotes] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [errors, setErrors] = useState({});

  // Active bundle
  const activeBundle = BUNDLE_OPTIONS.find(b => b.id === selectedBundleId) || BUNDLE_OPTIONS[0];

  // Selected wilaya details
  const currentWilaya = WILAYAS.find(w => w.code === selectedWilayaCode) || WILAYAS[15]; // Alger default

  // Free delivery check (e.g. bundle duo or trio might qualify for free or discounted delivery)
  const isFreeDelivery = activeBundle.id === 'trio' || (activeBundle.id === 'duo' && currentWilaya.code === '16');

  // Delivery fee calculation
  const deliveryFee = isFreeDelivery 
    ? 0 
    : deliveryType === 'home' 
      ? currentWilaya.homePrice 
      : currentWilaya.deskPrice;

  // Total
  const subtotal = activeBundle.price;
  const grandTotal = subtotal + deliveryFee;

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'يرجى كتابة الاسم الكامل (3 أحرف على الأقل)';
    }

    // Algerian phone number validation: starts with 05, 06, 07, 02 and has 10 digits
    const cleanPhone = phone.replace(/\s+/g, '');
    const phoneRegex = /^(05|06|07|02)\d{8}$/;
    if (!cleanPhone) {
      newErrors.phone = 'يرجى كتابة رقم الهاتف للتواصل';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'يرجى إدخال رقم هاتف جزائري صحيح يبدأ بـ 05، 06، أو 07 مكون من 10 أرقام';
    }

    if (!address.trim()) {
      newErrors.address = 'يرجى كتابة البلدية أو الحي لضمان دقة التوصيل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#470923', '#F9EACD', '#E28D9D', '#D4AF37'],
      });
    } catch (e) {
      // ignore if canvas not supported
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate instant order processing
    setTimeout(() => {
      const orderRef = 'MSH-' + Math.floor(10000 + Math.random() * 90000);
      const summary = {
        orderRef,
        fullName,
        phone,
        wilaya: currentWilaya.name,
        address,
        deliveryType: deliveryType === 'home' ? 'توصيل لباب المنزل' : 'استلام من المكتب (Stop Desk)',
        bundleTitle: activeBundle.title,
        subtotal,
        deliveryFee,
        grandTotal,
        notes,
        isGift,
        giftRecipient,
        date: new Date().toLocaleDateString('ar-DZ'),
      };

      setOrderSummary(summary);
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerConfetti();
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setOrderSummary(null);
    setFullName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setIsGift(false);
    setGiftRecipient('');
  };

  return (
    <section id="order-form" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF8F8] to-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#470923] text-cream-200 text-xs sm:text-sm font-bold shadow-sm">
            <ShoppingBag className="w-4 h-4 text-cream-200" />
            <span>استمارة الطلب المباشر - الدفع عند الاستلام</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#470923] font-amiri leading-tight">
            املئي بياناتكِ لتأكيد حجز بوكس مشكاة الآن
          </h2>

          <p className="text-xs sm:text-sm text-[#68414E]">
            سيتصل بكِ فريق خدمة العملاء خلال ساعات قليلة لتأكيد الطلب وتحديد موعد التوصيل 🇩🇿
          </p>
        </div>

        {/* Success Modal / State */}
        {isSuccess && orderSummary ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-2xl text-right space-y-6 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-amiri text-[#470923]">
                تم تسجيل طلبكِ بنجاح! هنيئاً لكِ 🌸
              </h3>
              <p className="text-sm text-gray-600">
                رقم الطلبية المرجعي: <span className="font-mono font-bold text-[#470923] bg-plum-50 px-2.5 py-1 rounded-lg border border-plum-200">{orderSummary.orderRef}</span>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-plum-100 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-plum-100/70">
                <span className="text-gray-600">الاسم الكريم:</span>
                <span className="font-bold text-[#470923]">{orderSummary.fullName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-plum-100/70">
                <span className="text-gray-600">رقم الهاتف:</span>
                <span className="font-bold text-[#470923] font-mono">{orderSummary.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-plum-100/70">
                <span className="text-gray-600">الولاية والعنوان:</span>
                <span className="font-bold text-[#470923]">{orderSummary.wilaya} - {orderSummary.address}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-plum-100/70">
                <span className="text-gray-600">نوع التوصيل:</span>
                <span className="font-bold text-[#470923]">{orderSummary.deliveryType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-plum-100/70">
                <span className="text-gray-600">الباقة المختارة:</span>
                <span className="font-bold text-[#470923]">{orderSummary.bundleTitle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-plum-100/70">
                <span className="text-gray-600">رسوم التوصيل:</span>
                <span className="font-bold text-[#470923]">
                  {orderSummary.deliveryFee === 0 ? 'توصيل مجاني 🎁' : `${orderSummary.deliveryFee} دج`}
                </span>
              </div>
              <div className="flex justify-between py-2 text-base font-extrabold text-[#470923] bg-cream-200/50 px-3 rounded-xl border border-cream-300">
                <span>المبلغ الكلي للدفع عند الاستلام:</span>
                <span>{orderSummary.grandTotal.toLocaleString()} دج</span>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>الخطوة القادمة:</span>
              </p>
              <p className="text-emerald-900 leading-relaxed pr-5">
                سيتصل بكِ فريق التوزيع هاتفياً للتأكيد قبل إرسال الطرد مع شركة التوصيل. يرجى إبقاء هاتفكِ متاحاً.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `السلام عليكم، قمت بطلب بوكس مشكاة برقم مرجعي ${orderSummary.orderRef} باسم ${orderSummary.fullName}. أود تأكيد الطلب من فضلكم.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تأكيد فوري عبر الواتساب</span>
              </a>

              <button
                onClick={handleReset}
                className="py-3.5 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
              >
                طلب بوكس آخر
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-plum-100 shadow-xl space-y-8 text-right">
            
            {/* Step 1: Choose Bundle */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#470923] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-plum-100 text-[#470923] text-xs font-extrabold flex items-center justify-center">1</span>
                <span>اختاري باقة البوكس:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUNDLE_OPTIONS.map((bundle) => {
                  const isChecked = activeBundle.id === bundle.id;
                  return (
                    <div
                      key={bundle.id}
                      onClick={() => onSelectBundle(bundle.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                        isChecked 
                          ? 'border-[#470923] bg-plum-50/70 shadow-sm' 
                          : 'border-gray-200 hover:border-plum-200 bg-white'
                      }`}
                    >
                      {bundle.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#470923] text-cream-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          الأكثر طلباً ⭐
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#470923]">
                          {bundle.boxes === 1 ? '1 بوكس' : `${bundle.boxes} بوكسات`}
                        </span>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isChecked ? 'border-[#470923] bg-[#470923]' : 'border-gray-300'
                        }`}>
                          {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-base font-extrabold text-[#470923]">
                        {bundle.price.toLocaleString()} دج
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        وفرتي {bundle.saving.toLocaleString()} دج
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Personal Information */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#470923] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-plum-100 text-[#470923] text-xs font-extrabold flex items-center justify-center">2</span>
                  <span>معلومات التوصيل والاستلام:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      الاسم الكامل <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: مريم بلقاسم"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-right focus:outline-none focus:ring-2 pr-10 ${
                          errors.fullName 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-gray-200 focus:border-[#470923] focus:ring-plum-100'
                        }`}
                      />
                      <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      رقم الهاتف (للاتصال بكِ لتسليم الطرد) <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="06 XX XX XX XX"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-left focus:outline-none focus:ring-2 pl-10 ${
                          errors.phone 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-gray-200 focus:border-[#470923] focus:ring-plum-100'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Wilaya Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      الولاية (58 ولاية) <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedWilayaCode}
                        onChange={(e) => setSelectedWilayaCode(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-right focus:outline-none focus:border-[#470923] focus:ring-2 focus:ring-plum-100 bg-white cursor-pointer"
                      >
                        {WILAYAS.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Baladiya / Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      البلدية أو العنوان بالتفصيل <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="مثال: بلدية الأبيار، حي النصر"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-right focus:outline-none focus:ring-2 pr-10 ${
                          errors.address 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-gray-200 focus:border-[#470923] focus:ring-plum-100'
                        }`}
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                    </div>
                    {errors.address && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.address}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Type Option Cards */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-gray-700">
                    مكان استلام الطرد:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Home Delivery */}
                    <div
                      onClick={() => setDeliveryType('home')}
                      className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        deliveryType === 'home'
                          ? 'border-[#470923] bg-plum-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-plum-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-plum-100 flex items-center justify-center text-[#470923]">
                          <Home className="w-4 h-4" />
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-[#470923]">توصيل إلى باب المنزل</p>
                          <p className="text-[11px] text-gray-500">لباب بيتك مع عامل التوصيل</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-[#470923]">
                        {isFreeDelivery ? 'مجاني 🎁' : `${currentWilaya.homePrice} دج`}
                      </span>
                    </div>

                    {/* Desk Delivery */}
                    <div
                      onClick={() => setDeliveryType('desk')}
                      className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        deliveryType === 'desk'
                          ? 'border-[#470923] bg-plum-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-plum-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cream-200 flex items-center justify-center text-[#470923]">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-[#470923]">استلام من المكتب (Stop Desk)</p>
                          <p className="text-[11px] text-gray-500">من أقرب مكتب لشركة التوصيل</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-[#470923]">
                        {isFreeDelivery ? 'مجاني 🎁' : `${currentWilaya.deskPrice} دج`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Optional Gifting Ribbon */}
                <div className="pt-2">
                  <div 
                    onClick={() => setIsGift(!isGift)}
                    className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-[#FAF0F2] border border-plum-100 hover:bg-plum-50/80 transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      checked={isGift} 
                      onChange={() => {}} 
                      className="w-4 h-4 text-[#470923] rounded accent-[#470923] cursor-pointer"
                    />
                    <Gift className="w-4 h-4 text-[#470923]" />
                    <span className="text-xs font-bold text-[#470923]">
                      أريد تقديم هذا البوكس كهدية لشخص آخر (تغليف إهداء وبطاقة مخصصة)
                    </span>
                  </div>

                  {isGift && (
                    <div className="mt-2.5 p-3 bg-white rounded-xl border border-plum-200 space-y-2 animate-in fade-in">
                      <label className="block text-xs font-bold text-gray-700">
                        اسم المهداة إليها (لكتابته على بطاقة الإهداء اليدوية):
                      </label>
                      <input
                        type="text"
                        value={giftRecipient}
                        onChange={(e) => setGiftRecipient(e.target.value)}
                        placeholder="مثال: إلى أختي الغالية فاطمة الزهراء بمناسبة حفظها..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-right focus:outline-none focus:border-[#470923]"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-gray-700">
                    ملاحظات إضافية للتوصيل (اختياري):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: يرجى الاتصال بعد الساعة الواحدة ظهراً..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-right focus:outline-none focus:border-[#470923]"
                  />
                </div>
              </div>

              {/* Order Summary & Pricing Breakdown */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-plum-100 space-y-2.5">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>سعر الباقة ({activeBundle.title}):</span>
                  <span className="font-bold text-[#470923]">{subtotal.toLocaleString()} دج</span>
                </div>
                <div className="flex justify-between text-xs text-gray-700">
                  <span>تكلفة التوصيل ({currentWilaya.name}):</span>
                  <span className="font-bold text-[#470923]">
                    {deliveryFee === 0 ? 'مجاني 🎁' : `${deliveryFee} دج`}
                  </span>
                </div>
                <div className="pt-2 border-t border-plum-200/80 flex justify-between items-center text-base sm:text-lg font-extrabold text-[#470923]">
                  <span>المبلغ الإجمالي للدفع عند الاستلام:</span>
                  <span className="text-xl sm:text-2xl text-[#470923] font-mono">
                    {grandTotal.toLocaleString()} <span className="text-sm font-cairo">دج</span>
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl text-white bg-[#470923] hover:bg-plum-800 font-extrabold text-base sm:text-lg shadow-plum-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري تسجيل طلبكِ...</span>
                    </div>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-cream-200 transition-transform group-hover:rotate-12" />
                      <span>تأكيد الطلب الآن (الدفع عند الاستلام)</span>
                    </>
                  )}
                </button>

                {/* Trust reassurance pills */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ضمان سلامة الطرد 100%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-plum-700" />
                    <span>توصيل سريع من 24 إلى 48 ساعة</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>الدفع بعد فحص المحتويات</span>
                  </span>
                </div>
              </div>
            </form>

          </div>
        )}

      </div>
    </section>
  );
}

