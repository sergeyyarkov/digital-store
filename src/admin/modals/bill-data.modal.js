import { Modal } from "../core/modal";
import { apiService } from "../services/api.service";

export class BillDataModal extends Modal {
    constructor(id, open, close, {loader}) {
        super(id, open, close);
        this.loader = loader
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

    async openHandler(e) {
        try {
            this.loader.show();
            const buyer = await apiService.getBuyerById(e.target.parentNode.parentNode.dataset.id)

            this.$bill_id.value = buyer.bill_id;
            this.$email.value = buyer.email;
            this.$method.value = buyer.method[0].toUpperCase() + buyer.method.slice(1);
            this.$date.value = buyer.date;
            this.$amount.value = buyer.amount;
            this.$data.textContent = buyer.data.join('\n');

            M.textareaAutoResize(this.$data);
            M.updateTextFields();
            this.loader.hide();
        } catch (error) {
            alert('Произошла ошибка, обновите страницу')
        }
    }
}