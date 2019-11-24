import { Modal } from "../core/modal";
import { insertCount } from "../other/counter";
import { defaultBtnColor } from "../other/defaultColorBtn";

export class CartModal extends Modal {
    constructor(id, open, close, {items}) {
        super(id, open, close);
        this.items = items;
        this.open.addEventListener('click', this.openHandler.bind(this));
        this.close.addEventListener('click', this.closeHandler.bind(this));
        this.list = this.$el.querySelector('#modalList');
    }

    closeHandler() {
        this.removeItem = null;
    }

    openHandler() {
        this.removeItem != null ? this.list.addEventListener('click', this.removeItem.bind(this)) : false
        this.list.innerHTML = ''; 
        this.insertItems(this.list);
    }

    insertItems(list) {
        if (localStorage.getItem('cart')) {
            const items = JSON.parse(localStorage.getItem('cart'));

            if (items.length == 0) {
                list.innerHTML = '<p style="text-align:center;padding:15px;">Вы не добавили ни один товар</p>';
                this.$el.querySelector('#makePay').classList.add('hide');
            } else {
                this.$el.querySelector('#makePay').classList.remove('hide');
            }
        
            items.forEach(item => this.list.innerHTML += `<div data-id="${item.id}" class="modal-content__item"><div class="modal-content__title"><a href="#"><b>${item.title}</b></a><br><span class="in-stock">В наличии: ${item.count} (шт)</span></div><div class="modal-content__right"><button>-</button><input type="number" value="1" min="1" max="${item.count}"><button>+</button><span>${parseFloat(item.price).toFixed(2)}₽</span></div><div class="modal-content__remove"><span><i data-id="${item.id}" class="material-icons" id="removeItem">close</i></span></div></div>`);
            insertCount('modalCounter', this.items.cart);
            insertCount('counter', this.items.cart);
            this.insertTotalPrice('totalPrice', this.items.cart);
        }
    }

    removeItem(e) {
        if (e.target.id === 'removeItem') {
            const id = e.target.dataset.id;
            let index;

            this.items.cart.forEach((item, i) => item.id === id ? index = i : false);
            this.items.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.items.cart));

            this.list.innerHTML = '';
            this.insertItems(this.list);
            defaultBtnColor(id, this.items.$el);
        }
    }

    insertTotalPrice(id, array) {
        let totalPrice = 0;
        array.forEach(item => totalPrice += parseFloat(item.price));
        this.$el.querySelector(`#${id}`).innerHTML = `${totalPrice.toFixed(2)}₽`;
    }
}