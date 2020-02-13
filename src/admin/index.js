import { MaterializeConfig } from "./config/materialize.config.js";
import { CategoriesComponent } from "./components/categories.component.js";
import { ItemsComponent } from "./components/items.component.js";
import { LoaderComponent } from "./components/loader.component.js";
import { PaginationComponent } from "./components/pagination.component.js";
import { SearchComponent } from "./components/search.component.js";
import { IconsComponent } from "./components/icons.component.js";
import { ItemEditModal } from "./modals/item-edit.modal.js";
import { ItemDeleteModal } from "./modals/item-delete.modal.js";
import { CategoryEditModal } from "./modals/category-edit.modal";
import { ContentComponent } from "./components/content.component.js";
import { AdministratorComponent } from "./components/administrator.component.js";
import { DashboardComponent } from "./components/dashboard.component.js";
import { BillDataModal } from "./modals/bill-data.modal.js";

// Components
const loader = new LoaderComponent('loader');
const pagination = new PaginationComponent('pagination', {loader}); 
const search = new SearchComponent('search', {loader});
const categories = new CategoriesComponent('categories');
const icons = new IconsComponent('icons');
const items = new ItemsComponent('items', {pagination}, {search});
const dashboards = new DashboardComponent('dashboard', {pagination}, {search});
const content = new ContentComponent('content');
const administrator = new AdministratorComponent('administrator');

// Modals
const itemEdit = new ItemEditModal('editItemModal', 'edit', 'editItemClose', {loader});
const itemDelete = new ItemDeleteModal('deleteItemModal', 'edit', 'deleteItemClose');
const categoryEdit = new CategoryEditModal('editCategoryModal', 'editCategory_select', 'editCategoryClose', {loader});
const billData = new BillDataModal('billDataModal', 'dashboard', 'billDataClose', {loader});

const materialize = new MaterializeConfig();
console.log('Control-Panel v1.0.0');