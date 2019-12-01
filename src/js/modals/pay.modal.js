import { Modal } from "../core/modal";

export class PayModal extends Modal {
    constructor (id, open, close) {
        super(id, open, close);
        if (this.open != null) {
            this.open.addEventListener('click', this.openHandler.bind(this));
            this.close.addEventListener('click', this.closeHandler.bind(this));
        }
    }

    closeHandler() {
        this.$el.querySelector('#purchaseInfo').onsubmit = null;
    }

    openHandler(e) {
        if (e.target.id === 'payOpen') {
            const targetInfo = e.target.dataset;
            this.$el.querySelector('.title-field #title').value = targetInfo.title;
           
            this.show();
            this.$el.querySelector('#purchaseInfo').onsubmit = (e) => {
                this.makePay(e, targetInfo);
            }          
        } else {
            this.hide();
        }
    }
    
    makePay(e, info) {
        e.preventDefault();
        
        const payInfo = {
            item: [{
                id: info.id,
                title: info.title
            }],
            totalPrice: parseFloat(info.price)
        }
        payInfo.payMethod = this.$el.querySelector('.payment-field #payment').value;
        payInfo.phone = this.$el.querySelector('.phone-field #phone').value;
        payInfo.email = this.$el.querySelector('.email-field #email').value;

        console.log('Pay info: ', payInfo);
    }
    
}