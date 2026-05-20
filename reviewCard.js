// ============================================
// ClassMuse — Review Card Component
// ============================================

function renderReviewCard(review, showSubject = false) {
  const subjectInfo = showSubject ? getSubjectById(review.subjectId) : null;
  const authorName = review.anonymous ? '👤 ไม่ระบุตัวตน' : (review.alias || 'ผู้ใช้');
  const tagsHtml = review.tags.map(tag =>
    `<span class="tag" style="border-color:${getTagColor(tag)}30;color:${getTagColor(tag)}">${tag}</span>`
  ).join('');

  return `
    <div class="review-card" id="review-${review.id}">
      ${showSubject && subjectInfo ? `
        <div style="margin-bottom:var(--space-3);padding-bottom:var(--space-3);border-bottom:1px solid var(--color-border)">
          <a onclick="navigateTo('/subject/${subjectInfo.id}')" style="font-weight:600;cursor:pointer;font-size:var(--text-sm)">${subjectInfo.code} ${subjectInfo.name}</a>
        </div>
      ` : ''}
      <div class="review-card-header">
        <div class="review-card-author">
          <div class="avatar avatar-sm" style="background:${review.anonymous ? 'var(--color-surface-2)' : 'var(--gradient-primary)'}">
            ${review.anonymous ? '👤' : (review.alias ? review.alias.charAt(0) : '?')}
          </div>
          <div>
            <div class="review-card-author-name">${authorName}</div>
            <div class="review-card-author-meta">เทอม ${review.semester}</div>
          </div>
        </div>
        <div class="review-card-rating">
          ${renderStars(review.overall, 16)}
          <span style="font-weight:700;color:var(--color-accent);margin-left:4px">${review.overall}</span>
        </div>
      </div>
      <div class="review-card-content">${review.content}</div>
      ${tagsHtml ? `<div class="review-card-tags">${tagsHtml}</div>` : ''}
      <div class="review-card-actions">
        <button class="review-action-btn" onclick="toggleHelpful('${review.id}')" id="helpful-${review.id}">
          👍 มีประโยชน์ <span>${review.helpful}</span>
        </button>
        <button class="review-action-btn" onclick="showComments('${review.id}')">
          💬 ความคิดเห็น <span>${review.comments}</span>
        </button>
        <button class="review-action-btn" onclick="toggleSave('${review.id}')" id="save-${review.id}">
          🔖 บันทึก
        </button>
      </div>
    </div>
  `;
}

function toggleHelpful(reviewId) {
  const review = reviews.find(r => r.id === reviewId);
  if (review) {
    review.helpful++;
    saveReviews();
    const btn = document.querySelector(`#helpful-${reviewId} span`);
    if (btn) btn.textContent = review.helpful;
    const b = document.getElementById(`helpful-${reviewId}`);
    if (b) b.classList.add('active');
    showToast('ขอบคุณสำหรับ feedback! 👍', 'success');
  }
}

function toggleSave(reviewId) {
  const btn = document.getElementById(`save-${reviewId}`);
  if (btn) {
    btn.classList.toggle('active');
    const isSaved = btn.classList.contains('active');
    showToast(isSaved ? 'บันทึกรีวิวแล้ว 🔖' : 'ยกเลิกบันทึกแล้ว', isSaved ? 'success' : 'info');
  }
}

function showComments(reviewId) {
  showToast('ฟีเจอร์ความคิดเห็นจะมาเร็วๆ นี้ 💬', 'info');
}
