// ============================================
// ClassMuse — Reviews Data (Global + localStorage)
// ============================================

const REVIEWS_STORAGE_KEY = 'classmuse_reviews';

// Load from localStorage or start empty
const reviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY)) || [];

function saveReviews() {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

function getReviewsBySubject(subjectId) {
  return reviews.filter(r => r.subjectId === subjectId);
}

function getAverageRatings(subjectId) {
  const subjectReviews = getReviewsBySubject(subjectId);
  if (subjectReviews.length === 0) return { overall:0, workload:0, interest:0, teaching:0, count:0 };
  const sum = subjectReviews.reduce((acc, r) => ({
    overall: acc.overall + r.overall, workload: acc.workload + r.workload,
    interest: acc.interest + r.interest, teaching: acc.teaching + r.teaching
  }), { overall:0, workload:0, interest:0, teaching:0 });
  const count = subjectReviews.length;
  return {
    overall: +(sum.overall / count).toFixed(1), workload: +(sum.workload / count).toFixed(1),
    interest: +(sum.interest / count).toFixed(1), teaching: +(sum.teaching / count).toFixed(1), count
  };
}

function getAllReviewsCount() { return reviews.length; }
