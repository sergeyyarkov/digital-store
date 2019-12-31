import { Modal } from "../core/modal";
import axios from "axios";

export class ItemDeleteModal extends Modal {
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
        this.$content = this.$el.querySelector('.modal-content__form p');
        this.$button = this.$el.querySelector('.delete-item');
    }

    openHandler(e) {
        const data = JSON.parse(e.target.parentNode.parentNode.dataset.info);
        this.$content.innerHTML = `Вы действительно хотите удалить товар "${data.title}"? Находящиеся в нем аккаунты будут удалены.`;
        this.$button.onclick = this.deleteHandler.bind(this, data.id);
    }

    async deleteHandler(id) {
        try {
            this.$button.classList.add('hide');
            this.$content.innerHTML = '<div class="progress"><div class="indeterminate"></div></div>'
            await axios.post('/control-panel/items/delete', {id});
            alert('Товар был успешно удален.');
            document.location.reload(true);
        } catch (error) {
            alert('Невозможно выполнить запрос.');
        }
    }
}