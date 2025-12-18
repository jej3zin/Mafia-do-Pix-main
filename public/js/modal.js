document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');

  document.querySelectorAll('.openModalImg').forEach((img) => {
    img.addEventListener('click', (e) => {
      // segurança: usa src da imagem clicada
      modalImg.src = img.src;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // clicar fora da imagem fecha
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC fecha também
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = ''; // limpa a src (opcional)
  }
});
