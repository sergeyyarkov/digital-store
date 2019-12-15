export class Modal {
    constructor(id, open, close) {
        this.$el = document.getElementById(id);
        this.open = document.getElementById(open);
        this.close = document.getElementById(close);
        this.open ? this.close.addEventListener('click', this.hide.bind(this)) : false;  
       
        this.init();
    }

    init() {}

    show() {
        this.$el.classList.remove('hide');
        document.body.style.overflowY = 'hidden';
    }

    hide() {
        this.$el.classList.add('hide');
        document.body.style.overflowY = '';
    }
}
