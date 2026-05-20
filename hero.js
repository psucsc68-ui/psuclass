// ============================================
// ClassMuse — Hero Component
// ============================================

function renderHero() {
  return `
    <section class="hero" id="hero-section">
      <div class="hero-content container">
        <h1 class="animate-fade-in-up">
          รีวิววิชาเรียน<br><span class="text-gradient">ก่อนลงทะเบียน</span>
        </h1>
        <p class="hero-subtitle animate-fade-in-up" style="animation-delay:0.05s">
          ดูรีวิวจริง คะแนน ความยาก จำนวนงาน และคำแนะนำจากรุ่นพี่
        </p>
        <div class="search-bar animate-fade-in-up" style="animation-delay:0.1s" id="hero-search-bar">
          <span class="search-bar-icon">🔍</span>
          <input 
            type="text" 
            placeholder="ค้นหารหัสวิชา / ชื่อวิชา / อาจารย์..." 
            id="hero-search-input"
            autocomplete="off"
          />
          <div class="search-bar-shortcut">
            <kbd>Ctrl</kbd><kbd>K</kbd>
          </div>
          <div class="search-dropdown" id="hero-search-dropdown"></div>
        </div>
        <div class="hero-stats animate-fade-in-up" style="animation-delay:0.15s">
          <div class="hero-stat">
            <div class="hero-stat-value" id="stat-subjects">0</div>
            <div class="hero-stat-label">วิชาทั้งหมด</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value" id="stat-reviews">0</div>
            <div class="hero-stat-label">รีวิวทั้งหมด</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function initHeroSearch() {
  const input = document.getElementById('hero-search-input');
  const dropdown = document.getElementById('hero-search-dropdown');
  if (!input) return;

  input.addEventListener('input', debounce(function() {
    const q = this.value.trim();
    if (q.length < 1) { dropdown.classList.remove('open'); return; }
    const results = searchSubjectsQuery(q).slice(0, 8);
    if (results.length === 0) {
      dropdown.innerHTML = '<div style="padding:16px;text-align:center;color:var(--color-text-tertiary)">ไม่พบวิชาที่ค้นหา</div>';
    } else {
      dropdown.innerHTML = results.map(s => {
        const avg = getAverageRatings(s.id);
        return `
          <div class="search-dropdown-item" onclick="navigateTo('/subject/${s.id}')">
            <div style="width:40px;height:40px;background:var(--color-primary-bg);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">📘</div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:14px">${s.code} ${s.name}</div>
              <div style="font-size:12px;color:var(--color-text-tertiary)">${s.instructor} · ${avg.count} รีวิว</div>
            </div>
            <div style="font-weight:700;color:var(--color-accent)">${avg.overall || '-'}</div>
          </div>
        `;
      }).join('');
    }
    dropdown.classList.add('open');
  }, 200));

  input.addEventListener('blur', () => {
    setTimeout(() => dropdown.classList.remove('open'), 200);
  });

  // Ctrl+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
    }
  });
}

function initHeroStats() {
  const statSubjects = document.getElementById('stat-subjects');
  const statReviews = document.getElementById('stat-reviews');
  if (statSubjects) animateCounter(statSubjects, subjects.length, 800);
  if (statReviews) animateCounter(statReviews, getAllReviewsCount(), 1000);
}
