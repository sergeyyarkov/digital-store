export class Modal {
    constructor(id, open, close) {
        this.$el = document.getElementById(id);
        this.open = document.getElementById(open);
        this.close = document.getElementById(close);
        this.init();
    }

    onShow() {}

    init() {
        this.open.addEventListener('click', openHandler.bind(this));
        this.close.addEventListener('click', closeHandler.bind(this));
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

function openHandler(e) {
    this.show();
    this.onShow(e);
}

function closeHandler() {
    this.hide();
}