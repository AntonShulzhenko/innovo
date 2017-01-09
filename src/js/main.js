'use strict';
const templates = window.templates;

function render(elem, tplName, data = {}) {
  elem.innerHTML = templates[tplName](data);
}

//=require 'templates/*.js'
//=require 'plugins/*.js'
