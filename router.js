// ============================================
// ClassMuse — Router (Hash-based SPA)
// ============================================

function navigateTo(path) {
  window.location.hash = path;
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  const path = hash.split('?')[0]; // Remove query params

  closeMobileMenu();

  if (path === '/') {
    renderHomepage();
  } else if (path.startsWith('/subject/')) {
    const subjectId = path.split('/')[2];
    renderSubjectDetail(subjectId);
  } else if (path === '/ranking') {
    renderRankingPage();
  } else if (path === '/compare') {
    renderComparePage();
  } else if (path === '/write-review') {
    renderWriteReviewPage();
  } else if (path === '/recommend') {
    renderRecommendPage();
  } else if (path === '/profile') {
    renderProfilePage();
  } else {
    // 404
    document.getElementById('main-content').innerHTML = `
      <div class="container" style="padding:var(--space-24) 0;text-align:center">
        <div style="font-size:80px;margin-bottom:var(--space-4)">🤔</div>
        <h1>404 — ไม่พบหน้านี้</h1>
        <p style="margin:var(--space-4) 0">หน้าที่คุณค้นหาไม่มีอยู่ในระบบ</p>
        <button class="btn btn-primary" onclick="navigateTo('/')">กลับหน้าแรก</button>
      </div>
    `;
  }
}

// Listen for hash changes
window.addEventListener('hashchange', handleRoute);
