// ============================================
// ClassMuse — Tags & Warnings (Global)
// ============================================

const tagDefinitions = {
  '#สายชิล': { label:'#สายชิล', emoji:'😎', color:'#10B981', description:'งานน้อย เรียนสบาย' },
  '#งานหนัก': { label:'#งานหนัก', emoji:'💪', color:'#EF4444', description:'งานเยอะ ต้องขยัน' },
  '#สอบโหด': { label:'#สอบโหด', emoji:'📝', color:'#EF4444', description:'สอบยากมาก' },
  '#ผ่านง่าย': { label:'#ผ่านง่าย', emoji:'✅', color:'#10B981', description:'ผ่านง่ายมาก' },
  '#อาจารย์เทพ': { label:'#อาจารย์เทพ', emoji:'👨‍🏫', color:'#3B82F6', description:'อาจารย์สอนดีมาก' },
  '#อ่านคืนเดียวรอด': { label:'#อ่านคืนเดียวรอด', emoji:'🌙', color:'#8B5CF6', description:'ไม่ต้องเตรียมตัวมาก' }
};

const filterOptions = [
  { id:'all', label:'ทั้งหมด', emoji:'📚' },
  { id:'gened', label:'GenEd', emoji:'🎓' },
  { id:'faculty', label:'วิชาคณะ', emoji:'🏛️' },
  { id:'easy-work', label:'งานน้อย', emoji:'😎' },
  { id:'hard-exam', label:'สอบหนัก', emoji:'📝' },
  { id:'good-teacher', label:'อาจารย์สอนดี', emoji:'👨‍🏫' },
  { id:'easy-pass', label:'ผ่านง่าย', emoji:'✅' }
];

function getTagColor(tag) { return tagDefinitions[tag]?.color || '#64748B'; }
function getTagEmoji(tag) { return tagDefinitions[tag]?.emoji || '🏷️'; }
