const input = document.getElementById('searchInput');
const content = document.getElementById('content');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchWrapper = document.getElementById('searchWrapper');
const searchIcon = document.getElementById('searchIcon');
const clearIcon = document.getElementById('clearIcon');

let matches = [];
let currentIndex = -1;
let originalHTML = content.innerHTML;

/* ===== SEARCH CORE ===== */
function search(text) {
  content.innerHTML = originalHTML;
  matches = [];
  currentIndex = -1;

  if (!text) return;

  const regex = new RegExp(`(${text})`, 'gi');
  content.innerHTML = content.innerHTML.replace(regex, '<mark>$1</mark>');

  matches = Array.from(content.querySelectorAll('mark'));

  if (matches.length) {
    currentIndex = 0;
    focusMatch();
  }
}

function focusMatch() {
  matches.forEach((m) => m.removeAttribute('id'));

  const current = matches[currentIndex];
  current.id = 'active-search-result';
  current.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearSearch() {
  input.value = '';
  content.innerHTML = originalHTML;
  matches = [];
  currentIndex = -1;
}

/* ===== UI / ANIMATION ===== */
function openSearch() {
  searchWrapper.classList.add('open');
  input.focus();
}

function closeSearch() {
  if (input.value) return; // não fecha se tiver texto
  searchWrapper.classList.remove('open');
  clearSearch();
}

/* ===== EVENTS ===== */

// input
input.addEventListener('input', (e) => {
  search(e.target.value);
});

// teclado
input.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSearch();
  if (e.key === 'Enter') search(input.value);
});

// navegação
nextBtn.addEventListener('click', () => {
  if (!matches.length) return;
  currentIndex = (currentIndex + 1) % matches.length;
  focusMatch();
});

prevBtn.addEventListener('click', () => {
  if (!matches.length) return;
  currentIndex = (currentIndex - 1 + matches.length) % matches.length;
  focusMatch();
});

// ícones
searchIcon.addEventListener('mouseenter', openSearch);
searchIcon.addEventListener('click', openSearch);

clearIcon.addEventListener('click', () => {
  clearSearch();
  closeSearch();
});

// wrapper
searchWrapper.addEventListener('mouseleave', closeSearch);

// F3 estilo navegador
document.addEventListener('keydown', (e) => {
  if (e.key === 'F3') {
    e.preventDefault();
    openSearch();
    nextBtn.click();
  }
});
