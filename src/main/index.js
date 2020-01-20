import { HeaderComponent } from "./components/header.component.js";
import { InformationComponent } from "./components/information.component.js";
import { LoaderComponent } from "./components/loader.component.js";
import { ItemsComponent } from "./components/items.component.js";
import { CategoryComponent } from "./components/category.component.js";
import { BreadcrumbComponent } from "./components/breadcrumb.component.js";
import { FilterComponent } from "./components/filter.component.js";
import { CartModal } from "./modals/cart.modal.js";
import { PayModal } from "./modals/pay.modal.js";
import { NotificationComponent } from "./components/notification.component.js";
import { MaterializeConfig } from "./config/materialize.config.js";
import { OrdersComponent } from "./components/orders.component.js";

// Components
const header = new HeaderComponent('header');
const loader = new LoaderComponent('loader');
const information = new InformationComponent('information');
const notification = new NotificationComponent('notification');
const items = new ItemsComponent('items', {loader}, {notification});
const filter = new FilterComponent('filter', {items});
const category = new CategoryComponent('category', {items}, {filter});
const breadcumb = new BreadcrumbComponent('breadcrumb');
const orders = new OrdersComponent('orders', {notification}, {loader});

// Modals
const cart = new CartModal('cart', 'cartOpen', 'cartClose', {items});
const pay = new PayModal('pay', 'pay-js', 'payClose');

const materialize = new MaterializeConfig();
console.log('Main Page');