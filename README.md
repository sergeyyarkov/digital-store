<p align="center">
  <a href="http://materializecss.com/">
    <img src="https://svgshare.com/i/HWW.svg" width="150">
  </a>
</p>

<h3 align="center">Digital Store</h3>

<p align="center">
  Digital Store - это настраиваемый интернет-магазин на платформе NodeJS для продажи ваших цифровых товаров.<br>
  <a href="https://polar-peak-95205.herokuapp.com/">Демонстрация функционирования интернет-магазина.</a>
  <br>
  <br>
  <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/sergeyyarkov/digital-store/production?color=%2326a69a">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/sergeyyarkov/digital-store">
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/sergeyyarkov/digital-store/total">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/sergeyyarkov/digital-store?color=%23f9a825">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/sergeyyarkov/digital-store"><br>
  <a href="https://david-dm.org/sergeyyarkov/digital-store">
    <img src="https://david-dm.org/sergeyyarkov/digital-store/status.svg" alt="dependencies Status badge">
  </a>
  <a href="https://david-dm.org/sergeyyarkov/digital-store#info=devDependencies">
    <img src="https://david-dm.org/sergeyyarkov/digital-store/dev-status.svg" alt="devDependency Status badge">
  </a>
  <a href="https://github.com/sergeyyarkov/digital-store/blob/master/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/sergeyyarkov/digital-store">
  </a>
</p>

## 🐬 Установка через Docker:

-

### Настройка платежной системы:

В скрипте на данный момент доступна система оплаты через сервис QIWI, чтобы настроить оплату в вашем магазине следуйте следующим шагам:

- Перейдите на сайт [QIWI API](https://qiwi.com/p2p-admin/transfers/api) и создайте пару ключей авторизации. Сохраните секретный ключ.
- Если вы хотите настроить оформление формы приемов перевода, то перейдите [сюда](https://qiwi.com/p2p-admin/transfers/link) и скопируйте значение переменной `themeCode` и вставьте это значение по адресу `config/routes/payments/qiwi.payment.js`.
- Секретный ключ нужно указать в поле переменной среды `QIWI_SECRET_KEY`.
- Редирект после оплаты товара через QIWI на локальный адрес `localhost:3000` работать не будет, необходим домен.

### Настройка почтового сервиса:

Для отдачи данных товара на почту покупателя после покупки товара, нужно настроить nodemailer:

- Настройте почтовый сервис по адресу `config/nodemailer.config.js`:

```javascript
host: "smtp.mail.ru",
port: 465,
secure: true, // true для 465, false для остальных.
```

- Затем укажите переменные среды `EMAIL_LOGIN` и `EMAIL_PASSWORD`.

### Настройка системы комментариев:

В интернет магазине используется система комментариев [Disqus](https://disqus.com/):

- Добавьте свой домен на их сайт и замените embed код по адресу `dist/public/js/disqus.js`.

## Переменные среды:

Перменные среды нужны для работоспособности всего приложения, очень важно вписать верные данные для избежания возможных ошибок.

### Описание переменных:

| Переменная      | Описание                                                 |
| --------------- | -------------------------------------------------------- |
| DATABASE_URI    | Подключение к БД MongoDB                                 |
| DATABASE_NAME   | Имя БД                                                   |
| EMAIL_LOGIN     | Логин от почты для отправки данных покупателю            |
| EMAIL_PASSWORD  | Пароль от почты                                          |
| QIWI_SECRET_KEY | Секретный ключ QIWI для работоспособности системы оплаты |

`.env` файл:

```bash
DATABASE_URI=
DATABASE_NAME=
QIWI_SECRET_KEY=
EMAIL_LOGIN=
EMAIL_PASSWORD=
```

## API:

### API представляет из себя различные URL, которые отвечают данными только в формате JSON. Здесь описаны основные `GET` запросы на сервер для получения данных:

#### Для просмотра всех товаров которые существуют в магазине отправляется запрос:

```bash
https://store-name.com/api/items
```

Ответ:

```javascript
;[
  {
    _id: '5e15dbc415303a1980cd77a0',
    title: 'Тестовый товар №1',
    count: 0,
    price: 1,
    category: 'steam',
    description: '-',
    date: '2020-01-08T13:40:20.353Z',
  },
  {
    _id: '5e15dcb4138c3339bcbc3719',
    title: 'Тестовый товар №2',
    count: 0,
    price: 1,
    category: 'uplay',
    description: '-',
    date: '2020-01-08T13:44:20.940Z',
  },
]
```

### Для просмотра товаров в интересующей категории отправляется запрос:

```bash
https://store-name.com/api/items/{category}
```

Ответ:

```javascript
;[
  {
    _id: '5e15dbc415303a1980cd77a0',
    title: 'Тестовый товар №1',
    count: 0,
    price: 1,
    category: 'steam',
    description: '-',
    date: '2020-01-08T13:40:20.353Z',
  },
  {
    _id: '5e1ccf30d5b894228c86385a',
    title: 'Тестовый товар №2',
    count: 10,
    price: 1,
    category: 'steam',
    description: '-',
    date: '2020-01-13T20:12:32.814Z',
  },
]
```

### Для просмотра информации о всех категориях отправляется запрос:

```bash
https://store-name.com/api/categories
```

Ответ:

```javascript
;[
  {
    _id: '5df64563309e691f2c33d400',
    title: 'uplay',
    img: 'img-1576349954743.svg',
    type: 'type',
    format: 'format',
  },
  {
    _id: '5e04ea023625771abc75fd14',
    title: 'fortnite',
    img: 'img-1576349989720.svg',
    type: 'type',
    format: 'format',
  },
]
```

### Для просмотра информации о интересующей категории отправляется запрос:

```bash
https://store-name.com/api/category/{category}
```

Ответ:

```javascript
;[
  {
    _id: '5df64563309e691f2c33d400',
    title: 'uplay',
    img: 'img-1576349954743.svg',
    type: 'type',
    format: 'format',
  },
]
```

### Для просмотра данных всех товаров отправляется запрос: **Нужна авторизация для администратора.**

```bash
https://store-name.com/api/items/data
```

Ответ:

```javascript
;[
  {
    _id: '5e15dbc415303a1980cd77a0',
    title: 'Тестовый товар №1',
    data: ['login:pass', 'login:pass', 'login:pass'],
  },
  {
    _id: '5e175c63b479600ac493ce88',
    title: 'Тестовый товар №2',
    data: ['login:pass', 'login:pass', 'login:pass'],
  },
]
```

### Для просмотра покупателей отправляется запрос: **Нужна авторизация для администратора.**

```bash
https://store-name.com/api/buyers
```

Ответ:

```javascript
;[
  {
    _id: '5e1c97701b619a31f010062c',
    bill_id: '9244e5ae-560a-432a-9882-bc1b941c8cca',
    email: 'test-email@mail.com',
    method: 'qiwi',
    date: '2020-01-13T18:13:38.623+03:00',
    amount: 2,
    data: ['login:pass', 'login:pass'],
  },
]
```

### Для просмотра списка иконок отправляется запрос: **Нужна авторизация для администратора.**

```bash
https://store-name.com/api/icons
```

Ответ:

```javascript
;[
  'img-1576349954743.svg',
  'img-1576349989720.svg',
  'img-1576420937629.svg',
  'img-1576421960189.svg',
]
```

## Требования:

- Node.js v7.6.0 или выше

## Лицензия:

[MIT](https://github.com/sergeyyarkov/digital-store/blob/master/LICENSE)<br><br>
