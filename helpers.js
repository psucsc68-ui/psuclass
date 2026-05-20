// ============================================
// ClassMuse — Helpers
// ============================================

function renderStars(rating, size = 18) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += `<svg class="rating-star filled" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    } else if (i - 0.5 <= rating) {
      html += `<svg class="rating-star half" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    } else {
      html += `<svg class="rating-star" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }
  }
  return html;
}

function timeAgo(dateStr) {
  return dateStr;
}

function truncateText(text, maxLen = 150) {
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen) + '...';
}

function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function animateCounter(el, target, duration = 1000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function getRatingColor(rating) {
  if (rating >= 4.5) return '#10B981';
  if (rating >= 3.5) return '#3B82F6';
  if (rating >= 2.5) return '#F59E0B';
  return '#EF4444';
}

function getWorkloadLabel(workload) {
  if (workload <= 1.5) return 'น้อยมาก';
  if (workload <= 2.5) return 'น้อย';
  if (workload <= 3.5) return 'ปานกลาง';
  if (workload <= 4.5) return 'เยอะ';
  return 'เยอะมาก';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
