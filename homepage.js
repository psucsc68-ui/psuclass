// ============================================
// ClassMuse — Homepage
// ============================================

function renderHomepage() {
  const topRankings = getRankings('top').slice(0, 5);
  const chillRankings = getRankings('chill').slice(0, 4);
  const teacherRankings = getRankings('best-teacher').slice(0, 4);
  const easyRankings = getRankings('easy-pass').slice(0, 4);
  const avoidRankings = getRankings('avoid').slice(0, 4);

  // Trending = most reviews
  const trendingSubjects = subjects.map(s => ({...s, avg: getAverageRatings(s.id)}))
    .sort((a, b) => b.avg.count - a.avg.count).slice(0, 8);

  const main = document.getElementById('main-content');
  main.innerHTML = `
    ${renderHero()}

    <!-- Filter Bar -->
    <section class="container" style="margin-top:calc(-1 * var(--space-4))">
      <div class="filter-bar" id="filter-bar">
        ${filterOptions.map(f => `
          <button class="filter-chip ${f.id === 'all' ? 'active' : ''}" onclick="applyFilter('${f.id}')" data-filter="${f.id}">
            ${f.emoji} ${f.label}
          </button>
        `).join('')}
      </div>
    </section>

    <!-- Filtered Results (hidden by default) -->
    <section class="container section" id="filtered-results" style="display:none">
      <div class="section-header">
        <div>
          <h2 class="section-title" id="filtered-title">ผลลัพธ์</h2>
          <p class="section-subtitle" id="filtered-count"></p>
        </div>
        <button class="btn btn-ghost" onclick="clearFilter()">✕ ล้างตัวกรอง</button>
      </div>
      <div class="grid grid-auto-fill stagger-children" id="filtered-grid"></div>
    </section>

    <!-- Default sections -->
    <div id="home-sections">
      ${subjects.length === 0 ? `
      <!-- Empty State -->
      <section class="container section" style="padding:var(--space-16) 0">
        <div class="empty-state">
          <div class="empty-state-icon" style="font-size:80px">📚</div>
          <div class="empty-state-title" style="font-size:var(--text-2xl)">ยังไม่มีวิชาในระบบ</div>
          <div class="empty-state-desc" style="max-width:400px;margin:0 auto var(--space-6)">
            เริ่มต้นใช้งาน ClassMuse — เพิ่มวิชาแรกแล้วเขียนรีวิวให้รุ่นน้อง!
          </div>
          <button class="btn btn-primary btn-lg" onclick="navigateTo('/write-review')">
            ✍️ เพิ่มวิชาและเขียนรีวิว
          </button>
        </div>
      </section>
      ` : `
      <!-- 🔥 Trending -->
      <section class="container section">
        <div class="section-header">
          <div>
            <h2 class="section-title">🔥 Trending วิชา</h2>
            <p class="section-subtitle">วิชาที่ได้รับความสนใจมากที่สุด</p>
          </div>
          <a class="section-link" onclick="navigateTo('/ranking')">ดูทั้งหมด →</a>
        </div>
        <div class="grid grid-auto-fill stagger-children">
          ${trendingSubjects.slice(0, 4).map(s => renderSubjectCard(s)).join('')}
        </div>
      </section>

      <!-- 🏆 Top วิชาน่าลง -->
      <section class="container section">
        <div class="section-header">
          <div>
            <h2 class="section-title">🏆 Top วิชาน่าลง</h2>
            <p class="section-subtitle">คำนวณจากคะแนนรีวิว ความน่าสนใจ และจำนวนรีวิว</p>
          </div>
          <a class="section-link" onclick="navigateTo('/ranking')">ดูทั้งหมด →</a>
        </div>
        ${topRankings.length >= 3 ? renderRankingPodium(topRankings) : ''}
        ${renderRankingList(topRankings, 3)}
      </section>

      <!-- 😎 วิชาชิลที่สุด -->
      ${chillRankings.length > 0 ? `
      <section class="container section">
        <div class="section-header">
          <div>
            <h2 class="section-title">😎 วิชาชิลที่สุด</h2>
            <p class="section-subtitle">งานน้อย เรียนสบาย เกรดดี</p>
          </div>
        </div>
        <div class="grid grid-auto-fill stagger-children">
          ${chillRankings.map(s => renderSubjectCard(s)).join('')}
        </div>
      </section>
      ` : ''}

      <!-- 👨‍🏫 อาจารย์สอนดีที่สุด -->
      ${teacherRankings.length > 0 ? `
      <section class="container section">
        <div class="section-header">
          <div>
            <h2 class="section-title">👨‍🏫 วิชาที่อาจารย์สอนดีที่สุด</h2>
            <p class="section-subtitle">จากคะแนนด้านการสอนของนักศึกษา</p>
          </div>
        </div>
        <div class="grid grid-auto-fill stagger-children">
          ${teacherRankings.map(s => renderSubjectCard(s)).join('')}
        </div>
      </section>
      ` : ''}

      <!-- ✅ ผ่านง่าย -->
      ${easyRankings.length > 0 ? `
      <section class="container section">
        <div class="section-header">
          <div>
            <h2 class="section-title">✅ วิชาที่ผ่านง่าย</h2>
            <p class="section-subtitle">เหมาะกับคนอยากเก็บเกรดอย่างสบายใจ</p>
          </div>
        </div>
        <div class="grid grid-auto-fill stagger-children">
          ${easyRankings.map(s => renderSubjectCard(s)).join('')}
        </div>
      </section>
      ` : ''}

      <!-- ⚠️ วิชาที่ควรเลี่ยง -->
      ${avoidRankings.length > 0 ? `
      <section class="container section">
        <div class="section-header">
          <div>
            <h2 class="section-title">⚠️ วิชาที่ควรเลี่ยง</h2>
            <p class="section-subtitle">คะแนนต่ำ งานหนัก สอบยาก — ลงด้วยความระมัดระวัง</p>
          </div>
        </div>
        <div class="grid grid-auto-fill stagger-children">
          ${avoidRankings.map(s => renderSubjectCard(s)).join('')}
        </div>
      </section>
      ` : ''}
      `}

      <!-- Footer -->
      ${renderFooter()}
    </div>
  `;

  initHeroSearch();
  initHeroStats();
  updateActiveNav('home');
}

function applyFilter(filterId) {
  // Update active chip
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector(`.filter-chip[data-filter="${filterId}"]`)?.classList.add('active');

  if (filterId === 'all') {
    clearFilter();
    return;
  }

  const filtered = filterSubjectsByTag(subjects, filterId);
  const filterLabel = filterOptions.find(f => f.id === filterId)?.label || filterId;

  document.getElementById('filtered-results').style.display = 'block';
  document.getElementById('home-sections').style.display = 'none';
  document.getElementById('filtered-title').textContent = `📋 ${filterLabel}`;
  document.getElementById('filtered-count').textContent = `พบ ${filtered.length} วิชา`;
  document.getElementById('filtered-grid').innerHTML = filtered.map(s => renderSubjectCard(s)).join('') 
    || '<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-title">ไม่พบวิชา</div></div>';
}

function clearFilter() {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.filter-chip[data-filter="all"]')?.classList.add('active');
  document.getElementById('filtered-results').style.display = 'none';
  document.getElementById('home-sections').style.display = 'block';
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-4)">
          <div>
            <span style="font-weight:700">🎓 <span class="text-gradient">ClassMuse</span></span>
            <span style="margin-left:var(--space-3);color:var(--color-text-tertiary)">© 2026</span>
          </div>
          <div style="display:flex;gap:var(--space-4);font-size:var(--text-sm)">
            <a onclick="navigateTo('/')" style="cursor:pointer;color:var(--color-text-tertiary)">หน้าแรก</a>
            <a onclick="navigateTo('/ranking')" style="cursor:pointer;color:var(--color-text-tertiary)">อันดับ</a>
            <a onclick="navigateTo('/write-review')" style="cursor:pointer;color:var(--color-text-tertiary)">เขียนรีวิว</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
