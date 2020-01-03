import { Component } from '../core/component';
import axios from 'axios';


export class AdministratorComponent extends Component {
    constructor(id) {
        super(id);
    }

    setElems() {
        this.$el.querySelector('form').addEventListener('submit', this.request.bind(this));
    }

    async request(e) {
        e.preventDefault();
        try {
            const data = {
                id: e.target.elements.id.value,
                name: e.target.elements.name.value,
                email: e.target.elements.email.value,
                oldPass: e.target.elements.oldPass.value,
                newPass: e.target.elements.newPass.value
            }
            const response = await axios.post('/control-panel/administrators/update', data); 
            alert(response.data);
            document.location.reload(true);
        } catch (error) {
            alert('Невозможно выполнить запрос.');
        }
    }
}