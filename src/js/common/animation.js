// (function() {
//   const tl = new TimelineMax();
//   const header = qs('.header');
//   const logo = qs('.header__logo', header);
//   const contacts = qsa('.contacts__item', header);
//   const topAbout = qs('.top__about');
//
//   Pace.on('hide', () => {
//     tl
//     .set(logo, {scale: 0.9, opacity: 0})
//     .set(topAbout, {scale: 0.9, opacity: 0});
//
//     tl
//     .to(logo, 1, {scale: 1, opacity: 1, delay: 0.3})
//     .to(topAbout, 1, {scale: 1, opacity: 1, delay: 0.1});
//   });
// }());
