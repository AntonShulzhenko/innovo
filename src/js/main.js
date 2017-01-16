'use strict';
const templates = window.templates;

function render(elem, tplName, data = {}) {
  elem.innerHTML = templates[tplName](data);
}

//=require 'helpers/*.js'
//=require 'templates/*.js'
//=require 'common/*.js'
