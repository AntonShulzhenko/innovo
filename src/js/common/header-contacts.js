(function() {
  const mobileContainer   = document.querySelector('.mobile');
  const mobileLink        = mobileContainer.querySelector('.mobile__link');
  const close             = mobileContainer.querySelector('.mobile__close');
  const headerContacts    = document.querySelector('.header__contacts');
  const location          = headerContacts.querySelector('.contacts__item_address');
  const phone             = headerContacts.querySelector('.contacts__item_phone');
  const overlay           = document.querySelector('.overlay');
  const mobAddress        = document.querySelector('.mob-address a');
  const tlOpen            = new TimelineMax();
  const tlClose           = new TimelineMax();
  const animationDuration = 0.4;
  const timingFunction    = 'Power1.easeInOut';
  let winWidth            = window.innerWidth;

  function setMobileAddress() {
    const text = location.querySelector('.contacts__text').innerHTML;
    const href = `http://maps.google.com?q=${text}`;
    mobAddress.innerHTML = text;
    mobAddress.setAttribute('href', href);
  }

  function init() {
    winWidth = window.innerWidth;
  }

  function setLink(el) {
    const text = el.querySelector('.contacts__text').innerHTML;
    let href = 'javascript:void(0)';

    mobileLink.innerHTML = text;

    if(el.classList.contains('contacts__item_phone')) {
      href = `tel:${text}`;
    } else if(el.classList.contains('contacts__item_address')) {
      href = `http://maps.google.com?q=${text}`;
    }

    mobileLink.setAttribute('href', href);
  }

  function clearLink() {
    mobileLink.innerHTML = '';
    mobileLink.setAttribute('href', '');
  }

  function onOpen() {
    tlOpen
      .to(mobileLink, 0, {opacity: 0})
      .to(overlay, 0, {display: 'block', ease: timingFunction})
      .to(overlay, animationDuration, {opacity: 1, ease: timingFunction})
      .to(mobileContainer, animationDuration, {x: 0, opacity: 1, ease: timingFunction})
      .to(mobileLink, animationDuration, {opacity: 1})
      .to(close, 0.2, {opacity: 1});

    setLink(this);

    disableScroll();
  }

  function onClose() {
    tlClose
      .to(mobileContainer, 0.2, {opacity: 0, x: winWidth, ease: timingFunction})
      .to(close, 0, {opacity: 0})
      .to(mobileLink, 0, {opacity: 0})
      .to(overlay, 0.2, {opacity: 0, ease: timingFunction})
      .to(overlay, 0, {display: 'none', ease: timingFunction});

    enableScroll();

    setTimeout(() => {
      clearLink();
    }, 250);
  }

  function bindEvents() {
    location.addEventListener('click', onOpen);
    phone.addEventListener('click', onOpen);
    overlay.addEventListener('click', onClose);
    close.addEventListener('click', onClose);
  }

  init();

  if(winWidth > 1025) return;

  bindEvents();

  setMobileAddress();
}());
