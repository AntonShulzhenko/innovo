(function() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.contacts__item_menu');

  btn.addEventListener('click', () => {
    nav.style.display = 'flex';
  });
}());
