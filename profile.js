// ============================================
// ClassMuse — Profile Page
// ============================================

function renderProfilePage() {
  const userReviews = reviews.filter(r => !r.anonymous).slice(0, 5);
  const badges = [
    { icon: '🏆', name: 'Top Reviewer', desc: 'เขียนรีวิว 10 รีวิวขึ้นไป', earned: true },
    { icon: '😎', name: 'นักรีวิวสายชิล', desc: 'รีวิววิชาชิล 5 วิชา', earned: true },
    { icon: '🌟', name: 'Contributor', desc: 'เขียนรีวิวแรก', earned: true },
    { icon: '👍', name: 'Helpful', desc: 'ได้รับ 50 มีประโยชน์', earned: false },
    { icon: '📝', name: 'นักรีวิวตัวยง', desc: 'เขียนรีวิว 25 รีวิว', earned: false },
    { icon: '🎓', name: 'Master Reviewer', desc: 'เขียนรีวิว 50 รีวิว', earned: false },
    { icon: '🔥', name: 'Trending', desc: 'รีวิวเข้า trending', earned: false },
    { icon: '💎', name: 'Premium', desc: 'รีวิวคุณภาพสูงสุด', earned: false }
  ];

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="container page-enter" style="padding-top:var(--space-10)">
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="profile-avatar">👤</div>
        <div>
          <h1 style="font-size:var(--text-2xl);font-weight:800">นักรีวิวสายเก่ง</h1>
          <p style="color:var(--color-text-tertiary);font-size:var(--text-sm)">สมาชิกตั้งแต่ 2025</p>
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="profile-stat-value">${userReviews.length}</div>
              <div class="profile-stat-label">รีวิว</div>
            </div>
            <div class="profile-stat">
              <div class="profile-stat-value">${userReviews.reduce((sum, r) => sum + r.helpful, 0)}</div>
              <div class="profile-stat-label">มีประโยชน์</div>
            </div>
            <div class="profile-stat">
              <div class="profile-stat-value">3</div>
              <div class="profile-stat-label">Badges</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gamification Badges -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🏅 Badges</h2>
        </div>
        <div class="badge-grid stagger-children">
          ${badges.map(b => `
            <div class="badge-card ${b.earned ? 'earned' : 'locked'}">
              <div class="badge-card-icon">${b.icon}</div>
              <div>
                <div class="badge-card-name">${b.name}</div>
                <div class="badge-card-desc">${b.desc}</div>
              </div>
              ${b.earned ? '<span class="badge badge-success" style="margin-left:auto">✓ ได้รับ</span>' : '<span class="badge" style="margin-left:auto;opacity:0.5">🔒</span>'}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- My Reviews -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">💬 รีวิวของฉัน</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          ${userReviews.map(r => renderReviewCard(r, true)).join('')}
        </div>
      </section>

      <!-- Saved Reviews -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🔖 รีวิวที่บันทึก</h2>
        </div>
        <div class="empty-state">
          <div class="empty-state-icon">🔖</div>
          <div class="empty-state-title">ยังไม่มีรีวิวที่บันทึก</div>
          <div class="empty-state-desc">กด 🔖 ที่รีวิวเพื่อบันทึกไว้ดูทีหลัง</div>
        </div>
      </section>
    </div>
    ${renderFooter()}
  `;

  updateActiveNav('profile');
  scrollToTop();
}
