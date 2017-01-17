const qs = (el, context = document) =>
  context.querySelector(el);

const qsa = (selector, context = document) =>
  Array.prototype.slice.call(
    context.querySelectorAll(selector)
  );
