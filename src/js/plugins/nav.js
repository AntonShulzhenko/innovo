(function() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  const top = document.querySelector('.top');

  function toggleClass(el, className) {
    if(!el) return;
    if(!el.classList.contains(className)) {
      disableScroll();
    } else {
      enableScroll();
    }
    el.classList.toggle(className);
  }

  nav.addEventListener('click', (e) => {
    if(e.target.classList.contains('nav__link')) {
      toggleClass(nav, 'is-active');
      toggleClass(btn, 'is-active');
      toggleClass(top, 'is-active');
    }
  });

  btn.addEventListener('click', (e) => {
    toggleClass(nav, 'is-active');
    toggleClass(btn, 'is-active');
    toggleClass(top, 'is-active');
  });
}());
