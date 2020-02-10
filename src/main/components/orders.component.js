import { Component } from "../core/component";
import axios from "axios";

export class OrdersComponent extends Component {
    constructor(id, {notification}, {loader}) {
        super(id);
        this.notification = notification;
        this.loader = loader;
    }

    init() {
        if (this.$el) {
            let valid = true;
            this.$el.querySelector('form').onsubmit = async (e) => {
                e.preventDefault();
                if (valid) {
                    valid = false;
                    this.loader.show();
                    const email = e.target.elements.email.value,
                        request = await axios.post('/my-orders', {email});
                    
                    switch (request.data.status) {
                        case 'OK':
                            window.M.toast({html: `Данные были успешно высланы на почту "${email}".`})
                            break;
                        case 'NF':
                            window.M.toast({html: `Покупатель с почтой "${email}" не был найден.`})
                            break;
                        case 'ERR':
                            window.M.toast({html: `Произошла ошибка, попробуйте повторить запрос позже.`})
                            break;
                        default:
                            break;
                    }
                    this.loader.hide();
                    setTimeout(() => valid = true, 10000);
                } else {
                    window.M.toast({html: `Подождите еще нескольно секунд прежде чем сделать запрос...`})
                }
            };
        }
    }
}