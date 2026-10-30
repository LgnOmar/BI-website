/**
 * ============================================================================
 * GOOGLE APPS SCRIPT TEMPLATE FOR MISHKAT BOX (بوكس مشكاة)
 * ============================================================================
 * 
 * Instructions to deploy in 2 minutes:
 * 1. Create a new Google Sheet (or open an existing one).
 * 2. In row 1, set the column headers:
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
 * 3. Go to: Extensions (إضافات) -> Apps Script.
 * 4. Replace any existing code with the snippet below and click "Save" (Ctrl+S).
 * 5. Click "Deploy" (نشر) -> "New deployment" (نشر جديد).
 * 6. Click the gear icon (Select type) -> choose "Web app" (تطبيق ويب).
 * 7. Set:
 *    - Description: Mishkat Order Webhook
 *    - Execute as: Me (حسابي)
 *    - Who has access: Anyone (أي شخص)  <-- IMPORTANT!
 * 8. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 9. Paste this URL into your .env.local file:
 *    VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 * ============================================================================
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append the row to Google Sheets
    sheet.appendRow([
      data.createdAt || new Date().toLocaleString('ar-DZ'),
      data.orderId || ('MSH-' + Math.floor(10000 + Math.random() * 90000)),
      data.fullName || '',
      data.phone || '',
      data.wilaya || '',
      data.commune || '',
      data.deliveryType || '',
      data.quantity || '1',
      data.totalPrice || '',
      data.notes || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Order recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Mishkat Box Webhook is active.");
}

