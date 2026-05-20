// ============================================
// ClassMuse — Ranking Card Component
// ============================================

function renderRankingPodium(rankings) {
  if (rankings.length < 3) return '';
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['silver', 'gold', 'bronze'];
  const order = [1, 0, 2]; // silver, gold, bronze positioning

  return `
    <div class="ranking-top-3">
      ${order.map(i => {
        const s = rankings[i];
        if (!s) return '<div></div>';
        return `
          <div class="ranking-podium ${classes[i]} hover-lift" onclick="navigateTo('/subject/${s.id}')">
            <div class="ranking-medal">${medals[i]}</div>
            <div class="subject-card-code">${s.code}</div>
            <div class="subject-card-name">${s.name}</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">${s.instructor}</div>
            <div class="ranking-score text-gradient">${s.score}</div>
            <div class="ranking-score-label">คะแนนรวม</div>
            <div style="margin-top:var(--space-3)">
              ${renderStars(s.avg.overall, 14)}
            </div>
            <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-top:var(--space-1)">${s.avg.count} รีวิว</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderRankingList(rankings, startIndex = 3) {
  return `
    <div class="ranking-list">
      ${rankings.slice(startIndex).map((s, i) => `
        <div class="ranking-list-item" onclick="navigateTo('/subject/${s.id}')">
          <div class="ranking-position">${startIndex + i + 1}</div>
          <div style="width:40px;height:40px;background:var(--gradient-primary);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">📘</div>
          <div class="ranking-list-info">
            <div class="ranking-list-name">${s.name}</div>
            <div class="ranking-list-code">${s.code} · ${s.instructor} · ${s.avg.count} รีวิว</div>
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-2)">
            ${renderStars(s.avg.overall, 12)}
          </div>
          <div class="ranking-list-score">${s.score}</div>
        </div>
      `).join('')}
    </div>
  `;
}
