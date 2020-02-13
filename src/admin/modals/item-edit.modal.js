import { Modal } from "../core/modal";
import { apiService } from "../services/api.service";
import { renderCategories } from "../templates/categories.template";

export class ItemEditModal extends Modal {
    constructor(id, open, close, {loader}) {
        super(id, open, close);
        this.loader = loader
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
        try {
            this.loader.show();
            const id = e.target.parentNode.parentNode.dataset.id,
                item = await apiService.getItemById(id),
                data = await apiService.getDataById(id),
                categories = await apiService.getCategories(),
                category = await apiService.getCategory(item.category);
            item.data = data.data

            this.$category.innerHTML = `<option value='${category[0]._id}' selected>Оставить прежнюю</option>`;
            this.$id.value = item._id;
            this.$title.value = item.title;
            this.$price.value = item.price;
            this.$description.value = item.description;
            this.$category.insertAdjacentHTML('beforeend', renderCategories(categories));
            this.$data.value = item.data;
            M.FormSelect.init(this.$category);
            M.textareaAutoResize(this.$description);
            M.textareaAutoResize(this.$data);
            M.updateTextFields();
            this.loader.hide();
        } catch (error) {
            alert('Произошла ошибка, обновите страницу')
        }
    }
}