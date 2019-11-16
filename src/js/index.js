import { HeaderComponent } from "./components/header.component.js";
import { InformationComponent } from "./components/information.component.js";
import { CartComponent } from "./components/cart.component.js";
import { LoaderComponent } from "./components/loader.component.js";
import { ItemsComponent } from "./components/items.component.js";

const header = new HeaderComponent('header');
const loader = new LoaderComponent('loader');
const information = new InformationComponent('information');
const cart = new CartComponent('cart');
const items = new ItemsComponent('items', {loader});