// ============================================
// ClassMuse — Google Sheets Integration
// ============================================

// ⚠️ แทนที่ URL นี้ด้วย Web App URL ของคุณหลัง deploy Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEqMNvUb0-pH4ofHP6BDIW98iaLWyM7Ug9yjmGLOMQmZN_-sslOD4asM2eALcut4Ce6Q/exec';

// ---- Load data from Google Sheets ----
async function loadFromSheets() {
  if (!APPS_SCRIPT_URL) {
    console.warn('ClassMuse: ยังไม่ได้ตั้งค่า APPS_SCRIPT_URL — ใช้ข้อมูลจาก localStorage');
    return false;
  }

  try {
    showToast('กำลังโหลดข้อมูล...', 'info');
    const response = await fetch(APPS_SCRIPT_URL + '?action=all');
    const data = await response.json();

    if (data.error) {
      console.error('Sheet error:', data.error);
      showToast('โหลดข้อมูลจาก Sheet ไม่ได้ — ใช้ข้อมูล local', 'warning');
      return false;
    }

    // Merge sheet data with local data
    if (data.subjects && data.subjects.length > 0) {
      // Clear and reload subjects
      subjects.length = 0;
      data.subjects.forEach(s => {
        // Ensure required fields
        s.tags = s.tags || [];
        s.warnings = s.warnings || [];
        s.studyFormat = s.studyFormat || 'ยังไม่ระบุ';
        s.examFormat = s.examFormat || 'ยังไม่ระบุ';
        s.weeklyHours = s.weeklyHours || 3;
        s.semester = s.semester || '1/2568';
        s.description = s.description || s.name;
        subjects.push(s);
      });
      saveSubjects(); // Cache locally
    }

    if (data.reviews && data.reviews.length > 0) {
      reviews.length = 0;
      data.reviews.forEach(r => {
        r.tags = r.tags || [];
        r.helpful = r.helpful || 0;
        r.comments = r.comments || 0;
        reviews.push(r);
      });
      saveReviews(); // Cache locally
    }

    console.log(`ClassMuse: Loaded ${subjects.length} subjects, ${reviews.length} reviews from Sheets`);
    return true;
  } catch (err) {
    console.error('Failed to load from Sheets:', err);
    showToast('ไม่สามารถเชื่อมต่อ Google Sheets — ใช้ข้อมูล local', 'warning');
    return false;
  }
}

// ---- Save subject to Google Sheets ----
async function saveSubjectToSheet(subject) {
  if (!APPS_SCRIPT_URL) return;
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'addSubject', payload: subject })
    });
  } catch (err) {
    console.error('Failed to save subject to sheet:', err);
  }
}

// ---- Save review to Google Sheets ----
async function saveReviewToSheet(review) {
  if (!APPS_SCRIPT_URL) return;
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'addReview', payload: review })
    });
  } catch (err) {
    console.error('Failed to save review to sheet:', err);
  }
}

// ---- Delete subject from Google Sheets ----
async function deleteSubjectFromSheet(id) {
  if (!APPS_SCRIPT_URL) return;
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'deleteSubject', id: id })
    });
  } catch (err) {
    console.error('Failed to delete subject from sheet:', err);
  }
}

// ---- Delete review from Google Sheets ----
async function deleteReviewFromSheet(id) {
  if (!APPS_SCRIPT_URL) return;
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'deleteReview', id: id })
    });
  } catch (err) {
    console.error('Failed to delete review from sheet:', err);
  }
}
