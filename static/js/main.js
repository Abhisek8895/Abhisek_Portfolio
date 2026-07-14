// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Mark active nav link based on current page
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Terminal typing effect (hero, index page only)
  const terminal = document.querySelector('[data-terminal]');
  if (terminal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lines = JSON.parse(terminal.getAttribute('data-lines'));
    terminal.innerHTML = '';
    let li = 0;

    function typeLine() {
      if (li >= lines.length) return;
      const { prompt, text, cls } = lines[li];
      const row = document.createElement('div');
      row.style.marginBottom = '10px';
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
      promptSpan.textContent = prompt + ' ';
      const textSpan = document.createElement('span');
      textSpan.className = cls || '';
      row.appendChild(promptSpan);
      row.appendChild(textSpan);
      terminal.appendChild(row);

      let ci = 0;
      const speed = prompt === '>>>' ? 18 : 0;
      function typeChar() {
        if (ci < text.length) {
          textSpan.textContent += text[ci];
          ci++;
          setTimeout(typeChar, speed);
        } else {
          li++;
          setTimeout(typeLine, 260);
        }
      }
      if (speed > 0) {
        typeChar();
      } else {
        textSpan.textContent = text;
        li++;
        setTimeout(typeLine, 220);
      }
    }
    typeLine();
  } else if (terminal) {
    // reduced motion: render instantly
    const lines = JSON.parse(terminal.getAttribute('data-lines'));
    terminal.innerHTML = lines.map(l =>
      `<div style="margin-bottom:10px"><span class="prompt">${l.prompt} </span><span class="${l.cls || ''}">${l.text}</span></div>`
    ).join('');
  }

  // Project modals
  document.querySelectorAll('[data-open-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-open-modal');
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-backdrop').classList.remove('open');
    });
  });
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('open');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    }
  });
});