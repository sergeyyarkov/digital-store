import { Modal } from "../core/modal";
import { insertCount } from "../other/counter";
import axios from "axios";

export class CartModal extends Modal {
    constructor(id, open, close, {items}) {
        super(id, open, close);
        this.items = items;
        if (this.$el) {
            this.open.addEventListener('click', this.openHandler.bind(this));
            this.close.addEventListener('click', this.closeHandler.bind(this));
            this.list = this.$el.querySelector('#modalList');   
        }
    }

    closeHandler() {
        this.removeItem = null;
        this.makePay = null;
    }

    openHandler() {
        this.removeItem != null ? this.list.addEventListener('click', this.removeItem.bind(this)) : false
        this.makePay != null ? this.$el.querySelector('form').addEventListener('submit', this.makePay.bind(this)) : false;
        this.list.innerHTML = ''; 
        this.insertItems(this.list);
    }

    insertItems(list) {
        if (localStorage.getItem('cart')) {
            const items = JSON.parse(localStorage.getItem('cart'));

            if (items.length == 0) {
                list.innerHTML = '<p style="text-align:center;padding:15px;">Вы не добавили ни один товар</p>';
                this.$el.querySelector('form').classList.add('hide');
            } else {
                this.$el.querySelector('form').classList.remove('hide');
            }
        
            items.forEach(item => this.list.innerHTML += `<div data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-count="1" class="modal-content__item"><div class="modal-content__title"><a href="/product/${item.id}"><b>${item.title}</b></a><br><span class="in-stock">В наличии: ${item.count} (шт)</span></div><div class="modal-content__right"><span id="price">${parseFloat(item.price).toFixed(2)}₽</span></div><div class="modal-content__remove"><span><i data-id="${item.id}" class="material-icons" id="removeItem">close</i></span></div></div>`);
            insertCount('modalCounter', this.items.cart);
            insertCount('counter', this.items.cart);
            this.insertTotalPrice('totalPrice', this.items.cart);
        } else {
            list.innerHTML = '<p style="text-align:center;padding:15px;">Вы не добавили ни один товар</p>';
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
            this.defaultBtnColor(id);
        }
    }

    insertTotalPrice(id, array) {
        let totalPrice = 0;
        array.forEach(item => totalPrice += parseFloat(item.price));
        this.$el.querySelector(`#${id}`).innerHTML = `${totalPrice.toFixed(2)}₽`;
    }

    async makePay(e) {
        e.preventDefault();
        const payInfo = {items: this.items.cart.map(item => {
            return {
                    id: item.id, 
                    title: item.title, 
                    price: parseFloat(item.price)
                } 
        })};
        let totalPrice = 0;
        payInfo.items.forEach(item => totalPrice += parseFloat(item.price));
        payInfo.totalPrice = Math.round(totalPrice * 100) / 100;
        payInfo.payMethod = this.$el.querySelector('.payment-field input').value;
        payInfo.email = this.$el.querySelector('.email-field input').value;

        const response = await axios.put('/payment', payInfo);
        response.data.payUrl ? document.location.href = response.data.payUrl : alert(response.data);
    }

    defaultBtnColor(id) {
        if (this.items.roster) {
            if (this.items.roster.querySelector(`#rosterButtons[data-id="${id}"] #addItem`)) {
                this.items.roster.querySelector(`#rosterButtons[data-id="${id}"] #addItem`).classList.remove('orange');
                this.items.roster.querySelector(`#rosterButtons[data-id="${id}"] #addItem i`).innerHTML = 'shopping_cart';
            }
        }
    }
}
