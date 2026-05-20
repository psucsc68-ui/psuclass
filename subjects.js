// ============================================
// ClassMuse — Subjects Data (Global + localStorage)
// ============================================

const SUBJECTS_STORAGE_KEY = 'classmuse_subjects';

// Load from localStorage or start empty
const subjects = JSON.parse(localStorage.getItem(SUBJECTS_STORAGE_KEY)) || [];

function saveSubjects() {
  localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
}

function getSubjectById(id) {
  return subjects.find(s => s.id === id);
}

function getSubjectsByCategory(category) {
  if (category === 'all') return subjects;
  return subjects.filter(s => s.category === category);
}
