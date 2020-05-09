import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { insertCount } from '../other/counter'
import { renderItems } from '../templates/items.template'

export class ItemsComponent extends Component {
  constructor(id, { loader }, { notification }) {
    super(id)
    this.loader = loader
    this.notification = notification
    this.$el ? (this.roster = this.$el.querySelector('#roster')) : false
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'))
    } else {
      this.cart = []
    }
  }

  async init() {
    if (this.$el) {
      localStorage.setItem('sortByAll', 'true') // установка значения для компонента Filter
      this.$el.addEventListener('click', addItem.bind(this))
      if (!localStorage.getItem('category')) {
        // Получаем все товары и выводим их если нету ключа category в ls
        const fData = await apiService.getItems()
        const categories = await apiService.getCategories()
        const html = renderItems(categories, fData)
        this.insertItems(html)
        this.btnColor()
        this.loader.hide()
      }
    }
  }

  onHide() {
    this.$el.querySelector('#roster').innerHTML = ''
    this.loader.hide()
  }

  onShow() {
    this.$el.querySelector('#roster').innerHTML = ''
    this.loader.show()
  }

  btnColor() {
    if (localStorage.getItem('cart')) {
      // Окраска кнопок айтемов которые находятся в корзине
      const obj = JSON.parse(localStorage.getItem('cart'))

      obj.forEach((item) => {
        if (
          this.$el.querySelector(
            `#rosterButtons[data-id="${item.id}"] #addItem`
          )
        ) {
          this.$el
            .querySelector(`#rosterButtons[data-id="${item.id}"] #addItem`)
            .classList.add('orange')
          this.$el.querySelector(
            `#rosterButtons[data-id="${item.id}"] #addItem i`
          ).innerHTML = 'close'
        }
      })
    }
  }

  insertItems(html) {
    this.roster.insertAdjacentHTML('afterbegin', html)
    this.btnColor()
  }
}

function addItem(e) {
  if (e.target.localName === 'button' && e.target.id === 'addItem') {
    const target = e.target
    const item = {
      id: e.target.parentNode.dataset.id,
      title: e.target.parentNode.dataset.title,
      count: e.target.parentNode.dataset.count,
      price: e.target.parentNode.dataset.price,
    }
    renderObj(item, this, target)
  }
}

function renderObj(obj, context, target) {
  if (context.cart.length > 0) {
    let insterted = false
    let index
    // Проверка на существующий айтем в корзине
    context.cart.forEach((item, i) => {
      if (item.id === obj.id) {
        insterted = true
        index = i
      }
    })
    if (insterted === false) {
      context.cart.push(obj)
      localStorage.setItem('cart', JSON.stringify(context.cart))
      target.classList.add('orange')
      target.querySelector('i').innerHTML = 'close'
      insertCount('counter', context.cart)
      window.M.toast({ html: 'Товар был успешно добавлен в корзину.' })
    } else {
      context.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(context.cart))
      target.classList.remove('orange')
      target.querySelector('i').innerHTML = 'shopping_cart'
      insertCount('counter', context.cart)
    }
  } else {
    context.cart.push(obj)
    localStorage.setItem('cart', JSON.stringify(context.cart))
    target.classList.add('orange')
    target.querySelector('i').innerHTML = 'close'
    insertCount('counter', context.cart)
    window.M.toast({ html: 'Товар был успешно добавлен в корзину.' })
  }
}
