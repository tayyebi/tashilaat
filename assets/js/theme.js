(function() {
  var STORAGE_KEY = 'tashilaat-theme';
  var THEMES = ['dark', 'light', 'auto'];
  var html = document.documentElement;

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function getEffectiveTheme(mode) {
    if (mode === 'auto') return getSystemTheme();
    return mode;
  }

  function applyTheme(mode) {
    var effective = getEffectiveTheme(mode);
    if (effective === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = effective === 'light' ? '#F8F7F4' : '#0A0A0B';
    }
    localStorage.setItem(STORAGE_KEY, mode);
    updateToggleIcon(mode, effective);
  }

  function updateToggleIcon(mode, effective) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (mode === 'auto') {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><path d="M3 3l18 18" stroke-dasharray="2 2"/></svg>';
    } else if (effective === 'light') {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    } else {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    }
  }

  function cycleTheme() {
    var current = localStorage.getItem(STORAGE_KEY) || 'auto';
    var idx = THEMES.indexOf(current);
    var next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
  }

  var preferred = localStorage.getItem(STORAGE_KEY) || 'auto';
  applyTheme(preferred);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function() {
      var mode = localStorage.getItem(STORAGE_KEY) || 'auto';
      if (mode === 'auto') {
        applyTheme('auto');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', cycleTheme);
      btn.title = 'تغییر تم (تیره/روشن/خودکار)';
    }
  });
})();
