import { MaterializeConfig } from "./config/materialize.config.js";
import { CategoriesComponent } from "./components/categories.component.js";
import { editCategoryModal } from "./modals/editCategory.modal.js";
import { ItemsComponent } from "./components/items.component.js";
import { LoaderComponent } from "./components/loader.component.js";
import { PaginationComponent } from "./components/pagination.component.js";
import { editItemModal } from "./modals/editItem.modal.js";
import { deleteItemModal } from "./modals/deleteItem.modal.js";
import { SearchComponent } from "./components/search.component.js";

const loader = new LoaderComponent('loader');
const pagination = new PaginationComponent('pagination', {loader}); 
const search = new SearchComponent('search', {loader});
const categories = new CategoriesComponent('categories');
const items = new ItemsComponent('items', {pagination}, {search});

const editCategory = new editCategoryModal('editCategoryModal', 'editCategory_select', 'editCategoryClose');
const editItem = new editItemModal('editItemModal', 'edit', 'editItemClose');
const deleteItem = new deleteItemModal('deleteItemModal', 'edit', 'deleteItemClose');
const materialize = new MaterializeConfig();
console.log('Control-Panel v1.0.0');