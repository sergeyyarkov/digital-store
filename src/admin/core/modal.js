export class Modal {
    constructor(id, open, close) {
        this.$el = document.getElementById(id);
        this.open = document.getElementById(open);
        this.close = document.getElementById(close);   
        this.init();
    }

    init() {
        if (this.open) {
            this.setElems();
            this.open.addEventListener('click', this.show.bind(this));
            this.close.addEventListener('click', this.hide.bind(this));  
        }
    }

    show(e) {
        this.$el.classList.remove('hide');
        document.body.style.overflowY = 'hidden';
        this.openHandler(e); 
    }

    hide() {
        this.$el.classList.add('hide');
        document.body.style.overflowY = '';
    }

    openHandler() {}

    setElems() {}
}
