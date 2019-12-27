import { Modal } from "../core/modal";
import axios from "axios";

export class deleteItemModal extends Modal {
    constructor(id, open, close) {
        super(id, open, close);
    }

    show(e) {
        if (e.target.id === 'deleteItem') {
            this.$el.classList.remove('hide');
            document.body.style.overflowY = 'hidden';
            this.openHandler(e);
        }
    }

    setElems() {
        this.$content = this.$el.querySelector('.modal-content__form');
    }

    openHandler(e) {
        const data = JSON.parse(e.target.parentNode.parentNode.dataset.info);
        this.$el.querySelector('.delete-item').onclick = this.deleteHandler.bind(this, data.id);
    }

    deleteHandler(id) {
        axios.post('/control-panel/items/delete', {id})
            .then(() => {
                alert('Товар был успешно удален.');
                document.location.reload(true);
            })
            .catch(() => {
                alert('Невозможно выполнить запрос.');
            });
    }
}