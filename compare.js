// ============================================
// ClassMuse — Compare Page
// ============================================

let compareSubject1 = null;
let compareSubject2 = null;

function renderComparePage() {
  // Check URL params
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
  if (params.get('s1')) compareSubject1 = params.get('s1');
  if (params.get('s2')) compareSubject2 = params.get('s2');

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="container page-enter" style="padding-top:var(--space-10)">
      <div style="margin-bottom:var(--space-8)">
        <h1 style="font-size:var(--text-4xl);font-weight:900">⚖️ เปรียบเทียบวิชา</h1>
        <p style="color:var(--color-text-secondary);margin-top:var(--space-2)">เลือก 2 วิชาเพื่อเปรียบเทียบข้อมูลแบบ side-by-side</p>
      </div>

      <!-- Subject Selection -->
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:var(--space-4);align-items:center;margin-bottom:var(--space-8)">
        <div>
          <label class="form-label">วิชาที่ 1</label>
          <select class="form-input form-select" id="compare-select-1" onchange="updateCompare()">
            <option value="">-- เลือกวิชา --</option>
            ${subjects.map(s => `<option value="${s.id}" ${compareSubject1 === s.id ? 'selected' : ''}>${s.code} ${s.name}</option>`).join('')}
          </select>
        </div>
        <div class="compare-vs" style="margin-top:24px">VS</div>
        <div>
          <label class="form-label">วิชาที่ 2</label>
          <select class="form-input form-select" id="compare-select-2" onchange="updateCompare()">
            <option value="">-- เลือกวิชา --</option>
            ${subjects.map(s => `<option value="${s.id}" ${compareSubject2 === s.id ? 'selected' : ''}>${s.code} ${s.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Comparison Results -->
      <div id="compare-results">
        ${compareSubject1 && compareSubject2 ? renderCompareResults() : renderCompareEmpty()}
      </div>
    </div>
    ${renderFooter()}
  `;

  updateActiveNav('compare');
  scrollToTop();
}

function updateCompare() {
  compareSubject1 = document.getElementById('compare-select-1').value || null;
  compareSubject2 = document.getElementById('compare-select-2').value || null;
  const results = document.getElementById('compare-results');
  results.innerHTML = compareSubject1 && compareSubject2 ? renderCompareResults() : renderCompareEmpty();
}

function renderCompareEmpty() {
  return `
    <div class="empty-state" style="padding:var(--space-16)">
      <div class="empty-state-icon">⚖️</div>
      <div class="empty-state-title">เลือก 2 วิชาเพื่อเปรียบเทียบ</div>
      <div class="empty-state-desc">ระบบจะแสดงข้อมูลเปรียบเทียบแบบ side-by-side ให้คุณ</div>
    </div>
  `;
}

function renderCompareResults() {
  const s1 = getSubjectById(compareSubject1);
  const s2 = getSubjectById(compareSubject2);
  if (!s1 || !s2) return renderCompareEmpty();
  
  const avg1 = getAverageRatings(s1.id);
  const avg2 = getAverageRatings(s2.id);
  const score1 = calculateSubjectScore(s1.id);
  const score2 = calculateSubjectScore(s2.id);

  const metrics = [
    { label: 'คะแนนรวม', v1: avg1.overall, v2: avg2.overall, max: 5, icon: '⭐' },
    { label: 'การสอน', v1: avg1.teaching, v2: avg2.teaching, max: 5, icon: '👨‍🏫' },
    { label: 'ความน่าสนใจ', v1: avg1.interest, v2: avg2.interest, max: 5, icon: '💡' },
    { label: 'จำนวนงาน', v1: avg1.workload, v2: avg2.workload, max: 5, icon: '📋', inverse: true },
    { label: 'เวลาเรียน/สัปดาห์', v1: s1.weeklyHours, v2: s2.weeklyHours, max: 12, icon: '⏰', inverse: true },
    { label: 'จำนวนรีวิว', v1: avg1.count, v2: avg2.count, max: Math.max(avg1.count, avg2.count, 1), icon: '💬' },
  ];

  return `
    <div class="compare-container" style="grid-template-columns:1fr 1fr">
      <!-- Subject 1 Card -->
      <div class="compare-card">
        <div style="text-align:center;margin-bottom:var(--space-6)">
          <div style="font-size:var(--text-xs);color:var(--color-primary-light);font-weight:600">${s1.code}</div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-2)">${s1.name}</h3>
          <div style="font-size:var(--text-sm);color:var(--color-text-tertiary)">${s1.instructor}</div>
          <div style="margin-top:var(--space-3);font-size:var(--text-4xl);font-weight:900;color:var(--color-accent)">${avg1.overall}</div>
          <div>${renderStars(avg1.overall)}</div>
        </div>
      </div>

      <!-- Subject 2 Card -->
      <div class="compare-card">
        <div style="text-align:center;margin-bottom:var(--space-6)">
          <div style="font-size:var(--text-xs);color:var(--color-secondary-light);font-weight:600">${s2.code}</div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-2)">${s2.name}</h3>
          <div style="font-size:var(--text-sm);color:var(--color-text-tertiary)">${s2.instructor}</div>
          <div style="margin-top:var(--space-3);font-size:var(--text-4xl);font-weight:900;color:var(--color-accent)">${avg2.overall}</div>
          <div>${renderStars(avg2.overall)}</div>
        </div>
      </div>
    </div>

    <!-- Comparison Bars -->
    <div class="glass-card" style="margin-top:var(--space-6)">
      <h3 style="margin-bottom:var(--space-6)">📊 เปรียบเทียบรายด้าน</h3>
      ${metrics.map(m => {
        const p1 = (m.v1 / m.max * 100) || 0;
        const p2 = (m.v2 / m.max * 100) || 0;
        const better1 = m.inverse ? m.v1 < m.v2 : m.v1 > m.v2;
        const better2 = m.inverse ? m.v2 < m.v1 : m.v2 > m.v1;
        return `
          <div style="margin-bottom:var(--space-5)">
            <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-2)">
              <span style="font-weight:${better1 ? '700' : '400'};color:${better1 ? 'var(--color-primary-light)' : 'var(--color-text-secondary)'}">
                ${m.v1}${m.max === 5 ? '/5' : m.label.includes('เวลา') ? ' ชม.' : ''}
              </span>
              <span style="font-size:var(--text-sm);color:var(--color-text-tertiary)">${m.icon} ${m.label}</span>
              <span style="font-weight:${better2 ? '700' : '400'};color:${better2 ? 'var(--color-secondary-light)' : 'var(--color-text-secondary)'}">
                ${m.v2}${m.max === 5 ? '/5' : m.label.includes('เวลา') ? ' ชม.' : ''}
              </span>
            </div>
            <div style="display:flex;gap:4px">
              <div style="flex:1;height:10px;background:var(--glass-bg);border-radius:var(--radius-full);overflow:hidden;direction:rtl">
                <div style="width:${p1}%;height:100%;background:var(--color-primary);border-radius:var(--radius-full);transition:width 1s ease"></div>
              </div>
              <div style="flex:1;height:10px;background:var(--glass-bg);border-radius:var(--radius-full);overflow:hidden">
                <div style="width:${p2}%;height:100%;background:var(--color-secondary);border-radius:var(--radius-full);transition:width 1s ease"></div>
              </div>
            </div>
          </div>
        `;
      }).join('')}

      <div class="divider"></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="text-align:center;flex:1">
          <div style="font-size:var(--text-2xl);font-weight:900;background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${score1}</div>
          <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">Final Score</div>
        </div>
        <div style="font-size:var(--text-xl);font-weight:700;color:var(--color-accent)">🏆</div>
        <div style="text-align:center;flex:1">
          <div style="font-size:var(--text-2xl);font-weight:900;background:linear-gradient(135deg,var(--color-secondary),var(--color-secondary-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${score2}</div>
          <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">Final Score</div>
        </div>
      </div>
    </div>

    <!-- Winner -->
    ${score1 !== score2 ? `
    <div class="glass-card" style="margin-top:var(--space-4);text-align:center;border-color:var(--color-accent);background:var(--color-accent-bg)">
      <div style="font-size:32px;margin-bottom:var(--space-2)">🏆</div>
      <div style="font-weight:700;font-size:var(--text-lg)">${score1 > score2 ? s1.name : s2.name}</div>
      <div style="font-size:var(--text-sm);color:var(--color-text-secondary)">ได้คะแนนรวมสูงกว่า</div>
    </div>
    ` : ''}
  `;
}
