'use strict';
var templates = window.templates;

function render(elem, tplName, data) {
  data = data || {};
  elem.innerHTML = templates[tplName](data);
}

var qs = function(el, context) {
  context = context || document;
  context.querySelector(el);
};

var qsa = function(selector, context) {
  context = context || document;
  Array.prototype.slice.call(
    context.querySelectorAll(selector)
  );
};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

function disableScroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onwheel      = preventDefault;
  window.onmousewheel = document.onmousewheel = preventDefault;
  window.ontouchmove  = preventDefault;
}

function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onwheel      = null;
  window.onmousewheel = document.onmousewheel = null;
  window.ontouchmove  = null;
}

var loader = (function() {
  var ldr = document.getElementById('loader');
  var loaderProgress = document.querySelector('.loader__inner', ldr);
  var progressBar = document.querySelector('.pace-progress');
  var progressValue;

  var intervalID = setInterval(function() {
    progressValue = progressBar.dataset.progressText;
    loaderProgress.style.width = progressValue;
  }, 50);


  Pace.on('hide', function() {
    ldr.classList.add('fadeOut');

    clearInterval(intervalID);

    setTimeout(function() {
      ldr.classList.add('hidden');
    }, 500);
  });
})();

(function() {
  var mobileContainer   = document.querySelector('.mobile');
  var mobileLink        = mobileContainer.querySelector('.mobile__link');
  var close             = mobileContainer.querySelector('.mobile__close');
  var headerContacts    = document.querySelector('.header__contacts');
  var location          = headerContacts.querySelector('.contacts__item_address');
  var phone             = headerContacts.querySelector('.contacts__item_phone');
  var overlay           = document.querySelector('.overlay');
  var mobAddress        = document.querySelector('.mob-address a');
  var tlOpen            = new TimelineMax();
  var tlClose           = new TimelineMax();
  var animationDuration = 0.4;
  var timingFunction    = 'Power1.easeInOut';
  var winWidth            = window.innerWidth;

  function setMobileAddress() {
    var text = location.querySelector('.contacts__text').innerHTML;
    var href = 'http://maps.google.com?q=' + text;
    var small = '<small>построить маршрут</small>';
    mobAddress.innerHTML = text + small;
    mobAddress.setAttribute('href', href);
  }

  function init() {
    winWidth = window.innerWidth;
  }

  function setLink(el) {
    var text = el.querySelector('.contacts__text').innerHTML;
    var href = 'javascript:void(0)';
    var descr;
    var small;

    if(el.classList.contains('contacts__item_phone')) {
      href = 'tel:' + text;
      descr = 'позвонить';
    } else if(el.classList.contains('contacts__item_address')) {
      href = 'http://maps.google.com?q=' + text;
      descr = 'построить маршрут';
    }

    small = '<small>' + descr + '</small>';

    mobileLink.innerHTML = text + small;
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

    setTimeout(function() {
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

(function($) {
  $('.owl-carousel').owlCarousel({
    items: 1,
    center: true,
    nav: true,
    navText: ['<i class="ion-ios-arrow-left"></i>', '<i class="ion-ios-arrow-right"></i>'],
    lazyLoad: true,
    smartSpeed: 400
  });
}(jQuery));

function initMap() {
  var mapContainer = document.getElementById('map');
  var mapStyles    = [
    {
      'featureType': 'all',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'saturation': 36
        },
        {
          'color': '#333333'
        },
        {
          'lightness': 40
        }
      ]
    },
    {
      'featureType': 'all',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#ffffff'
        },
        {
          'lightness': 16
        }
      ]
    },
    {
      'featureType': 'all',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#fefefe'
        },
        {
          'lightness': 20
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#fefefe'
        },
        {
          'lightness': 17
        },
        {
          'weight': 1.2
        }
      ]
    },
    {
      'featureType': 'landscape',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        },
        {
          'lightness': 20
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        },
        {
          'lightness': 21
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dedede'
        },
        {
          'lightness': 21
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 17
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 29
        },
        {
          'weight': 0.2
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 18
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 16
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f2f2f2'
        },
        {
          'lightness': 19
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e9e9e9'
        },
        {
          'lightness': 17
        }
      ]
    }
  ];
  var markerImages = ['img/buble-250px.svg', 'img/buble-150px.svg'];
  var markerLatLng = {lat: 50.457492, lng: 30.519226};
  var mapPosition  = [markerLatLng, {lat: 50.458290, lng: 30.519077}];
  var windowWidth  = window.innerWidth;
  var markerIcon     = markerImages[0];
  var mapLatLng      = mapPosition[0];
  var marker;
  var map;

  if(windowWidth < 600) {
    mapLatLng = mapPosition[1];
    markerIcon = markerImages[1];
  }

  map = new google.maps.Map(mapContainer, {
    center: mapLatLng,
    zoom: 17,
    styles: mapStyles,
    scrollwheel: false,
    disableDefaultUI: true
  });

  marker = new google.maps.Marker({
    position: markerLatLng,
    map: map,
    icon: markerIcon
  });
}

(function() {
  var nav = document.querySelector('.nav');
  var btn = document.querySelector('.menu-btn');
  var top = document.querySelector('.top');

  function toggleClass(el, className) {
    if(!el) return;
    if(!el.classList.contains(className)) {
      disableScroll();
    } else {
      enableScroll();
    }
    el.classList.toggle(className);
  }

  if(window.innerWidth < 900) {
    nav.addEventListener('click', function(e) {
      if(e.target.classList.contains('nav__link')) {
        toggleClass(nav, 'is-active');
        toggleClass(btn, 'is-active');
        toggleClass(top, 'is-active');
      }
    });

    btn.addEventListener('click', function(e) {
      toggleClass(nav, 'is-active');
      toggleClass(btn, 'is-active');
      toggleClass(top, 'is-active');
    });
  }
}());

(function($) {
  var scrollTo = (function() {
    $('.scroll-to').on('click', function(e) {
      var clickElement = $(this).attr('href');
      var clickDestination = $(clickElement).offset().top;

      $('html:not(:animated),body:not(:animated)').animate({scrollTop: clickDestination},1000);
      e.preventDefault();
    });
  })();

  var goTop = $('.go-top');

  $(window).on('scroll', function() {
    if($(window).scrollTop() > 500) {
      goTop.addClass('is-visible');
    } else {
      goTop.removeClass('is-visible');
    }
  });
})(jQuery);


//# sourceMappingURL=main.js.map
