// ============================================
// ClassMuse — Subject Detail Page
// ============================================

function renderSubjectDetail(subjectId) {
  const subject = getSubjectById(subjectId);
  if (!subject) {
    document.getElementById('main-content').innerHTML = `
      <div class="container" style="padding:var(--space-24) 0;text-align:center">
        <div style="font-size:64px;margin-bottom:var(--space-4)">😵</div>
        <h2>ไม่พบวิชานี้</h2>
        <p style="margin-bottom:var(--space-6)">วิชาที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
        <button class="btn btn-primary" onclick="navigateTo('/')">กลับหน้าแรก</button>
      </div>`;
    return;
  }

  const avg = getAverageRatings(subjectId);
  const subjectReviews = getReviewsBySubject(subjectId);
  const warningsHtml = subject.warnings.map(w => `<span class="warning-badge">${w}</span>`).join(' ');
  
  // Calculate dashboard stats
  const easyPassPercent = subjectReviews.length > 0 
    ? Math.round(subjectReviews.filter(r => r.overall >= 4).length / subjectReviews.length * 100) : 0;
  const hardWorkPercent = subjectReviews.length > 0
    ? Math.round(subjectReviews.filter(r => r.workload >= 4).length / subjectReviews.length * 100) : 0;

  // AI Insight (mock)
  const aiInsight = generateAIInsight(subject, avg, subjectReviews);

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="container page-enter">
      <!-- Breadcrumb -->
      <div class="subject-detail-header">
        <div class="subject-detail-breadcrumb">
          <a onclick="navigateTo('/')">🏠 หน้าแรก</a>
          <span>›</span>
          <span>${subject.code} ${subject.name}</span>
        </div>
        <div class="subject-detail-title-row">
          <div>
            <div class="subject-detail-code">${subject.code}</div>
            <h1 class="subject-detail-name">${subject.name}</h1>
            <div class="subject-detail-meta">
              <span class="subject-detail-meta-item">👨‍🏫 ${subject.instructor}</span>
              <span class="subject-detail-meta-item">📖 ${subject.credits} หน่วยกิต</span>
              <span class="subject-detail-meta-item">💬 ${avg.count} รีวิว</span>
              <span class="subject-detail-meta-item">🏷️ ${subject.category === 'gened' ? 'GenEd' : 'วิชาคณะ'}</span>
            </div>
            ${warningsHtml ? `<div style="margin-top:var(--space-3)">${warningsHtml}</div>` : ''}
          </div>
          <div style="text-align:right">
            <div style="font-size:var(--text-5xl);font-weight:900;color:var(--color-accent)">${avg.overall || '-'}</div>
            <div>${renderStars(avg.overall, 20)}</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-tertiary);margin-top:var(--space-1)">${avg.count} รีวิว</div>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards stagger-children">
        <div class="summary-card">
          <div class="summary-card-icon">⭐</div>
          <div class="summary-card-value" style="color:${getRatingColor(avg.overall)}">${avg.overall || '-'}</div>
          <div class="summary-card-label">คะแนนรวม</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">📋</div>
          <div class="summary-card-value" style="color:${avg.workload >= 4 ? '#EF4444' : avg.workload >= 3 ? '#F59E0B' : '#10B981'}">${avg.workload || '-'}</div>
          <div class="summary-card-label">จำนวนงาน</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">💡</div>
          <div class="summary-card-value" style="color:${getRatingColor(avg.interest)}">${avg.interest || '-'}</div>
          <div class="summary-card-label">ความน่าสนใจ</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">👨‍🏫</div>
          <div class="summary-card-value" style="color:${getRatingColor(avg.teaching)}">${avg.teaching || '-'}</div>
          <div class="summary-card-label">การสอนของอาจารย์</div>
        </div>
      </div>

      <!-- Dashboard -->
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="dashboard-card-title">📊 สถิติภาพรวม</div>
          <div class="dashboard-bar-group">
            <div class="dashboard-bar-item">
              <span class="dashboard-bar-label">ผ่านง่าย</span>
              <div class="progress-bar" style="flex:1"><div class="progress-bar-fill success" style="width:${easyPassPercent}%"></div></div>
              <span class="dashboard-bar-value">${easyPassPercent}%</span>
            </div>
            <div class="dashboard-bar-item">
              <span class="dashboard-bar-label">งานหนัก</span>
              <div class="progress-bar" style="flex:1"><div class="progress-bar-fill danger" style="width:${hardWorkPercent}%"></div></div>
              <span class="dashboard-bar-value">${hardWorkPercent}%</span>
            </div>
            <div class="dashboard-bar-item">
              <span class="dashboard-bar-label">เวลาเรียน/สัปดาห์</span>
              <div class="progress-bar" style="flex:1"><div class="progress-bar-fill" style="width:${Math.min(100, subject.weeklyHours * 8)}%;background:var(--color-primary-light)"></div></div>
              <span class="dashboard-bar-value">${subject.weeklyHours} ชม.</span>
            </div>
          </div>
        </div>
        <div class="dashboard-card">
          <div class="dashboard-card-title">📝 ข้อมูลวิชา</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-3)">
            <div style="display:flex;justify-content:space-between;padding:var(--space-2) 0;border-bottom:1px solid var(--color-border)">
              <span style="color:var(--color-text-tertiary);font-size:var(--text-sm)">รูปแบบการเรียน</span>
              <span style="font-size:var(--text-sm);font-weight:500">${subject.studyFormat}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:var(--space-2) 0;border-bottom:1px solid var(--color-border)">
              <span style="color:var(--color-text-tertiary);font-size:var(--text-sm)">รูปแบบการสอบ</span>
              <span style="font-size:var(--text-sm);font-weight:500">${subject.examFormat}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:var(--space-2) 0;border-bottom:1px solid var(--color-border)">
              <span style="color:var(--color-text-tertiary);font-size:var(--text-sm)">ภาควิชา</span>
              <span style="font-size:var(--text-sm);font-weight:500">${subject.department}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:var(--space-2) 0">
              <span style="color:var(--color-text-tertiary);font-size:var(--text-sm)">เทอม</span>
              <span style="font-size:var(--text-sm);font-weight:500">${subject.semester}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Insight -->
      <div class="ai-insight">
        <div class="ai-insight-header">🤖 Quick Insight (AI Summary)</div>
        <div class="ai-insight-text">${aiInsight}</div>
      </div>

      <!-- Tabs -->
      <div class="tabs" id="subject-tabs">
        <div class="tab active" onclick="switchSubjectTab('reviews')" data-tab="reviews">💬 รีวิวทั้งหมด (${avg.count})</div>
        <div class="tab" onclick="switchSubjectTab('ai')" data-tab="ai">🤖 สรุป AI</div>
        <div class="tab" onclick="switchSubjectTab('qa')" data-tab="qa">❓ Q&A</div>
        <div class="tab" onclick="switchSubjectTab('info')" data-tab="info">📋 ข้อมูลก่อนลงทะเบียน</div>
      </div>

      <!-- Tab Content -->
      <div id="tab-content" class="tab-content">
        ${renderReviewsTab(subjectReviews)}
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;gap:var(--space-3);margin:var(--space-8) 0">
        <button class="btn btn-primary" onclick="navigateTo('/write-review?subject=${subjectId}')">✍️ เขียนรีวิววิชานี้</button>
        <button class="btn btn-secondary" onclick="navigateTo('/compare?s1=${subjectId}')">⚖️ เปรียบเทียบ</button>
      </div>
    </div>
    ${renderFooter()}
  `;

  updateActiveNav('');
  scrollToTop();
}

function renderReviewsTab(subjectReviews) {
  if (subjectReviews.length === 0) {
    return '<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">ยังไม่มีรีวิว</div><div class="empty-state-desc">เป็นคนแรกที่รีวิววิชานี้!</div></div>';
  }
  return `
    <div style="display:flex;flex-direction:column;gap:var(--space-4)">
      ${subjectReviews.map(r => renderReviewCard(r)).join('')}
    </div>
  `;
}

function switchSubjectTab(tabName) {
  document.querySelectorAll('#subject-tabs .tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`#subject-tabs .tab[data-tab="${tabName}"]`)?.classList.add('active');

  const content = document.getElementById('tab-content');
  const currentPath = window.location.hash.replace('#', '');
  const subjectId = currentPath.split('/')[2];
  const subjectReviews = getReviewsBySubject(subjectId);
  const subject = getSubjectById(subjectId);
  const avg = getAverageRatings(subjectId);

  switch (tabName) {
    case 'reviews':
      content.innerHTML = renderReviewsTab(subjectReviews);
      break;
    case 'ai':
      content.innerHTML = `
        <div class="ai-insight" style="border:none;background:var(--glass-bg)">
          <div class="ai-insight-header">🤖 สรุปจาก AI</div>
          <div class="ai-insight-text" style="margin-bottom:var(--space-4)">${generateAIInsight(subject, avg, subjectReviews)}</div>
          <div class="divider"></div>
          <h4 style="margin-bottom:var(--space-3);font-size:var(--text-base)">📊 สรุปคะแนน</h4>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3)">
            <div class="glass-card glass-card-sm" style="text-align:center">
              <div style="font-size:var(--text-2xl);font-weight:800;color:var(--color-accent)">${avg.overall}/5</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">ความพึงพอใจ</div>
            </div>
            <div class="glass-card glass-card-sm" style="text-align:center">
              <div style="font-size:var(--text-2xl);font-weight:800;color:${avg.workload >= 4 ? '#EF4444' : '#10B981'}">${getWorkloadLabel(avg.workload)}</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">ภาระงาน</div>
            </div>
          </div>
        </div>`;
      break;
    case 'qa':
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">❓</div>
          <div class="empty-state-title">Q&A</div>
          <div class="empty-state-desc">ฟีเจอร์ถาม-ตอบจะมาเร็วๆ นี้! คุณจะสามารถถามคำถามเกี่ยวกับวิชานี้ได้</div>
        </div>`;
      break;
    case 'info':
      content.innerHTML = `
        <div class="glass-card">
          <h3 style="margin-bottom:var(--space-4)">📋 ข้อมูลก่อนลงทะเบียน</h3>
          <div style="display:flex;flex-direction:column;gap:var(--space-4)">
            <div><span style="font-weight:600">📝 คำอธิบายวิชา:</span><p style="margin-top:var(--space-2)">${subject.description}</p></div>
            <div class="divider"></div>
            <div><span style="font-weight:600">🏫 รูปแบบการเรียน:</span> ${subject.studyFormat}</div>
            <div><span style="font-weight:600">📋 รูปแบบการสอบ:</span> ${subject.examFormat}</div>
            <div><span style="font-weight:600">⏰ เวลาเรียนต่อสัปดาห์:</span> ประมาณ ${subject.weeklyHours} ชั่วโมง</div>
            <div><span style="font-weight:600">📖 หน่วยกิต:</span> ${subject.credits}</div>
            <div><span style="font-weight:600">📅 เทอมที่เปิดสอน:</span> ${subject.semester}</div>
            ${subject.warnings.length > 0 ? `<div class="divider"></div><div><span style="font-weight:600">⚠️ คำเตือน:</span><div style="margin-top:var(--space-2)">${subject.warnings.map(w => `<span class="warning-badge" style="margin-right:var(--space-2)">${w}</span>`).join('')}</div></div>` : ''}
          </div>
        </div>`;
      break;
  }
}

function generateAIInsight(subject, avg, subjectReviews) {
  if (!subject || subjectReviews.length === 0) return 'ยังไม่มีข้อมูลเพียงพอสำหรับการสรุป';
  
  const insights = [];
  
  if (avg.overall >= 4.5) insights.push(`${subject.name} เป็นวิชาที่ได้รับคะแนนรีวิวสูงมาก (${avg.overall}/5) จากนักศึกษา ${avg.count} คน`);
  else if (avg.overall >= 3.5) insights.push(`${subject.name} ได้รับคะแนนรีวิวดี (${avg.overall}/5) จากนักศึกษา ${avg.count} คน`);
  else insights.push(`${subject.name} ได้รับคะแนนรีวิวปานกลาง (${avg.overall}/5) จากนักศึกษา ${avg.count} คน`);

  if (avg.workload <= 2) insights.push('ภาระงานน้อย เหมาะกับคนที่ต้องการวิชาเบาๆ');
  else if (avg.workload >= 4) insights.push('ภาระงานค่อนข้างหนัก ควรเตรียมตัวให้พร้อม');

  if (avg.teaching >= 4.5) insights.push('อาจารย์ได้รับคำชมเรื่องการสอนเป็นอย่างมาก');
  
  if (subject.tags.includes('#ผ่านง่าย')) insights.push('นักศึกษาส่วนใหญ่ให้ความเห็นว่าผ่านง่าย');
  if (subject.tags.includes('#สอบโหด')) insights.push('ควรเตรียมตัวสอบอย่างจริงจัง');

  return insights.join(' ') || `วิชา ${subject.name} สอนโดย ${subject.instructor}`;
}
