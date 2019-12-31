import { Modal } from "../core/modal";
import { apiService } from "../services/api.service";
import { renderCategories } from "../templates/categories.template";

export class ItemEditModal extends Modal {
    constructor(id, open, close) {
        super(id, open, close);
    }

    show(e) {
        if (e.target.id === 'editItem') {
            this.$el.classList.remove('hide');
            document.body.style.overflowY = 'hidden';
            this.openHandler(e);
        }
    }

    setElems() {
        this.$id = this.$el.querySelector('.id');
        this.$title = this.$el.querySelector('.title');
        this.$price = this.$el.querySelector('.price');
        this.$description = this.$el.querySelector('.description');
        this.$category = this.$el.querySelector('.category');
        this.$data = this.$el.querySelector('.data');
    }

    async openHandler(e) {
          const data = JSON.parse(e.target.parentNode.parentNode.dataset.info),
            categories = await apiService.getCategories();

            this.$category.innerHTML = `<option value='{"title": "${data.category}"}' selected>Оставить прежнюю</option>`;
            this.$id.value = data.id;
            this.$title.value = data.title;
            this.$price.value = data.price;
            this.$description.value = data.description;
            this.$category.insertAdjacentHTML('beforeend', renderCategories(categories));
            this.$data.value = data.data;
            M.FormSelect.init(this.$category);
            M.textareaAutoResize(this.$description);
            M.textareaAutoResize(this.$data);
            M.updateTextFields();  
    }
}