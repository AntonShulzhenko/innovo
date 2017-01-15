(function() {
  const mobileContainer = document.querySelector('.mobile');
  const mobileLink = mobileContainer.querySelector('.mobile__link');
  const headerContacts = document.querySelector('.header__contacts');
  const location = headerContacts.querySelector('.contacts__item_address');
  const overlay = document.querySelector('.overlay');
  const close = mobileContainer.querySelector('.mobile__close');
  const body = document.body;

  body.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI') {
      console.log(e.target.tagName);
    }
  });

  location.addEventListener('click', (e) => {
    overlay.classList.add('is-active');
    setTimeout(() => {
      mobileContainer.classList.add('is-active');
    }, 400);
  });

  close.addEventListener('click', () => {
    mobileContainer.classList.remove('is-active');
    setTimeout(() => {
      overlay.classList.remove('is-active');
    }, 400);
  });
}());
