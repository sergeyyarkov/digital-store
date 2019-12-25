import { MaterializeConfig } from "./config/materialize.config.js";
import { CategoriesComponent } from "./components/categories.component.js";
import { editCategoryModal } from "./modals/editCategory.modal.js";
import { ItemsComponent } from "./components/items.component.js";
import { LoaderComponent } from "./components/loader.component.js";
import { PaginationComponent } from "./components/pagination.component.js";

const loader = new LoaderComponent('loader');
const pagination = new PaginationComponent('pagination', {loader}); 
const categories = new CategoriesComponent('categories');
const items = new ItemsComponent('items', {pagination});
const editCategory = new editCategoryModal('editCategory', 'edit', 'editCategoryClose');
const materialize = new MaterializeConfig();
console.log('Control-Panel v1.0.0');