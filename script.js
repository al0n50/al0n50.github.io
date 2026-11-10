// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Copy email
const copyBtn = document.getElementById('copyEmail');
const emailText = document.getElementById('emailText');
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1800);
  }).catch(() => {
    // Fallback: select the text so the user can copy it manually
    const range = document.createRange();
    range.selectNodeContents(emailText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  });
});

// Theme toggle (initial theme is applied in <head> to avoid a flash)
const themeBtn = document.getElementById('themeBtn');
const currentTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀︎' : '☾';
  themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  try { localStorage.setItem('ao-theme', t); } catch { /* storage unavailable */ }
}
applyTheme(currentTheme());
themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'));

// Highlight the nav link for the section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => obs.observe(s));
