// ============================================
// ClassMuse — Search Utilities
// ============================================

function searchSubjectsQuery(query) {
  const q = query.toLowerCase().trim();
  if (!q) return subjects;
  return subjects.filter(s =>
    s.code.toLowerCase().includes(q) ||
    s.name.includes(q) ||
    s.nameEN.toLowerCase().includes(q) ||
    s.instructor.includes(q) ||
    s.department.includes(q)
  );
}

function filterSubjectsByTag(subjectList, filterId) {
  switch (filterId) {
    case 'all': return subjectList;
    case 'gened': return subjectList.filter(s => s.category === 'gened');
    case 'faculty': return subjectList.filter(s => s.category === 'faculty');
    case 'easy-work':
      return subjectList.filter(s => {
        const avg = getAverageRatings(s.id);
        return avg.count > 0 && avg.workload <= 2.5;
      });
    case 'hard-exam':
      return subjectList.filter(s => s.tags.includes('#สอบโหด'));
    case 'good-teacher':
      return subjectList.filter(s => s.tags.includes('#อาจารย์เทพ'));
    case 'easy-pass':
      return subjectList.filter(s => s.tags.includes('#ผ่านง่าย'));
    default: return subjectList;
  }
}
