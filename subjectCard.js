// ============================================
// ClassMuse — Subject Card Component
// ============================================

function renderSubjectCard(subject) {
  const avg = getAverageRatings(subject.id);
  const tagsHtml = subject.tags.slice(0, 3).map(tag =>
    `<span class="tag" style="border-color:${getTagColor(tag)}30;color:${getTagColor(tag)}">${getTagEmoji(tag)} ${tag}</span>`
  ).join('');
  const warningsHtml = subject.warnings.map(w =>
    `<span class="warning-badge">${w}</span>`
  ).join('');

  return `
    <div class="subject-card hover-lift" onclick="navigateTo('/subject/${subject.id}')" id="subject-card-${subject.id}">
      <div class="subject-card-header">
        <span class="subject-card-code">${subject.code}</span>
        <span class="badge badge-${subject.category === 'gened' ? 'primary' : 'secondary'}">${subject.category === 'gened' ? 'GenEd' : 'วิชาคณะ'}</span>
      </div>
      <div class="subject-card-name">${subject.name}</div>
      <div class="subject-card-instructor">👨‍🏫 ${subject.instructor}</div>
      <div class="subject-card-tags">${tagsHtml}${warningsHtml}</div>
      <div class="subject-card-footer">
        <div class="subject-card-rating">
          ${renderStars(avg.overall)}
          <span class="rating-value">${avg.overall || '-'}</span>
        </div>
        <div class="subject-card-meta">
          <span>💬 ${avg.count}</span>
          <span>📖 ${subject.credits} หน่วยกิต</span>
        </div>
      </div>
    </div>
  `;
}

function renderSubjectCardCompact(subject) {
  const avg = getAverageRatings(subject.id);
  return `
    <div class="subject-card hover-lift glass-card-sm" onclick="navigateTo('/subject/${subject.id}')" style="padding:var(--space-4)">
      <div style="display:flex;align-items:center;gap:var(--space-3)">
        <div style="width:48px;height:48px;background:var(--gradient-primary);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">📘</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--text-xs);color:var(--color-primary-light);font-weight:600">${subject.code}</div>
          <div style="font-weight:700;font-size:var(--text-sm);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${subject.name}</div>
          <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">${subject.instructor}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:var(--text-xl);font-weight:800;color:var(--color-accent)">${avg.overall || '-'}</div>
          <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">${avg.count} รีวิว</div>
        </div>
      </div>
    </div>
  `;
}
