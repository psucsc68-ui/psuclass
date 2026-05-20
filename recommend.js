// ============================================
// ClassMuse — Recommendation Page
// ============================================

let quizStep = 0;
let quizAnswers = { chillLevel: 50, workloadTolerance: 3, timeAvailable: 3 };

const quizQuestions = [
  {
    question: '😎 คุณอยากได้วิชาชิลแค่ไหน?',
    type: 'options',
    key: 'chillLevel',
    options: [
      { emoji: '🏖️', text: 'ชิลสุดๆ งานน้อยที่สุด', value: 90 },
      { emoji: '😌', text: 'ค่อนข้างชิล แต่ได้ความรู้ด้วย', value: 70 },
      { emoji: '📚', text: 'เน้นเนื้อหามากกว่าวิชาชิล', value: 40 },
      { emoji: '💪', text: 'ไม่สนชิล เอาความรู้เต็มที่!', value: 10 }
    ]
  },
  {
    question: '📋 คุณรับงานได้มากแค่ไหน?',
    type: 'options',
    key: 'workloadTolerance',
    options: [
      { emoji: '🌱', text: 'แทบไม่มีเลย', value: 1 },
      { emoji: '📄', text: 'น้อยๆ พอรับได้', value: 2 },
      { emoji: '📑', text: 'ปานกลาง', value: 3 },
      { emoji: '📚', text: 'เยอะก็ OK', value: 4 },
      { emoji: '🏋️', text: 'เยอะแค่ไหนก็ไหว!', value: 5 }
    ]
  },
  {
    question: '⏰ คุณมีเวลาว่างเรียนต่อสัปดาห์มากแค่ไหน?',
    type: 'options',
    key: 'timeAvailable',
    options: [
      { emoji: '🕐', text: 'น้อยมาก (1-3 ชม.)', value: 1 },
      { emoji: '🕑', text: 'พอมี (4-6 ชม.)', value: 2 },
      { emoji: '🕒', text: 'ปานกลาง (7-9 ชม.)', value: 3 },
      { emoji: '🕓', text: 'ค่อนข้างเยอะ (10-15 ชม.)', value: 4 },
      { emoji: '🕔', text: 'เยอะมาก (15+ ชม.)', value: 5 }
    ]
  }
];

function renderRecommendPage() {
  quizStep = 0;
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="quiz-container page-enter">
      <div style="font-size:64px;margin-bottom:var(--space-4)">🎯</div>
      <h1 style="font-size:var(--text-3xl);font-weight:900;margin-bottom:var(--space-3)">ระบบแนะนำวิชา</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:var(--space-8)">ตอบคำถาม 3 ข้อ แล้วเราจะแนะนำวิชาที่เหมาะกับคุณ</p>
      <button class="btn btn-primary btn-lg" onclick="startQuiz()">เริ่มเลย! 🚀</button>
    </div>
    ${renderFooter()}
  `;
  updateActiveNav('recommend');
  scrollToTop();
}

function startQuiz() {
  quizStep = 1;
  renderQuizStep();
}

function renderQuizStep() {
  if (quizStep > quizQuestions.length) {
    showQuizResults();
    return;
  }

  const q = quizQuestions[quizStep - 1];
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="quiz-container page-enter">
      <!-- Progress -->
      <div class="quiz-progress">
        ${quizQuestions.map((_, i) => `
          <div class="quiz-progress-dot ${i + 1 < quizStep ? 'completed' : ''} ${i + 1 === quizStep ? 'active' : ''}"></div>
        `).join('')}
      </div>

      <div style="font-size:var(--text-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">คำถามที่ ${quizStep} จาก ${quizQuestions.length}</div>
      <h2 class="quiz-question">${q.question}</h2>

      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" onclick="selectQuizOption('${q.key}', ${opt.value}, this)" id="quiz-opt-${i}">
            <div class="quiz-option-emoji">${opt.emoji}</div>
            <div class="quiz-option-text">${opt.text}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectQuizOption(key, value, el) {
  quizAnswers[key] = value;
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  
  setTimeout(() => {
    quizStep++;
    renderQuizStep();
  }, 400);
}

function showQuizResults() {
  const recommended = getRecommendedSubjects(quizAnswers).slice(0, 8);
  
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="container page-enter" style="padding-top:var(--space-10)">
      <div style="text-align:center;margin-bottom:var(--space-10)">
        <div style="font-size:64px;margin-bottom:var(--space-4)">🎉</div>
        <h1 style="font-size:var(--text-3xl);font-weight:900;margin-bottom:var(--space-3)">วิชาที่เหมาะกับคุณ</h1>
        <p style="color:var(--color-text-secondary)">จากคำตอบของคุณ เราแนะนำวิชาเหล่านี้</p>
      </div>

      <div class="grid grid-auto-fill stagger-children">
        ${recommended.map(s => `
          <div class="subject-card hover-lift" onclick="navigateTo('/subject/${s.id}')" style="position:relative">
            <div class="recommend-match">${s.matchScore}% Match</div>
            <div class="subject-card-header">
              <span class="subject-card-code">${s.code}</span>
              <span class="badge badge-${s.category === 'gened' ? 'primary' : 'secondary'}">${s.category === 'gened' ? 'GenEd' : 'วิชาคณะ'}</span>
            </div>
            <div class="subject-card-name">${s.name}</div>
            <div class="subject-card-instructor">👨‍🏫 ${s.instructor}</div>
            <div class="subject-card-tags">
              ${s.tags.slice(0, 3).map(tag => `<span class="tag" style="border-color:${getTagColor(tag)}30;color:${getTagColor(tag)}">${tag}</span>`).join('')}
            </div>
            <div class="subject-card-footer">
              <div class="subject-card-rating">
                ${renderStars(s.avg.overall)}
                <span class="rating-value">${s.avg.overall || '-'}</span>
              </div>
              <span style="font-size:var(--text-sm);color:var(--color-text-tertiary)">${s.avg.count} รีวิว</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="text-align:center;margin-top:var(--space-10)">
        <button class="btn btn-secondary btn-lg" onclick="renderRecommendPage()">🔄 ทำแบบทดสอบอีกครั้ง</button>
      </div>
    </div>
    ${renderFooter()}
  `;
}
