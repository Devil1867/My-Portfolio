// Shared across all three clone pages: page-transition wipe effect
document.addEventListener('DOMContentLoaded', () => {
  const wipeOverlay = document.getElementById('wipeOverlay');
  if (!wipeOverlay) return;

  document.querySelectorAll('a[data-transition], .cnav a, .cnav-float a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || link.classList.contains('active')) return;
      e.preventDefault();
      wipeOverlay.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 550);
    });
  });
});
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Toggle menu visibility
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
