import { MaterializeConfig } from "./config/materialize.config.js";
import { CategoriesComponent } from "./components/categories.component.js";
import { editCategoryModal } from "./modals/editCategory.modal.js";

const categories = new CategoriesComponent('categories');
const editCategory = new editCategoryModal('editCategory', 'edit', 'editCategoryClose');
const materialize = new MaterializeConfig();
console.log('Control-Panel v1.0.0');