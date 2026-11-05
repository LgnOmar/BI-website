/**
 * ============================================================================
 * GOOGLE APPS SCRIPT FOR MISHKAT BOX (بوكس مشكاة) - TELEGRAM + GMAIL ALERTS
 * ============================================================================
 * 
 * طريقة الإعداد في دقيقتين (لصاحب المتجر / العميل):
 * 1. افتح جدول بيانات جديد في Google Sheets من حسابك الخاص.
 * 2. في الصف الأول، اكتب عناوين الأعمدة التالية:
 *    A1: التاريخ والوقت (Date)
 *    B1: رقم الطلب (Order ID)
 *    C1: الاسم الكامل (Full Name)
 *    D1: رقم الهاتف (Phone)
 *    E1: الولاية (Wilaya)
 *    F1: البلدية (Commune)
 *    G1: نوع التوصيل (Delivery Type)
 *    H1: الكمية / الباقة (Quantity)
 *    I1: المجموع الكلي (Total Price)
 *    J1: ملاحظات (Notes)
 * 
 * 3. من القائمة العلوية اضغط: إضافات (Extensions) -> Apps Script.
 * 4. امسح أي كود موجود والصق هذا الكود بالكامل.
 * 5. ضع توكن بوت تليجرام ومعرف الشات (TELEGRAM_BOT_TOKEN و TELEGRAM_CHAT_ID) في السطرين 35 و 36 أدناه.
 * 6. اضغط حفظ (Ctrl + S).
 * 7. اضغط على زر: نشر (Deploy) -> نشر جديد (New deployment).
 * 8. اضغط على أيقونة الترس (اختر النوع) واختر: تطبيق ويب (Web app).
 * 9. املأ الإعدادات كالتالي:
 *    - الوصف (Description): Mishkat Order Webhook
 *    - التنفيذ باسم (Execute as): حسابي (Me)  <-- هام جداً
 *    - من يملك حق الوصول (Who has access): أي شخص (Anyone)  <-- هام جداً
 * 10. اضغط Deploy (نشر)، ثم امنح الأذونات لحسابك (Authorize access).
 * 11. انسخ رابط تطبيق الويب الناتج (Web app URL) وأرسله للمطور لوضعه في الموقع.
 * ============================================================================
 */

// ============================================================================
// ⚙️ إعدادات إشعارات تليجرام (TELEGRAM CONFIGURATION)
// ============================================================================
const TELEGRAM_BOT_TOKEN = "9019390514:AAEOn85RImUHSWNUbEwaTUul1jSA9J2r2qA"; // @mishkat_bi_bot
const TELEGRAM_CHAT_ID = "722219458";                                         // Chat ID

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const orderId = data.orderId || ('MSH-' + Math.floor(10000 + Math.random() * 90000));
    const createdAt = data.createdAt || new Date().toLocaleString('ar-DZ');
    const fullName = data.fullName || 'زبونة مجهولة';
    const phone = data.phone || '';
    const wilaya = data.wilaya || '';
    const commune = data.commune || '';
    const deliveryType = data.deliveryType || '';
    const quantity = data.quantity || '1';
    const totalPrice = data.totalPrice || '';
    const notes = data.notes || '';

    // 1. إضافة سطر الطلبية إلى جدول Google Sheets
    sheet.appendRow([
      createdAt,
      orderId,
      fullName,
      phone,
      wilaya,
      commune,
      deliveryType,
      quantity,
      totalPrice,
      notes
    ]);

    // 2. إرسال إشعار فوري إلى تيليجرام (Telegram Push Alert)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "PASTE_YOUR_BOT_TOKEN_HERE" && TELEGRAM_CHAT_ID && TELEGRAM_CHAT_ID !== "PASTE_YOUR_CHAT_ID_HERE") {
      try {
        const cleanPhone = (phone || '').replace(/[\s\-\.]/g, '');
        const telegramMessage =
          `🌸 *وصلتكِ طلبية جديدة لبوكس مشكاة!* 🔔\n\n` +
          `🆔 *رقم الطلب:* \`${orderId}\`\n` +
          `👤 *اسم الزبونة:* *${fullName}*\n` +
          `📞 *رقم الهاتف:* \`${phone}\`\n` +
          `📍 *الولاية والبلدية:* *${wilaya}* - ${commune}\n` +
          `🚚 *نوع الاستلام:* ${deliveryType}\n` +
          `📦 *الكمية:* *${quantity}*\n` +
          `💰 *المبلغ الإجمالي:* *${totalPrice}*\n` +
          (notes ? `📝 *ملاحظات:* ${notes}\n` : '') +
          `⏰ *التاريخ:* ${createdAt}\n\n` +
          `👉 *اتصال بالزبونة:* [اضغط هنا للاتصال هاتفياً](tel:${cleanPhone})\n` +
          `📊 [فتح جدول الطلبيات في Google Sheets](${SpreadsheetApp.getActiveSpreadsheet().getUrl()})`;

        UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "post",
          contentType: "application/json",
          payload: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
            disable_web_page_preview: true
          }),
          muteHttpExceptions: true
        });
        console.log("Telegram notification dispatched successfully.");
      } catch (tgError) {
        console.warn("Could not dispatch Telegram alert: " + tgError.toString());
      }
    }

    // 3. إرسال إشعار فوري إلى بريد الجيميل (Gmail) الخاص بصاحب المتجر
    try {
      const storeOwnerEmail = Session.getEffectiveUser().getEmail();
      const emailSubject = `🔔 طلبية جديدة: ${orderId} | ${fullName} (${wilaya})`;

      const emailHtml = `
        <div dir="rtl" style="font-family: Arial, Tahoma, sans-serif; background-color: #FAF6F0; padding: 25px; color: #333333; line-height: 1.6;">
          <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border-top: 6px solid #470923;">
            
            <div style="background-color: #470923; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">🌸 وصلتكِ طلبية جديدة لبوكس مشكاة!</h2>
              <p style="margin: 5px 0 0 0; color: #E8D3A7; font-size: 14px;">رقم الطلب: <strong>${orderId}</strong></p>
            </div>

            <div style="padding: 25px;">
              <p style="font-size: 15px; color: #444; margin-top: 0;">
                السلام عليكم، تم تسجيل طلب جديد من موقعكِ الآن. إليكِ كافة بيانات الزبونة:
              </p>

              <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f0e6e6;">
                  <td style="padding: 10px; font-weight: bold; color: #470923; width: 35%;">اسم الزبونة:</td>
                  <td style="padding: 10px; font-weight: bold; font-size: 15px;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0e6e6; background-color: #FFF9F7;">
                  <td style="padding: 10px; font-weight: bold; color: #470923;">رقم الهاتف:</td>
                  <td style="padding: 10px;">
                    <a href="tel:${phone}" style="display: inline-block; background-color: #470923; color: #ffffff; padding: 6px 14px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 15px;">
                      📞 ${phone} (اضغطي للاتصال)
                    </a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f0e6e6;">
                  <td style="padding: 10px; font-weight: bold; color: #470923;">الولاية والبلدية:</td>
                  <td style="padding: 10px;"><strong>${wilaya}</strong> - ${commune}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0e6e6; background-color: #FFF9F7;">
                  <td style="padding: 10px; font-weight: bold; color: #470923;">نوع الاستلام:</td>
                  <td style="padding: 10px;">${deliveryType}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0e6e6;">
                  <td style="padding: 10px; font-weight: bold; color: #470923;">الكمية المطلوبة:</td>
                  <td style="padding: 10px; font-weight: bold; color: #470923;">${quantity}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0e6e6; background-color: #FFF9F7;">
                  <td style="padding: 10px; font-weight: bold; color: #470923;">المبلغ الإجمالي:</td>
                  <td style="padding: 10px; font-weight: bold; font-size: 16px; color: #2E7D32;">${totalPrice}</td>
                </tr>
                ${notes ? `
                <tr style="border-bottom: 1px solid #f0e6e6;">
                  <td style="padding: 10px; font-weight: bold; color: #470923;">ملاحظات:</td>
                  <td style="padding: 10px; color: #666;">${notes}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #888;">وقت الطلب:</td>
                  <td style="padding: 10px; color: #888; font-size: 12px;">${createdAt}</td>
                </tr>
              </table>

              <div style="margin-top: 25px; padding: 15px; background-color: #FAF4EB; border-radius: 8px; border: 1px solid #E5D5C5; text-align: center;">
                <p style="margin: 0; font-size: 13px; color: #6D4C41;">
                  💡 <strong>نصيحة لتأكيد الطلب:</strong> يُستحسن الاتصال بالزبونة هاتفياً خلال أقرب وقت لتأكيد طلبيتها وتحديد سعر الشحن النهائي.
                </p>
              </div>

              <div style="text-align: center; margin-top: 20px;">
                <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" target="_blank" style="color: #470923; font-size: 13px; text-decoration: underline;">
                  📊 فتح جدول الطلبيات في Google Sheets
                </a>
              </div>
            </div>

            <div style="background-color: #F5EFEB; padding: 12px; text-align: center; font-size: 12px; color: #888;">
              تم إرسال هذا الإشعار تلقائياً من صفحة هبوط بوكس مشكاة (Graphics by BI).
            </div>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: storeOwnerEmail,
        subject: emailSubject,
        htmlBody: emailHtml
      });
      console.log("Email notification sent successfully to " + storeOwnerEmail);
    } catch (mailError) {
      console.warn("Could not dispatch email notification: " + mailError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Order recorded and email notification triggered successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Mishkat Box Webhook with Instant Email Alerts is running smoothly.");
}

/**
 * دالة لاختبار إرسال تيليجرام ومنح الصلاحيات (Authorization) بنقرة واحدة داخل Apps Script:
 * اختر هذه الدالة من القائمة العلوية واضغط Run (تشغيل)
 */
function testTelegram() {
  const telegramMessage = "🌸 تجربة إشعار تيليجرام من داخل Google Apps Script: الربط يعمل بنجاح! 🚀";
  const res = UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage
    })
  });
  Logger.log("Telegram Response: " + res.getContentText());
}
