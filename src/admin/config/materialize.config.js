const M = require('../frameworks/materialize.min');
export class MaterializeConfig {
    constructor() {
        document.addEventListener('DOMContentLoaded', function () {
            // Closest полифилл для ie11
            (function() {
                if (!Element.prototype.closest) {
                  Element.prototype.closest = function(css) {
                    var node = this;
              
                    while (node) {
                      if (node.matches(css)) return node;
                      else node = node.parentElement;
                    }
                    return null;
                  };
                }
            })();
            // Matches полифилл для ie11
            (function() {
                if (!Element.prototype.matches) {
                  Element.prototype.matches = Element.prototype.matchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector;
                }
              })()
            
            M.Sidenav.init(document.querySelectorAll('.sidenav'));
            M.Collapsible.init(document.querySelectorAll('.collapsible'));
            M.Modal.init(document.querySelectorAll('.modal'));
            document.querySelector('#type') ? M.textareaAutoResize(document.querySelector('#type')) : false
            M.updateTextFields();
        
            // окраска li по нажатию
            if (document.querySelector('#currentPage')) {
              const currentPage = document.querySelector('#currentPage').dataset.current;
              const pages = Array.from(document.querySelectorAll('.collapsible li'));
              pages.forEach(function (page) {
                  if (page.dataset.page) {
                      if (currentPage === page.dataset.page) {
                          document.querySelector('#home').classList.remove('active');
                          page.classList.add('active');
                          const collapse = M.Collapsible.getInstance(page.closest('.collapsible'));
                          collapse.open();
                      }
                  }
              });
            }
        });        
    }
}