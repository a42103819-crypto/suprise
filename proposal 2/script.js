const pages = Array.from(document.querySelectorAll('.page'));
const buttons = Array.from(document.querySelectorAll('[data-target]'));
const audio = document.getElementById('bgAudio');
const audioToggle = document.getElementById('audioToggle');
const finalFooter = document.querySelector('.final-footer');
let activePage = 1;
let typedTimers = [];
function setActivePage(pageId) {
  const previous = document.querySelector('.page.active');
  const next = document.querySelector(`.page-${pageId}`);
  if (!next) return;
  if (previous) previous.classList.remove('active');
  next.classList.add('active');
  activePage = pageId;
  if (pageId === 8) {
    triggerConfetti();
  }
  if (pageId >= 3) {
    createRomanticParticles(next);
  }
  if (pageId === 4 || pageId === 5 || pageId === 6 || pageId === 8) {
    const typeEl = next.querySelector('.typewriter-text');
    const source = typeEl?.dataset?.text || typeEl?.textContent || '';
    if (typeEl) {
      typeWriter(typeEl, source);
    }
    const envelope = next.querySelector('.flap');
    if (envelope) {
      envelope.classList.add('open');
    }
  }
}
function typeWriter(element, text) {
  clearTypedTimers();
  element.textContent = '';
  let charIndex = 0;
  const interval = setInterval(() => {
    if (charIndex >= text.length) {
      clearInterval(interval);
      return;
    }
    element.textContent += text[charIndex];
    charIndex += 1;
  }, 48);
  typedTimers.push(interval);
}
function clearTypedTimers() {
  typedTimers.forEach(timer => clearInterval(timer));
  typedTimers = [];
}
function createRomanticParticles(page) {
  const existing = page.querySelectorAll('.sparkle-dot, .floating-heart');
  if (existing.length > 0) return;
  const count = 16;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    dot.style.left = `${Math.random() * 90 + 3}%`;
    dot.style.top = `${Math.random() * 85 + 3}%`;
    dot.style.animationDuration = `${3 + Math.random() * 2.5}s`;
    dot.style.opacity = `${0.2 + Math.random() * 0.7}`;
    page.appendChild(dot);
  }
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.left = `${Math.random() * 90 + 3}%`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    page.appendChild(heart);
  }
}
function triggerConfetti() {
  const page = document.querySelector('.page-8');
  const existing = page.querySelectorAll('.confetti-layer span');
  if (existing.length > 0) return;
  const container = page.querySelector('.confetti-layer');
  for (let i = 0; i < 24; i++) {
    const confetti = document.createElement('span');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${-15 - Math.random() * 30}%`;
    confetti.style.width = `${8 + Math.random() * 12}px`;
    confetti.style.height = `${14 + Math.random() * 14}px`;
    confetti.style.background = ['#fffc7f', '#ff9fce', '#fff', '#ffd1f2'][Math.floor(Math.random()*4)];
    confetti.style.animationDuration = `${3 + Math.random() * 3}s`;
    confetti.style.animationDelay = `${Math.random() * 1}s`;
    container.appendChild(confetti);
  }
}
function playAudio() {
  if (!audio) return;
  audio.play().catch(() => {});
}
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const target = parseInt(button.dataset.target, 10);
    if (target) {
      setActivePage(target);
    }
    playAudio();
  });
});
audioToggle.addEventListener('click', () => {
  if (!audio) return;
  if (audio.muted) {
    audio.muted = false;
    audioToggle.textContent = 'Mute';
  } else {
    audio.muted = true;
    audioToggle.textContent = 'Unmute';
  }
});
const yesButton = document.getElementById('yesBtn');
const maybeButton = document.getElementById('maybeBtn');
const resultContainer = document.getElementById('finalResult');
yesButton?.addEventListener('click', () => {
  resultContainer.innerHTML = '<p>You made my day ❤️</p>';
  createHeartsExplosion();
});
maybeButton?.addEventListener('click', () => {
  resultContainer.innerHTML = '<p>I\'ll keep waiting for your answer ❤️</p>';
  createFloatingHearts();
});
function createHeartsExplosion() {
  const page = document.querySelector('.page-8');
  for (let i = 0; i < 18; i++) {
    const pop = document.createElement('div');
    pop.className = 'heart-pop';
    pop.style.left = `${45 + Math.random() * 20}%`;
    pop.style.top = `${40 + Math.random() * 18}%`;
    page.appendChild(pop);
    pop.addEventListener('animationend', () => pop.remove());
  }
}
function createFloatingHearts() {
  const page = document.querySelector('.page-8');
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.style.left = `${Math.random() * 90 + 5}%`;
    h.style.top = `${Math.random() * 40 + 35}%`;
    h.style.animationDuration = `${5 + Math.random() * 4}s`;
    h.style.animationDelay = `${Math.random() * 1}s`;
    page.appendChild(h);
    setTimeout(() => h.remove(), 9000);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  setActivePage(1);
  audio.muted = false;
  audio.volume = 0.35;
  const page2 = document.querySelector('.page-2');
  const boxes = page2.querySelector('.gift-boxes');
  const sparkles = page2.querySelector('.sparkle-grid');
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${2 + Math.random()*3}s`;
    dot.style.width = `${6 + Math.random()*8}px`;
    dot.style.height = `${6 + Math.random()*8}px`;
    sparkles.appendChild(dot);
  }
  ['page-3', 'page-4', 'page-5', 'page-6', 'page-7', 'page-8'].forEach(name => {
    const page = document.querySelector(`.${name}`);
    if (page) {
      const stars = page.querySelector('.background-stars');
      if (!stars) return;
      for (let i = 0; i < 22; i++) {
        const star = document.createElement('span');
        star.style.left = `${Math.random()*100}%`;
        star.style.top = `${Math.random()*100}%`;
        star.style.animationDuration = `${3 + Math.random()*3}s`;
        star.style.animationDelay = `${Math.random()*2}s`;
        star.style.opacity = `${0.2 + Math.random()*0.8}`;
        stars.appendChild(star);
      }
    }
  });
});
