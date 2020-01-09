import { Modal } from "../core/modal";
import axios from "axios";

export class PayModal extends Modal {
    constructor (id, open, close) {
        super(id, open, close);
        if (this.open != null) {
            this.open.addEventListener('click', this.openHandler.bind(this));
            this.close.addEventListener('click', this.closeHandler.bind(this));
        }
    }

    closeHandler() {
        this.$el.querySelector('form').onsubmit = null;
    }

    openHandler(e) {
        if (e.target.id === 'payOpen') {
            const targetInfo = e.target.parentNode.dataset;
            this.$el.querySelector('.title-field input').value = targetInfo.title;
           
            this.show();
            this.$el.querySelector('form').onsubmit = (e) => {
                this.makePay(e, targetInfo);
            }          
        } else {
            this.hide();
        }
    }
    
    async makePay(e, info) {
        e.preventDefault();
        
        const payInfo = {
            items: [{
                id: info.id,
                title: info.title
            }],
            totalPrice: parseFloat(info.price)
        }
        payInfo.payMethod = this.$el.querySelector('.payment-field input').value;
        payInfo.email = this.$el.querySelector('.email-field input').value;

        const response = await axios.put('/payment', payInfo);
        response.data.payUrl ? document.location.href = response.data.payUrl : alert(response.data);
    }
}