window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');

  preloader.classList.add('hidden');

  // espera a animação terminar
  preloader.addEventListener(
    'transitionend',
    () => {
      preloader.remove();
      content.classList.add('visible');
    },
    { once: true }
  );
});
