export class Modal {
    constructor(id, open, close) {
        this.$el = document.getElementById(id);
        this.open = document.getElementById(open);
        this.close = document.getElementById(close);   
        this.init();
    }

    init() {
        if (this.open) {
            this.open.addEventListener('click', this.show.bind(this));
            this.close.addEventListener('click', this.hide.bind(this));  
        }
    }

    show() {
        this.$el.classList.remove('hide');
        document.body.style.overflowY = 'hidden';
    }

    hide() {
        this.$el.classList.add('hide');
        document.body.style.overflowY = '';
    }
}
