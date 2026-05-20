// ============================================
// ClassMuse — Ranking Page
// ============================================

let currentRankingCategory = 'top';

function renderRankingPage() {
  const categories = [
    { id: 'top', label: '🏆 วิชาน่าลง', desc: 'คำนวณจาก Overall, Teaching, Interest, Workload' },
    { id: 'chill', label: '😎 ชิลที่สุด', desc: 'งานน้อย เกรดดี เรียนสบาย' },
    { id: 'best-teacher', label: '👨‍🏫 อาจารย์สอนดี', desc: 'จากคะแนนด้านการสอน' },
    { id: 'easy-pass', label: '✅ ผ่านง่าย', desc: 'เกรดดี ไม่ยาก สบายใจ' },
    { id: 'avoid', label: '⚠️ ควรเลี่ยง', desc: 'คะแนนต่ำ งานหนัก สอบยาก' }
  ];

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="container page-enter" style="padding-top:var(--space-10)">
      <div style="margin-bottom:var(--space-8)">
        <h1 style="font-size:var(--text-4xl);font-weight:900">🏆 อันดับวิชาเรียน</h1>
        <p style="color:var(--color-text-secondary);margin-top:var(--space-2)">
          จัดอันดับจากคะแนนรีวิวจริงของนักศึกษา คำนวณด้วยสูตร Weighted Score
        </p>
        <div class="glass-card glass-card-sm" style="margin-top:var(--space-4);padding:var(--space-3) var(--space-4);display:inline-block">
          <code style="font-size:var(--text-xs);color:var(--color-text-tertiary)">
            Score = (Overall×0.4) + (Teaching×0.25) + (Interest×0.2) + ((6-Workload)×0.15) × log(Reviews+1)
          </code>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="ranking-category-tabs" id="ranking-tabs">
        ${categories.map(c => `
          <button class="ranking-category-tab ${c.id === currentRankingCategory ? 'active' : ''}" 
            onclick="switchRankingCategory('${c.id}')" data-cat="${c.id}">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Rankings Content -->
      <div id="ranking-content">
        ${renderRankingContent(currentRankingCategory)}
      </div>
    </div>
    ${renderFooter()}
  `;

  updateActiveNav('ranking');
  scrollToTop();
}

function switchRankingCategory(catId) {
  currentRankingCategory = catId;
  document.querySelectorAll('.ranking-category-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.ranking-category-tab[data-cat="${catId}"]`)?.classList.add('active');
  document.getElementById('ranking-content').innerHTML = renderRankingContent(catId);
}

function renderRankingContent(category) {
  const rankings = getRankings(category);
  
  if (rankings.length === 0) {
    return `<div class="empty-state" style="padding:var(--space-16)">
      <div class="empty-state-icon">🏆</div>
      <div class="empty-state-title">ยังไม่มีรีวิวเพียงพอ</div>
      <div class="empty-state-desc" style="margin-bottom:var(--space-4)">เขียนรีวิวเพื่อให้วิชาติดอันดับ!</div>
      <button class="btn btn-primary" onclick="navigateTo('/write-review')">✍️ เขียนรีวิว</button>
    </div>`;
  }

  return `
    <div style="margin-top:var(--space-6)">
      ${rankings.length >= 3 ? renderRankingPodium(rankings) : ''}
      ${renderRankingList(rankings, rankings.length >= 3 ? 3 : 0)}
    </div>
  `;
}
