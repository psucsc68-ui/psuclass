// ============================================
// ClassMuse — Write Review Page
// ============================================

let reviewFormStep = 1;
let reviewFormData = { subjectId:'', semester:'', overall:0, workload:0, interest:0, teaching:0, studyFormat:'', content:'', recommend:'', tags:[], anonymous:false, alias:'' };

function renderWriteReviewPage() {
  // Check URL params for pre-selected subject
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
  if (params.get('subject')) reviewFormData.subjectId = params.get('subject');
  reviewFormStep = 1;

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="review-form page-enter">
      <h1 style="font-size:var(--text-3xl);font-weight:900;text-align:center;margin-bottom:var(--space-2)">✍️ เขียนรีวิว</h1>
      <p style="text-align:center;color:var(--color-text-secondary);margin-bottom:var(--space-8)">แชร์ประสบการณ์ของคุณเพื่อช่วยรุ่นน้อง</p>

      <!-- Steps -->
      <div class="form-steps" id="form-steps">
        ${[1,2,3].map(i => `
          <div class="form-step ${i === 1 ? 'active' : ''}" data-step="${i}">
            <div class="form-step-dot">${i}</div>
          </div>
          ${i < 3 ? '<div class="form-step-line"></div>' : ''}
        `).join('')}
      </div>

      <!-- Step 1: Select Subject + Ratings -->
      <div id="step-1" class="form-section">
        <div class="form-section-title">📘 เลือกวิชาและให้คะแนน</div>
        
        <div class="form-group">
          <label class="form-label">วิชาที่ต้องการรีวิว</label>
          <div style="display:flex;gap:var(--space-2)">
            <select class="form-input form-select" id="review-subject" onchange="reviewFormData.subjectId=this.value" style="flex:1">
              <option value="">-- เลือกวิชา --</option>
              ${subjects.map(s => `<option value="${s.id}" ${reviewFormData.subjectId === s.id ? 'selected' : ''}>${s.code} ${s.name}</option>`).join('')}
            </select>
            <button class="btn btn-secondary" type="button" onclick="showAddSubjectModal()" style="white-space:nowrap;flex-shrink:0">
              ➕ เพิ่มวิชาใหม่
            </button>
          </div>
          <div class="form-hint">หาวิชาไม่เจอ? กดปุ่ม "เพิ่มวิชาใหม่" เพื่อสร้างวิชาในระบบ</div>
        </div>

        <div class="form-group">
          <label class="form-label">เทอมที่เรียน</label>
          <select class="form-input form-select" id="review-semester" onchange="reviewFormData.semester=this.value">
            <option value="">-- เลือกเทอม --</option>
            <option value="1/2568">1/2568</option>
            <option value="2/2567">2/2567</option>
            <option value="1/2567">1/2567</option>
            <option value="2/2566">2/2566</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">ให้คะแนน</label>
          ${['คะแนนรวม (overall)', 'จำนวนงาน (workload)', 'ความน่าสนใจ (interest)', 'การสอน (teaching)'].map((label, i) => {
            const keys = ['overall','workload','interest','teaching'];
            return `
              <div class="rating-input-row">
                <span class="rating-input-label">${['⭐','📋','💡','👨‍🏫'][i]} ${label}</span>
                <div class="star-rating-input" id="rating-${keys[i]}">
                  ${[5,4,3,2,1].map(n => `
                    <input type="radio" id="${keys[i]}-${n}" name="${keys[i]}" value="${n}" onchange="reviewFormData.${keys[i]}=${n}">
                    <label for="${keys[i]}-${n}">★</label>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="btn btn-primary btn-lg" style="width:100%" onclick="nextStep(2)">ถัดไป →</button>
      </div>

      <!-- Step 2: Content -->
      <div id="step-2" class="form-section" style="display:none">
        <div class="form-section-title">💬 เขียนรีวิว</div>

        <div class="form-group">
          <label class="form-label">รีวิวของคุณ</label>
          <textarea class="form-input form-textarea" id="review-content" placeholder="แชร์ประสบการณ์เรียนวิชานี้... เช่น เนื้อหาเป็นอย่างไร งานเยอะไหม สอบยากไหม อาจารย์สอนดีไหม แนะนำไหม"
            oninput="reviewFormData.content=this.value"></textarea>
          <div class="form-hint">เขียนอย่างน้อย 20 ตัวอักษร</div>
        </div>

        <div class="form-group">
          <label class="form-label">แนะนำกับใคร</label>
          <input class="form-input" type="text" id="review-recommend" placeholder="เช่น คนอยากได้เกรดง่าย, คนชอบ coding, คนที่มีเวลา"
            oninput="reviewFormData.recommend=this.value" />
        </div>

        <div class="form-group">
          <label class="form-label">Tags</label>
          <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
            ${Object.entries(tagDefinitions).map(([key, t]) => `
              <button class="tag" onclick="toggleReviewTag(this,'${key}')" data-tag="${key}">${t.emoji} ${t.label}</button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-secondary btn-lg" style="flex:1" onclick="nextStep(1)">← ก่อนหน้า</button>
          <button class="btn btn-primary btn-lg" style="flex:1" onclick="nextStep(3)">ถัดไป →</button>
        </div>
      </div>

      <!-- Step 3: Settings + Submit -->
      <div id="step-3" class="form-section" style="display:none">
        <div class="form-section-title">⚙️ ตั้งค่าและส่ง</div>

        <div class="form-group">
          <div class="form-toggle-row">
            <div>
              <div style="font-weight:600">👤 รีวิวแบบไม่ระบุตัวตน</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">ซ่อนชื่อของคุณจากรีวิว</div>
            </div>
            <div class="form-toggle" id="toggle-anonymous" onclick="toggleAnonymous()"></div>
          </div>
        </div>

        <div class="form-group" id="alias-group">
          <label class="form-label">นามแฝง <span class="form-label-optional">(ไม่บังคับ)</span></label>
          <input class="form-input" type="text" placeholder="เช่น พี่ปี4, Dev Junior, เด็กบริหาร"
            oninput="reviewFormData.alias=this.value" />
        </div>

        <div class="form-group">
          <label class="form-label">แนบไฟล์ <span class="form-label-optional">(ไม่บังคับ)</span></label>
          <div class="form-file-upload" onclick="showToast('ฟีเจอร์แนบไฟล์จะมาเร็วๆ นี้','info')">
            <div class="form-file-upload-icon">📎</div>
            <div class="form-file-upload-text">คลิกเพื่อแนบรูปภาพ หรือไฟล์ (PDF, JPG, PNG)</div>
          </div>
        </div>

        <!-- Preview -->
        <div class="glass-card" style="margin-bottom:var(--space-6)">
          <h4 style="margin-bottom:var(--space-4)">👁️ Preview</h4>
          <div id="review-preview"></div>
        </div>

        <div id="low-rating-feedback" style="display:none">
          <div class="warning-badge" style="width:100%;padding:var(--space-4);margin-bottom:var(--space-4);border-radius:var(--radius-xl)">
            ⚠️ คุณให้คะแนนค่อนข้างต่ำ — ช่วยระบุเหตุผลเพิ่มเติมในรีวิวเพื่อให้เป็นประโยชน์กับคนอื่นนะ
          </div>
        </div>

        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-secondary btn-lg" style="flex:1" onclick="nextStep(2)">← ก่อนหน้า</button>
          <button class="btn btn-accent btn-lg" style="flex:2" onclick="submitReview()">✨ ส่งรีวิว</button>
        </div>
      </div>
    </div>
  `;

  updateActiveNav('');
  scrollToTop();
}

function nextStep(step) {
  // Validation
  if (step === 2 && reviewFormStep === 1) {
    if (!reviewFormData.subjectId) { showToast('กรุณาเลือกวิชา','warning'); return; }
    if (!reviewFormData.semester) { showToast('กรุณาเลือกเทอม','warning'); return; }
    if (!reviewFormData.overall) { showToast('กรุณาให้คะแนนรวม','warning'); return; }
  }
  if (step === 3 && reviewFormStep === 2) {
    if (reviewFormData.content.length < 20) { showToast('กรุณาเขียนรีวิวอย่างน้อย 20 ตัวอักษร','warning'); return; }
  }

  reviewFormStep = step;
  [1,2,3].forEach(i => {
    document.getElementById(`step-${i}`).style.display = i === step ? 'block' : 'none';
    const stepEl = document.querySelector(`.form-step[data-step="${i}"]`);
    if (stepEl) {
      stepEl.classList.remove('active','completed');
      if (i < step) stepEl.classList.add('completed');
      if (i === step) stepEl.classList.add('active');
    }
  });

  if (step === 3) {
    updatePreview();
    // Check low rating
    if (reviewFormData.overall <= 2) {
      document.getElementById('low-rating-feedback').style.display = 'block';
    }
  }
}

function toggleReviewTag(el, tag) {
  el.classList.toggle('active');
  const idx = reviewFormData.tags.indexOf(tag);
  if (idx >= 0) reviewFormData.tags.splice(idx, 1);
  else reviewFormData.tags.push(tag);
}

function toggleAnonymous() {
  reviewFormData.anonymous = !reviewFormData.anonymous;
  document.getElementById('toggle-anonymous').classList.toggle('active', reviewFormData.anonymous);
}

function updatePreview() {
  const subject = getSubjectById(reviewFormData.subjectId);
  const preview = document.getElementById('review-preview');
  if (!preview) return;
  preview.innerHTML = renderReviewCard({
    id: 'preview',
    subjectId: reviewFormData.subjectId,
    overall: reviewFormData.overall,
    workload: reviewFormData.workload,
    interest: reviewFormData.interest,
    teaching: reviewFormData.teaching,
    semester: reviewFormData.semester,
    content: reviewFormData.content || '(รีวิวของคุณจะแสดงที่นี่)',
    tags: reviewFormData.tags,
    helpful: 0, comments: 0,
    anonymous: reviewFormData.anonymous,
    alias: reviewFormData.alias
  }, true);
}

function submitReview() {
  if (!reviewFormData.content || reviewFormData.content.length < 20) {
    showToast('กรุณาเขียนรีวิวอย่างน้อย 20 ตัวอักษร','warning');
    return;
  }

  // Add to reviews array
  const newReview = {
    id: 'r' + (reviews.length + 1),
    subjectId: reviewFormData.subjectId,
    overall: reviewFormData.overall,
    workload: reviewFormData.workload || 3,
    interest: reviewFormData.interest || 3,
    teaching: reviewFormData.teaching || 3,
    semester: reviewFormData.semester,
    content: reviewFormData.content,
    tags: reviewFormData.tags,
    helpful: 0, comments: 0,
    anonymous: reviewFormData.anonymous,
    alias: reviewFormData.alias || null
  };
  reviews.push(newReview);
  saveReviews();
  saveReviewToSheet(newReview);

  showToast('ส่งรีวิวสำเร็จ! 🎉 ขอบคุณที่ช่วยแชร์ประสบการณ์', 'success');
  
  // Reset form
  reviewFormData = { subjectId:'', semester:'', overall:0, workload:0, interest:0, teaching:0, studyFormat:'', content:'', recommend:'', tags:[], anonymous:false, alias:'' };
  reviewFormStep = 1;

  setTimeout(() => navigateTo(`/subject/${newReview.subjectId}`), 1500);
}

// ============================================
// Add New Subject Modal
// ============================================

function showAddSubjectModal() {
  showModal('➕ เพิ่มวิชาใหม่', `
    <p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin-bottom:var(--space-6)">
      หาวิชาไม่เจอในระบบ? เพิ่มวิชาใหม่ได้เลย!
    </p>

    <div class="form-group">
      <label class="form-label">รหัสวิชา <span style="color:var(--color-danger)">*</span></label>
      <input class="form-input" type="text" id="new-subject-code" placeholder="เช่น CS101, GEN201, BA301" 
        style="text-transform:uppercase" maxlength="10" />
      <div class="form-hint">ใส่รหัสวิชาตามหลักสูตร</div>
    </div>

    <div class="form-group">
      <label class="form-label">ชื่อวิชา (ภาษาไทย) <span style="color:var(--color-danger)">*</span></label>
      <input class="form-input" type="text" id="new-subject-name" placeholder="เช่น หลักการเขียนโปรแกรม" />
    </div>

    <div class="form-group">
      <label class="form-label">ชื่อวิชา (ภาษาอังกฤษ) <span class="form-label-optional">(ไม่บังคับ)</span></label>
      <input class="form-input" type="text" id="new-subject-nameen" placeholder="เช่น Introduction to Programming" />
    </div>

    <div class="form-group">
      <label class="form-label">หน่วยกิต <span class="form-label-optional">(ไม่บังคับ)</span></label>
      <input class="form-input" type="number" id="new-subject-credits" placeholder="เช่น 3" min="1" max="12" value="3" />
    </div>

    <div class="form-group">
      <label class="form-label">อาจารย์ผู้สอน <span class="form-label-optional">(ไม่บังคับ)</span></label>
      <input class="form-input" type="text" id="new-subject-instructor" placeholder="เช่น ผศ.ดร.สมชาย วิชาการ" />
    </div>

    <div style="display:flex;gap:var(--space-3);margin-top:var(--space-6)">
      <button class="btn btn-secondary btn-lg" style="flex:1" onclick="closeModal()">ยกเลิก</button>
      <button class="btn btn-primary btn-lg" style="flex:1" onclick="addNewSubject()">✅ เพิ่มวิชา</button>
    </div>
  `);
}

function addNewSubject() {
  const code = (document.getElementById('new-subject-code')?.value || '').trim().toUpperCase();
  const name = (document.getElementById('new-subject-name')?.value || '').trim();
  const nameEN = (document.getElementById('new-subject-nameen')?.value || '').trim();
  const credits = parseInt(document.getElementById('new-subject-credits')?.value) || 3;
  const instructor = (document.getElementById('new-subject-instructor')?.value || '').trim() || 'ยังไม่ระบุ';

  // Validation
  if (!code) {
    showToast('กรุณาใส่รหัสวิชา', 'warning');
    return;
  }
  if (!name) {
    showToast('กรุณาใส่ชื่อวิชา', 'warning');
    return;
  }

  // Check duplicate
  const existing = subjects.find(s => s.code.toUpperCase() === code);
  if (existing) {
    showToast(`วิชา ${code} มีอยู่ในระบบแล้ว (${existing.name}) — เลือกจากรายการได้เลย`, 'warning');
    closeModal();
    // Auto-select the existing subject
    const select = document.getElementById('review-subject');
    if (select) {
      select.value = existing.id;
      reviewFormData.subjectId = existing.id;
    }
    return;
  }

  // Generate ID from code
  const id = code.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Create new subject
  const newSubject = {
    id: id,
    code: code,
    name: name,
    nameEN: nameEN || name,
    credits: credits,
    category: 'gened',
    instructor: instructor,
    department: 'ยังไม่ระบุ',
    semester: '1/2568',
    description: name,
    tags: [],
    warnings: [],
    studyFormat: 'ยังไม่ระบุ',
    examFormat: 'ยังไม่ระบุ',
    weeklyHours: 3
  };

  subjects.push(newSubject);
  saveSubjects();
  saveSubjectToSheet(newSubject);

  // Close modal
  closeModal();

  // Update the select dropdown
  const select = document.getElementById('review-subject');
  if (select) {
    const option = document.createElement('option');
    option.value = newSubject.id;
    option.textContent = `${newSubject.code} ${newSubject.name}`;
    option.selected = true;
    select.appendChild(option);
    reviewFormData.subjectId = newSubject.id;
  }

  showToast(`เพิ่มวิชา ${code} ${name} สำเร็จ! 🎉`, 'success');
}

