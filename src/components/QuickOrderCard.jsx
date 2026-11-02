import React, { useState, useEffect } from 'react';
import { WILAYAS } from '../data/wilayas';
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
  ShieldCheck, 
  AlertCircle,
  MessageCircle,
  Plus,
  Minus
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Base pricing
const BASE_SINGLE_PRICE = 2700;
const ORIGINAL_SINGLE_PRICE = 3800;

// Google Apps Script Webhook URL (with fallback to user's configured script)
const DEFAULT_GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbw04MPf7VOW56-OP1p7RpW-rMrp2ImMDsCtUGqvl_E_ltL4I5VHg0fyaFZOQN1-e9k4Ug/exec";

export default function QuickOrderCard() {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilayaCode, setSelectedWilayaCode] = useState('16'); // Alger default
  const [selectedCommune, setSelectedCommune] = useState('');
  const [customCommune, setCustomCommune] = useState('');
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'desk'
  
  // Quantity states: 1, 2, 3, or 'custom'
  const [quantityTier, setQuantityTier] = useState(1);
  const [customQuantity, setCustomQuantity] = useState(4);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  // Active Wilaya
  const currentWilaya = WILAYAS.find(w => w.code === selectedWilayaCode) || WILAYAS[15];

  // When wilaya changes, reset commune selection to default
  useEffect(() => {
    if (currentWilaya.communes && currentWilaya.communes.length > 0) {
      setSelectedCommune(currentWilaya.communes[0]);
    } else {
      setSelectedCommune('other');
    }
    setCustomCommune('');
  }, [selectedWilayaCode]);

  // Determine actual quantity number
  const actualQuantity = quantityTier === 'custom' ? Math.max(1, customQuantity) : quantityTier;

  // Calculate pricing based on tier (Base: 2700 DZD)
  let productSubtotal = 0;
  let originalSubtotal = ORIGINAL_SINGLE_PRICE * actualQuantity;
  let savings = 0;

  if (quantityTier === 1) {
    productSubtotal = 2700;
    savings = 1100;
  } else if (quantityTier === 2) {
    productSubtotal = 5000; // 2500 each - save 400 DZD more
    savings = 2600;
  } else if (quantityTier === 3) {
    productSubtotal = 7200; // 2400 each - save 900 DZD more
    savings = 4200;
  } else {
    // Custom quantity (4+) at 2300 DZD each (wholesale rate)
    productSubtotal = actualQuantity * 2300;
    savings = originalSubtotal - productSubtotal;
  }

  // Free delivery for 3 boxes or more
  const isFreeDelivery = actualQuantity >= 3;

  // Form Validation
  const validate = () => {
    const errs = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'يرجى كتابة الاسم الكامل (3 أحرف على الأقل)';
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(05|06|07|02)\d{8}$/;
    if (!cleanPhone) {
      errs.phone = 'يرجى إدخال رقم الهاتف للتواصل';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0655123456)';
    }

    if (selectedCommune === 'other') {
      if (!customCommune.trim()) {
        errs.commune = 'يرجى كتابة اسم البلدية أو الحي';
      }
    } else if (!selectedCommune) {
      errs.commune = 'يرجى اختيار البلدية';
    }

    if (quantityTier === 'custom' && (!customQuantity || customQuantity < 1)) {
      errs.quantity = 'يرجى تحديد كمية صحيحة';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Google Sheets Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const finalCommune = selectedCommune === 'other' ? customCommune.trim() : selectedCommune;
    const orderId = 'MSH-' + Math.floor(10000 + Math.random() * 90000);
    
    const orderPayload = {
      orderId,
      createdAt: new Date().toLocaleString('ar-DZ'),
      fullName: fullName.trim(),
      phone: phone.trim(),
      wilaya: currentWilaya.name,
      commune: finalCommune,
      deliveryType: deliveryType === 'home' ? 'توصيل للمنزل' : 'استلام من المكتب (Stop Desk)',
      quantity: `${actualQuantity} بوكس`,
      productPrice: `${productSubtotal} دج`,
      deliveryFee: isFreeDelivery ? 'توصيل مجاني 🎁' : 'يُحدد عند الاتصال بالزبونة',
      totalPrice: isFreeDelivery ? `${productSubtotal} دج (توصيل مجاني)` : `${productSubtotal} دج (+ مصاريف التوصيل)`,
      notes: quantityTier === 'custom' ? `طلب كمية مخصصة (${actualQuantity})` : ''
    };

    // Use environment variable or fallback to configured webhook
    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_URL || DEFAULT_GOOGLE_SHEET_URL;

    try {
      // POST to Google Apps Script Webhook (no-cors mode avoids preflight blocks)
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(orderPayload),
      });
      console.log('Order successfully dispatched to Google Sheet.');
    } catch (err) {
      console.warn('Google Sheet submission notice:', err);
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#470923', '#F9EACD', '#D4AF37'],
      });
    } catch (e) {}

    setSubmittedData(orderPayload);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedData(null);
    setFullName('');
    setPhone('');
    setCustomCommune('');
  };

  return (
    <div id="quick-order-card" className="w-full max-w-full bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border-2 border-[#470923]/25 shadow-2xl relative text-right">
      
      {/* Top Banner inside card */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-plum-100">
        <div>
          <span className="text-xs font-bold text-plum-700 block">العرض الترويجي للدفعة الحالية</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#470923]">
              {productSubtotal.toLocaleString()} <span className="text-sm font-cairo">دج</span>
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {originalSubtotal.toLocaleString()} دج
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              وفّرتِ {savings.toLocaleString()} دج 💸
            </span>
          </div>
        </div>

        <div className="text-left shrink-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#470923] bg-cream-200/80 px-2.5 py-1 rounded-full border border-cream-300">
            <Sparkles className="w-3 h-3 text-[#470923]" />
            <span>طلب فوري</span>
          </span>
        </div>
      </div>

      {/* Success State */}
      {isSuccess && submittedData ? (
        <div className="space-y-4 animate-in zoom-in-95 py-2">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-amiri text-[#470923] leading-snug">
              تم استلام طلبكِ بنجاح! وسنتصل بكِ قريباً لتأكيده. 🌸
            </h3>
            <p className="text-xs text-gray-600">
              الرقم المرجعي للطلب: <span className="font-mono font-bold text-[#470923] bg-plum-50 px-2 py-0.5 rounded-md border border-plum-200">{submittedData.orderId}</span>
            </p>
          </div>

          {/* Call confirmation reassurance notice */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3 text-right flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 leading-relaxed font-semibold">
              سيتصل بكِ فريق خدمة العملاء هاتفياً لتأكيد طلبيتكِ، وتحديد موعد وتكلفة التوصيل بدقة لبلديتكِ قبل الشحن 📞
            </p>
          </div>

          {/* Receipt details */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-plum-100 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-plum-100/60">
              <span className="text-gray-600">الاسم:</span>
              <span className="font-bold text-[#470923]">{submittedData.fullName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-plum-100/60">
              <span className="text-gray-600">الهاتف:</span>
              <span className="font-bold text-[#470923] font-mono">{submittedData.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-plum-100/60">
              <span className="text-gray-600">الولاية والبلدية:</span>
              <span className="font-bold text-[#470923]">{submittedData.wilaya} - {submittedData.commune}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-plum-100/60">
              <span className="text-gray-600">الكمية:</span>
              <span className="font-bold text-[#470923]">{submittedData.quantity}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-plum-100/60">
              <span className="text-gray-600">مكان الاستلام:</span>
              <span className="font-bold text-[#470923]">{submittedData.deliveryType}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-plum-100/60">
              <span className="text-gray-600">مصاريف التوصيل:</span>
              <span className={`font-bold ${isFreeDelivery ? 'text-emerald-700' : 'text-plum-700'}`}>
                {isFreeDelivery ? 'توصيل مجاني 🎁' : 'تُحدد عند الاتصال التأكيدي 📞'}
              </span>
            </div>
            <div className="flex justify-between py-1.5 text-sm font-extrabold text-[#470923] bg-cream-200/50 px-2.5 rounded-xl border border-cream-300">
              <span>{isFreeDelivery ? 'المجموع الكلي مع التوصيل المجاني:' : 'المجموع (قبل التوصيل):'}</span>
              <span>{productSubtotal.toLocaleString()} دج</span>
            </div>
          </div>

          {/* WhatsApp Direct Confirmation */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `السلام عليكم، قمت بطلب بوكس مشكاة برقم مرجعي ${submittedData.orderId} باسم ${submittedData.fullName}، الكمية: ${submittedData.quantity}. أود تأكيد طلبي من فضلكم.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تأكيد فوري عبر الواتساب</span>
          </a>

          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
          >
            طلب بوكس آخر
          </button>
        </div>
      ) : (
        /* Order Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Quantity Selector: 1, 2, 3 or Custom */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#470923]">
              اختاري الكمية المطلوبة:
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
              {/* Option 1: 1 Box */}
              <button
                type="button"
                onClick={() => setQuantityTier(1)}
                className={`pt-4 pb-2.5 px-2 rounded-xl border-2 text-center transition-all flex flex-col justify-between items-center ${
                  quantityTier === 1
                    ? 'border-[#470923] bg-plum-50/80 text-[#470923] shadow-sm'
                    : 'border-gray-200 hover:border-plum-200 text-gray-700 bg-white'
                }`}
              >
                <span className="text-xs font-extrabold">1 بوكس</span>
                <span className="text-xs font-bold text-[#470923] my-0.5">2,700 دج</span>
                <span className="text-[10px] text-gray-400 line-through">3,800 دج</span>
              </button>

              {/* Option 2: 2 Boxes */}
              <button
                type="button"
                onClick={() => setQuantityTier(2)}
                className={`pt-4 pb-2.5 px-2 rounded-xl border-2 text-center transition-all flex flex-col justify-between items-center relative ${
                  quantityTier === 2
                    ? 'border-[#470923] bg-plum-50/80 text-[#470923] shadow-sm'
                    : 'border-gray-200 hover:border-plum-200 text-gray-700 bg-white'
                }`}
              >
                <span className="absolute -top-2.5 inset-x-0 mx-auto w-max bg-[#470923] text-cream-200 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  الأكثر طلباً ⭐
                </span>
                <span className="text-xs font-extrabold">2 بوكس</span>
                <span className="text-xs font-bold text-[#470923] my-0.5">5,000 دج</span>
                <span className="text-[10px] text-emerald-700 font-bold whitespace-nowrap">وفرتي 400 دج</span>
              </button>

              {/* Option 3: 3 Boxes */}
              <button
                type="button"
                onClick={() => setQuantityTier(3)}
                className={`pt-4 pb-2.5 px-2 rounded-xl border-2 text-center transition-all flex flex-col justify-between items-center relative ${
                  quantityTier === 3
                    ? 'border-[#470923] bg-plum-50/80 text-[#470923] shadow-sm'
                    : 'border-gray-200 hover:border-plum-200 text-gray-700 bg-white'
                }`}
              >
                <span className="absolute -top-2.5 inset-x-0 mx-auto w-max bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  توصيل مجاني 🎁
                </span>
                <span className="text-xs font-extrabold">3 بوكسات</span>
                <span className="text-xs font-bold text-[#470923] my-0.5">7,200 دج</span>
                <span className="text-[10px] text-emerald-700 font-bold whitespace-nowrap">وفرتي 900 دج</span>
              </button>

              {/* Option 4: Custom Quantity */}
              <button
                type="button"
                onClick={() => setQuantityTier('custom')}
                className={`pt-4 pb-2.5 px-2 rounded-xl border-2 text-center transition-all flex flex-col justify-between items-center ${
                  quantityTier === 'custom'
                    ? 'border-[#470923] bg-plum-50/80 text-[#470923] shadow-sm'
                    : 'border-gray-200 hover:border-plum-200 text-gray-700 bg-white'
                }`}
              >
                <span className="text-xs font-extrabold">كمية أخرى</span>
                <span className="text-xs font-bold text-[#470923] my-0.5">2,300 دج/ب</span>
                <span className="text-[10px] text-plum-700 font-medium whitespace-nowrap">سعر الجملة</span>
              </button>
            </div>

            {/* Custom Quantity Stepper if selected */}
            {quantityTier === 'custom' && (
              <div className="p-3 bg-plum-50/60 rounded-xl border border-plum-200 flex items-center justify-between gap-3 animate-in fade-in">
                <span className="text-xs font-bold text-[#470923]">
                  حددي عدد البوكسات المطلوبة (4 فأكثر):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomQuantity(Math.max(4, customQuantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-plum-200 flex items-center justify-center font-bold text-[#470923] hover:bg-plum-100"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center py-1 rounded-lg border border-plum-200 font-bold text-sm text-[#470923] bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomQuantity(customQuantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-plum-200 flex items-center justify-center font-bold text-[#470923] hover:bg-plum-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">
              الاسم الكامل <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: مريم بلقاسم"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-right focus:outline-none focus:ring-2 pr-9 ${
                  errors.fullName 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                    : 'border-gray-200 focus:border-[#470923] focus:ring-plum-100'
                }`}
              />
              <User className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
            </div>
            {errors.fullName && (
              <p className="text-[10px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* 3. Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">
              رقم الهاتف (للاتصال لتأكيد الطلب وتسليم الطرد) <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 XX XX XX XX"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-left focus:outline-none focus:ring-2 pl-9 ${
                  errors.phone 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                    : 'border-gray-200 focus:border-[#470923] focus:ring-plum-100'
                }`}
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
            {errors.phone && (
              <p className="text-[10px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* 4. Wilaya & Commune Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Wilaya Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">
                الولاية (58 ولاية) <span className="text-rose-600">*</span>
              </label>
              <select
                value={selectedWilayaCode}
                onChange={(e) => setSelectedWilayaCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm text-right focus:outline-none focus:border-[#470923] bg-white cursor-pointer"
              >
                {WILAYAS.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Commune Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">
                البلدية <span className="text-rose-600">*</span>
              </label>
              <select
                value={selectedCommune}
                onChange={(e) => setSelectedCommune(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-base sm:text-sm text-right focus:outline-none focus:border-[#470923] bg-white cursor-pointer ${
                  errors.commune ? 'border-rose-400' : 'border-gray-200'
                }`}
              >
                <option value="">-- اختاري البلدية --</option>
                {currentWilaya.communes && currentWilaya.communes.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
                <option value="other">✍️ أخرى (كتابة يدوية)</option>
              </select>
            </div>
          </div>

          {/* Manual Commune input if "other" is selected */}
          {selectedCommune === 'other' && (
            <div className="space-y-1 animate-in fade-in">
              <label className="block text-xs font-bold text-[#470923]">
                اكتبي اسم البلدية أو الحي بالتفصيل: <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customCommune}
                  onChange={(e) => setCustomCommune(e.target.value)}
                  placeholder="مثال: بلدية أولاد يعيش، حي الأمل"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-plum-300 text-base sm:text-sm text-right focus:outline-none focus:ring-2 focus:ring-plum-100 pr-9 bg-plum-50/20"
                />
                <MapPin className="w-4 h-4 text-plum-700 absolute right-3 top-3.5" />
              </div>
              {errors.commune && (
                <p className="text-[10px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.commune}</span>
                </p>
              )}
            </div>
          )}

          {/* 5. Delivery Type Selector (Fees hidden until phone confirmation) */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-gray-700">
              طريقة ومكان الاستلام المفضلة:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => setDeliveryType('home')}
                className={`cursor-pointer p-2.5 rounded-xl border-2 transition-all flex items-center justify-between text-xs ${
                  deliveryType === 'home'
                    ? 'border-[#470923] bg-plum-50/70 font-bold text-[#470923]'
                    : 'border-gray-200 hover:border-plum-200 text-gray-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#470923]" />
                  <span>لباب المنزل</span>
                </div>
                {isFreeDelivery ? (
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                    مجاني 🎁
                  </span>
                ) : (
                  <span className="text-[10px] text-plum-700 font-semibold">
                    يُحدد هاتفياً 📞
                  </span>
                )}
              </div>

              <div
                onClick={() => setDeliveryType('desk')}
                className={`cursor-pointer p-2.5 rounded-xl border-2 transition-all flex items-center justify-between text-xs ${
                  deliveryType === 'desk'
                    ? 'border-[#470923] bg-plum-50/70 font-bold text-[#470923]'
                    : 'border-gray-200 hover:border-plum-200 text-gray-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#470923]" />
                  <span>من المكتب (Stop Desk)</span>
                </div>
                {isFreeDelivery ? (
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                    مجاني 🎁
                  </span>
                ) : (
                  <span className="text-[10px] text-plum-700 font-semibold">
                    يُحدد هاتفياً 📞
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 6. Live Order Summary */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-plum-100 space-y-2 text-xs">
            <div className="flex justify-between text-gray-700">
              <span>سعر المنتج ({actualQuantity} بوكس):</span>
              <span className="font-bold text-[#470923]">{productSubtotal.toLocaleString()} دج</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>مصاريف التوصيل ({currentWilaya.name}):</span>
              {isFreeDelivery ? (
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  توصيل مجاني 🎁
                </span>
              ) : (
                <span className="font-bold text-plum-700">
                  يتم تأكيدها معكم هاتفياً 📞
                </span>
              )}
            </div>
            <div className="pt-2 border-t border-plum-200/80 flex justify-between items-center text-sm sm:text-base font-extrabold text-[#470923]">
              <span>{isFreeDelivery ? 'المجموع الكلي (شامل التوصيل المجاني):' : 'المجموع (قبل مصاريف التوصيل):'}</span>
              <span className="text-lg sm:text-xl font-mono text-[#470923]">
                {productSubtotal.toLocaleString()} <span className="text-xs font-cairo">دج</span>
              </span>
            </div>
          </div>

          {/* Reassurance Banner Before Submitting */}
          <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-3 text-right flex items-start gap-2.5 shadow-sm">
            <Phone className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 leading-relaxed font-semibold">
              سنتصل بكِ هاتفياً لتأكيد الطلب وتحديد موعد وسعر التوصيل المناسب لولايتكِ وبلديتكِ قبل الشحن 📞
            </p>
          </div>

          {/* 7. Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl text-white bg-[#470923] hover:bg-plum-800 font-extrabold text-sm sm:text-base shadow-plum-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75 touch-manipulation"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري إرسال طلبكِ...</span>
              </div>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-cream-200" />
                <span>إرسال الطلب (الدفع عند الاستلام)</span>
              </>
            )}
          </button>

          {/* Trust badges strip */}
          <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 pt-1">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>الدفع بعد المعاينة</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <Truck className="w-3.5 h-3.5 text-plum-700" />
              <span>توصيل سريع</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ضمان الرضا 100%</span>
            </span>
          </div>
        </form>
      )}

    </div>
  );
}
