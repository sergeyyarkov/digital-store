import { Modal } from "../core/modal";

export class BillDataModal extends Modal {
    constructor(id, open, close) {
        super(id, open, close);
    }

    show(e) {
        if (e.target.id === 'billDataOpen') {
            this.$el.classList.remove('hide');
            document.body.style.overflowY = 'hidden';
            this.openHandler(e);
        }
    }

    setElems() {
        this.$bill_id = this.$el.querySelector('#bill_id');
        this.$email = this.$el.querySelector('#email');
        this.$method = this.$el.querySelector('#method');
        this.$date = this.$el.querySelector('#date');
        this.$amount = this.$el.querySelector('#amount');
        this.$data = this.$el.querySelector('#data');
    }

    openHandler(e) {
        const data = JSON.parse(e.target.parentNode.parentNode.dataset.info);
        this.$bill_id.value = data.bill_id;
        this.$email.value = data.email;
        this.$method.value = data.method;
        this.$date.value = data.date;
        this.$amount.value = data.amount;
        this.$data.textContent = data.data.split(',').join('\n');

        M.textareaAutoResize(this.$data);
        M.updateTextFields();
    }
}