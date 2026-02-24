// ============================================================
//  ИНИЦИАЛИЗАЦИЯ СТРАНИЦ
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  highlightNav();

  if (page === 'home') {
    initScrollHeader();
  }

  switch (page) {
    case 'home': initHome(); break;
    case 'book': initBook(); break;
  }
});

// ── Главная ──────────────────────────────────────────────────
function initHome() {
  const grid = document.getElementById('all-books');
  if (grid) {
    BookComponents.renderGrid(grid, { all: true });
  }
}

// ── Страница книги ────────────────────────────────────────────
function initBook() {
  const params    = new URLSearchParams(window.location.search);
  const bookId    = params.get('id');
  const container = document.getElementById('book-detail');
  if (!container) return;

  if (!bookId) {
    container.innerHTML = `
      <div class="container" style="padding: 100px 24px; text-align: center;">
        <p style="font-size:1.1rem; color: var(--text-500);">
          Книга не указана.&nbsp;<a href="index.html">← На главную</a>
        </p>
      </div>`;
    return;
  }

  BookComponents.renderDetail(container, bookId);
}

// ── Навигация: подсвечиваем текущую страницу ──────────────────
function highlightNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
}

// ── Прозрачный хедер → тёмный при скролле ───────────────────
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
