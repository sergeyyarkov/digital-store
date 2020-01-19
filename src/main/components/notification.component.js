import { Component } from "../core/component";

export class NotificationComponent extends Component {
    constructor(id) {
        super(id);
    }

    notificate(text, color, delay) {
        const card = document.createElement('div');
        card.classList.add('card-panel');
        card.style.backgroundColor = color;
        card.innerHTML = `<span class="white-text">${text}</span>`;
        this.$el.innerHTML += card.outerHTML;
        this.removeNotificate(delay);  
    }

    removeNotificate(delay) {
        // Полифилл для IE ^9
        (function() {
            var arr = [window.Element, window.CharacterData, window.DocumentType];
            var args = [];
          
            arr.forEach(function (item) {
              if (item) {
                args.push(item.prototype);
              }
            });
          
            (function (arr) {
              arr.forEach(function (item) {
                if (item.hasOwnProperty('remove')) {
                  return;
                }
                Object.defineProperty(item, 'remove', {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: function remove() {
                    this.parentNode.removeChild(this);
                  }
                });
              });
            })(args);
          })();

        setTimeout(() => {
            this.$el.querySelector('.card-panel').remove();
        }, delay || 2000);
    }
}