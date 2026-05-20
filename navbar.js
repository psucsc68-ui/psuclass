// ============================================
// ClassMuse — Navbar Component
// ============================================

function renderNavbar() {
  const navbar = document.getElementById('navbar');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <div class="navbar-inner">
      <a class="navbar-logo" onclick="navigateTo('/')" id="nav-logo">
        🎓 <span>ClassMuse</span>
      </a>
      <div class="navbar-links" id="nav-links">
        <a class="navbar-link active" onclick="navigateTo('/')" data-page="home" id="nav-home">
          🏠 หน้าแรก
        </a>
        <a class="navbar-link" onclick="navigateTo('/ranking')" data-page="ranking" id="nav-ranking">
          🏆 อันดับ
        </a>
        <a class="navbar-link" onclick="navigateTo('/compare')" data-page="compare" id="nav-compare">
          ⚖️ เปรียบเทียบ
        </a>
        <a class="navbar-link" onclick="navigateTo('/recommend')" data-page="recommend" id="nav-recommend">
          🎯 แนะนำวิชา
        </a>
        <a class="navbar-link" onclick="navigateTo('/profile')" data-page="profile" id="nav-profile">
          👤 โปรไฟล์
        </a>
      </div>
      <div class="navbar-actions">
        <button class="navbar-btn-write" onclick="navigateTo('/write-review')" id="nav-write-btn">
          ✍️ เขียนรีวิว
        </button>
        <button class="navbar-mobile-toggle" onclick="toggleMobileMenu()" id="nav-mobile-toggle">
          ☰
        </button>
      </div>
    </div>
    <div class="navbar-mobile-menu" id="mobile-menu">
      <a class="navbar-link" onclick="navigateTo('/');closeMobileMenu()">🏠 หน้าแรก</a>
      <a class="navbar-link" onclick="navigateTo('/ranking');closeMobileMenu()">🏆 อันดับ</a>
      <a class="navbar-link" onclick="navigateTo('/compare');closeMobileMenu()">⚖️ เปรียบเทียบ</a>
      <a class="navbar-link" onclick="navigateTo('/recommend');closeMobileMenu()">🎯 แนะนำวิชา</a>
      <a class="navbar-link" onclick="navigateTo('/profile');closeMobileMenu()">👤 โปรไฟล์</a>
      <a class="navbar-link" onclick="navigateTo('/write-review');closeMobileMenu()" style="background:var(--gradient-primary);color:white;text-align:center;border-radius:var(--radius-xl)">✍️ เขียนรีวิว</a>
    </div>
  `;

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function updateActiveNav(page) {
  document.querySelectorAll('.navbar-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}
