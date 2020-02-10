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

## Содержание
- [О проекте](#О-проекте)
- [Структура репозитория](#Структура-репозитория)
- [Установка и настройка скрипта](#Установка-и-настройка-скрипта)
- [Запуск скрипта на локальном компьютере](#Запуск-скрипта-на-локальном-компьютере)
- [Запуск скрипта на удаленном сервере](#Запуск-скрипта-на-удаленном-сервере)
- [Выгрузка скрипта на бесплтаный хостинг от Heroku](#Выгрузка-скрипта-на-бесплтаный-хостинг-от-Heroku)
- [Переменные среды](#Переменные-среды)
- [API](#API)
- [Требования](#Требования)
- [Лицензия](#Лицензия)

## О проекте:
Этот проект представляет из себя интернет-магазин на платформе NodeJS, Вы можете продавать свои цифровые товары именно загрузив этот репозиторий, в [панели управления](#Панель-управления) Вы сможете создавать, удалять и редактировать товары или категории . В проекте используется концепция REST API, поэтому для отдачи информации клиенту существует отдельный API. Информация о покупателях, товарах, категориях и т.д хранится в БД MongoDB (используется нативный драйвер).
### Функционал покупателя:
- Возможность выбирать интересующие категории, переход по одиночным страницам конкретного товара.
- Возможность комментировать как отдельный товар, так и весь магазин на отдельной странице с помощью системы комментариев Disqus. 
- Возможность фильтровать интересующую категорию или все товары через фильтр.
- Покупатель может совершать одну или несколько покупок через корзину или кнопку "Купить".
- Оплата осуществляется через сервис QIWI API.
- Результатом оплаты будут данные одного или нескольких товаров, все данные отсылаются на электронную почту покупателя, которую он указал при создании заказа.
- Покупатель может узнать все свои совершенные покупки в магазине на отдельной странице.
### Функционал администратора:
Для входа в админ-панель необходимо дописать в адресной строке `/admin`, после Вы попадете на страницу авторизации где нужно ввести данные в формате `email:password`. По умолчанию `admin@support.ru:admin`
- Пароль админа хэшируется через `bcrypt` для безопасности и записывается в БД.
- На главной странице есть небольшая статистика, где можно посмотреть: сумму проданных товаров, кол-во проданных товаров, кол-во товаров в наличии.
- На главной странце так же можно узнать подробные данные о покупателях: номер заказа, почта покупателя, способ оплаты, дата покупки, сумма и данные которые были высланы по почте.
- Возможность находить конкретного покупателя через поле (нужно знать номер заказа).
- Возможность добавлять, удалять или редактировать товары на странице "Товары", так же можно посмотреть и информацию о товаре.
- Поиск товаров через поле поиска (нужно знать частичное или полное название товара).
- Добавление, удаление и редактирование категорий через страницу "Категории", каждой категории присваивается собственная иконка, которую можно загрузить через страницу "Иконки".
- Возможность править контент, изменять общее оформление магазина (только цвет).
- Возможность изменять данные администратора: почта, пароль, имя.

## Структура репозитория:
В основе всего репозитория существуют две ветки. Ветка master предназначена для разработки приложения, для выгрузки готового приложения на сервер используйте ветку production.

## Установка и настройка скрипта:

### Запуск скрипта на локальном компьютере:
- [Установите последний релиз Digital Store](https://github.com/sergeyyarkov/digital-store/releases) из GitHub репозитория.
- Или клонировать репозиторий `git clone https://github.com/sergeyyarkov/digital-store.git -b production`.
- Установите [Node.js](https://nodejs.org/ru/) не ниже версии 7.6.0, в процессе установки Node.js установите Node Package Manager.
- Установите БД MongoDB на ваш компьютер или создайте кластер на сайте [www.mongodb.com](https://www.mongodb.com/) и импортируйте туда дамп структуры БД, которые находится в корне приложения `/database_dump`.
- Для работоспособности интернет-магазина необходимо установить зависимости. Выполните комманду `npm i`.
- Далле необходимо настроить переменные среды. Создайте файл `.env` в корне вашего интернет-магазина и запишите туда [значения для переменных](#Переменные-среды). Обратите внимание, что для выгрузки скрипта на production сервер, нужно устанавливать переменные среды для вашего сервера, файл `.env` создавать не нужно.
- После этого, введите `npm run start` и перейдите по адресу `localhost:3000`, вы увидите уже рабочий интернет-магазин который запущен у вас на локальном компьютере.

### Запуск скрипта на удаленном сервере:
В данном примере на удаленном сервере будет использоваться связка `Ubuntu 18.04, Nginx, MongoDB, PM2, NodeJS` + `SSL Lets Encrypt`

- Переходим на сайт [RUVDS.COM](https://ruvds.com/pr4435) и приобретаем услугу VPS-хостинга.
- Подключаемся к серверу по SSH и следуем далее описанным шагам.
- Устанавливаем NodeJS:

```bash
apt-get update && apt-get install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
source ~/.bashrc
nvm install 12
```
Если при выполнении команд `node -v` и `npm -v` выдается версия, то идем дальше.
- Создаем папку `/apps`, после переходим в нее и клонируем проект с github и переходим в наш магазин:

```bash
mkdir apps

cd apps/

git clone https://github.com/sergeyyarkov/digital-store.git -b production

cd digital-store/
```
- Устанавливаем зависимости для интернет-магазина `npm install`.
- Устанавливаем MongoDB:

```bash
apt install -y mongodb

systemctl status mongodb <--- проверяем состояние службы, должно быть active (running)
```
Теперь нужно дать доступ для подключения к БД именно с вашего компьютера, это нам понадобится для импортирования дампа БД:
ip адресс берете с сайта 2ip

```bash
ufw enable

ufw allow from ваш_ip_адресс_компьютера/32 to any port 27017   
```
- Далее открываем конфигурационный файл MongoDB: `nano /etc/mongodb.conf`:
Добавляем IP-адрес вашего сервера в значение bindIP:

```bash
logappend=true

bind_ip = 127.0.0.1,your_server_ip
#port = 27017
```

- Сохраните файл, закройте редактор и перезапустите MongoDB: `systemctl restart mongodb`:
- Теперь доступ к БД есть только у вашего компьютера, далее скачиваем [Studio 3T](https://studio3t.com/) и создаем новое соединение, ip адресс указываем вашего сервера.
- После подключения, создаем новую БД и называем её как хотим.
- Кликаем по вашей созданной БД и вверху нажимаем `Import`, после выбираем все JSON файлы, которые хранятся в папке `/database_dump`.
- Если все 6 коллекций успешно импортировались, то идем дальше.
- Устанавливаем менеджер процессов PM2 `npm install -g pm2`.
- Редактируем файл с переменными в файле ecosystem.config.js и устанавливаем свои значения `nano ecosystem.config.js`.
- Далее запускаем наше приложение:

```bash
pm2 start ecosystem.config.js --env production <--- стартуем наше приложение

pm2 status <--- как узнать статус запущенных процессов

pm2 save <--- сохраняем процесс

pm2 startup ubuntu <--- автоматически запускаем наше приложение в случае рестарта сервера
```

- Настраиваем файрволл:

```bash
ufw allow ssh

ufw allow http

ufw allow https
```

- Далее устанавливаем веб-сервер nginx `apt install nginx`, после редактируем конфигурационный файл `nano /etc/nginx/sites-available/default`:

```bash
server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000; #порт запущенного приложения
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

- Обязательно настройте gzip сжатие, ваш сайт будет работать быстрее:

```bash
server {
  gzip on;
  gzip_disable "msie6";
  gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript;
}
```

- Так же желательно избавиться от дубля страницы www:

```bash
if ($host = 'www.example.com') {
  return 301 https://example.com$request_uri;
}
```

- После настройки проверьте ваш конфигурационный файл на ошибки `nginx -t`, если ошибок нет, то перезапускаем сервис nginx `service nginx restart`.
- На сайте RUDVS добавьте свой домен и привяжите его к своему серверу, настройте DNS записи у регистратора. Через какое то время ваш магазин будет доступен по домену.
- Далее настройте SSL сертификат: 

```bash
add-apt-repository ppa:certbot/certbot

apt-get update

apt-get install python-certbot-nginx

certbot --nginx -d yourdomain.com <--- в процессе установки выбираем цифру 2
```

- Ваш конфигурационный файл должен выглядеть примерно так:

```bash
server {

  gzip on;
  gzip_disable "msie6";
  gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript;
  
	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name yourdomain.ru www.yourdomain.ru;

	location / {
		  proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
	}

  if ($host = 'www.yourdomain.ru') {
      return 301 https://yourdomain.ru$request_uri;
  }

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/yourdomain.ru/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.ru/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
  if ($host = www.yourdomain.ru) {
    return 301 https://$host$request_uri;
  } # managed by Certbot


  if ($host = yourdomain.ru) {
    return 301 https://$host$request_uri;
  } # managed by Certbot

	listen 80 default_server;
	listen [::]:80 default_server;

	server_name yourdomain.ru www.yourdomain.ru;
    return 404; # managed by Certbot
}

```

### Установка скрипта на бесплатный хостинг от Heroku:
- Регистрируемся на сайте [Heroku](https://signup.heroku.com/login).
- Устанавливаем heroku-cli `https://devcenter.heroku.com/articles/heroku-cli`.
- Проверьте установку, написав в консоле `heroku --help` если всё выводит, идем дальше.
- Залогиньтесь: `heroku login`.
- Создайте новый проект Herkou: `heroku create`.
- Создайте кластер на сайте [www.mongodb.com](https://www.mongodb.com/) и импортируйте туда дамп структуры БД, который находится в корне приложения `/database_dump`. При подключении к БД выберите метод `Connect Your Application`
- Переходим на сайт heroku, идем в свое созданное приложение и открываем вкладку `Settings -> Config Vars` кнопка `Reveal Config Vars` и настраиваем [переменные среды](#Переменные-среды).
- Создаем папку с любым названием, открываем её и клонируем проект с github: `git clone https://github.com/sergeyyarkov/digital-store.git -b production .`
- Сменим ветку на master: `git checkout -b master`
- Удаляем файл ecosystem.config.js (в случае с heroku он не нужен т.к переменные мы храним у heroku)
- Добавляем удаленный репозиторий `heroku git:remote -a название вашего приложения`.
- Деплой: 
```bash
git add .
git commit -m "make it better"
git push heroku master
```

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
[
  {
    _id: "5e15dbc415303a1980cd77a0",
    title: "Тестовый товар №1",
    count: 0,
    price: 1,
    category: "steam",
    description: "-",
    date: "2020-01-08T13:40:20.353Z"
  },
  {
    _id: "5e15dcb4138c3339bcbc3719",
    title: "Тестовый товар №2",
    count: 0,
    price: 1,
    category: "uplay",
    description: "-",
    date: "2020-01-08T13:44:20.940Z"
  },
]
```

### Для просмотра товаров в интересующей категории отправляется запрос:
```bash
https://store-name.com/api/items/{category}
```
Ответ:
```javascript
[
  {
    _id: "5e15dbc415303a1980cd77a0",
    title: "Тестовый товар №1",
    count: 0,
    price: 1,
    category: "steam",
    description: "-",
    date: "2020-01-08T13:40:20.353Z"
  },
  {
    _id: "5e1ccf30d5b894228c86385a",
    title: "Тестовый товар №2",
    count: 10,
    price: 1,
    category: "steam",
    description: "-",
    date: "2020-01-13T20:12:32.814Z"
  }
]
```

### Для просмотра информации о всех категориях отправляется запрос:
```bash
https://store-name.com/api/categories
```
Ответ:
```javascript
[
  {
    _id: "5df64563309e691f2c33d400",
    title: "uplay",
    img: "img-1576349954743.svg",
    type: "type",
    format: "format"
  },
  {
    _id: "5e04ea023625771abc75fd14",
    title: "fortnite",
    img: "img-1576349989720.svg",
    type: "type",
    format: "format"
  },
]
```

### Для просмотра информации о интересующей категории отправляется запрос:
```bash
https://store-name.com/api/category/{category}
```
Ответ:
```javascript
[
  {
    _id: "5df64563309e691f2c33d400",
    title: "uplay",
    img: "img-1576349954743.svg",
    type: "type",
    format: "format"
  }
]
```

### Для просмотра данных всех товаров отправляется запрос: **Нужна авторизация для администратора.**
```bash
https://store-name.com/api/items/data
```
Ответ:
```javascript
[
  {
    _id: "5e15dbc415303a1980cd77a0",
    title: "Тестовый товар №1",
    data: ["login:pass", "login:pass", "login:pass"]
  },
  {
    _id: "5e175c63b479600ac493ce88",
    title: "Тестовый товар №2",
    data: ["login:pass", "login:pass", "login:pass"]
  }
]
```

### Для просмотра покупателей отправляется запрос: **Нужна авторизация для администратора.**
```bash
https://store-name.com/api/buyers
```
Ответ:
```javascript
[
  {
    _id: "5e1c97701b619a31f010062c",
    bill_id: "9244e5ae-560a-432a-9882-bc1b941c8cca",
    email: "test-email@mail.com",
    method: "qiwi",
    date: "2020-01-13T18:13:38.623+03:00",
    amount: 2,
    data: ["login:pass", "login:pass"]
  }
]
```

### Для просмотра списка иконок отправляется запрос: **Нужна авторизация для администратора.**
```bash
https://store-name.com/api/icons
```
Ответ:
```javascript
[
  "img-1576349954743.svg",
  "img-1576349989720.svg",
  "img-1576420937629.svg",
  "img-1576421960189.svg"
]
```

## Требования:
- Node.js v7.6.0 или выше

## Лицензия:
[MIT](https://github.com/sergeyyarkov/digital-store/blob/master/LICENSE)<br><br>
