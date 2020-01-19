import { Component } from "../core/component";
import axios from "axios";

export class OrdersComponent extends Component {
    constructor(id, {notification}) {
        super(id);
        this.notification = notification;
    }

    init() {
        if (this.$el) {
            let valid = true;
            this.$el.querySelector('form').onsubmit = async (e) => {
                e.preventDefault();
                if (valid) {
                    valid = false;
                    const email = e.target.elements.email.value,
                        request = await axios.post('/my-orders', {email});
                    
                    switch (request.data.status) {
                        case 'OK':
                            this.notification.notificate(`Данные были успешно высланы на почту "${email}".`, '#26A69A', 3500);
                            break;
                        case 'NF':
                            this.notification.notificate(`Покупатель с почтой ${email} не был найден.`, '#f44336', 3500);
                            break;
                        case 'ERR':
                            this.notification.notificate(`Произошла ошибка, попробуйте повторить запрос позже.`, '#f44336', 3500);
                            break;
                        default:
                            break;
                    }
                    setTimeout(() => valid = true, 10000);
                } else {
                    this.notification.notificate(`Подождите еще нескольно секунд прежде чем сделать запрос...`, '#f44336', 3500);
                }
            };
        }
    }
}