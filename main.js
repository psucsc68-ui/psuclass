// ============================================
// ClassMuse — Main Entry Point
// ============================================

document.addEventListener('DOMContentLoaded', async function() {
  // Render navbar
  renderNavbar();

  // Try to load from Google Sheets first
  const loadedFromSheets = await loadFromSheets();
  
  if (loadedFromSheets) {
    console.log('ClassMuse: Data loaded from Google Sheets ✅');
  } else {
    console.log('ClassMuse: Using localStorage data');
  }

  // Handle initial route
  handleRoute();

  // Console branding
  console.log(
    '%c🎓 ClassMuse %cv1.0',
    'font-size:24px;font-weight:900;background:linear-gradient(135deg,#6366f1,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;',
    'font-size:14px;color:#94A3B8'
  );
});
