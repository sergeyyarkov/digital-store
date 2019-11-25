import { HeaderComponent } from "./components/header.component.js";
import { InformationComponent } from "./components/information.component.js";
import { LoaderComponent } from "./components/loader.component.js";
import { ItemsComponent } from "./components/items.component.js";
import { CategoryComponent } from "./components/category.component.js";
import { BreadcrumbComponent } from "./components/breadcrumb.component.js";
import { FilterComponent } from "./components/filter.component.js";
import { CartModal } from "./modals/cart.modal.js";


const header = new HeaderComponent('header');
const loader = new LoaderComponent('loader');
const information = new InformationComponent('information');
const items = new ItemsComponent('items', {loader});
const filter = new FilterComponent('filter', {items});
const category = new CategoryComponent('category', {items}, {filter});
const breadcumb = new BreadcrumbComponent('breadcrumb');
const cart = new CartModal('cart', 'cartOpen', 'cartClose', {items});

