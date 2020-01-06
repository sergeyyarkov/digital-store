const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');

const SECRET_KEY = '';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);
module.exports = function(server, db) {
    server.put('/payment', (req, res) => {
        const billId = qiwiApi.generateId(); 
        const fields = {
            amount: req.body.totalPrice,
            currency: 'RUB',
            comment: `Оплата товара "${req.body.items[0].title}" Счёт: ${billId}`,
            expirationDateTime: qiwiApi.getLifetimeByDay(),
            customFields: {themeCode: 'Sergei-YaS7mIY0CQe'},
            email: req.body.email,
            successUrl: `http://test.ru/`
        }
        qiwiApi.createBill(billId, fields).then((data) => {
            res.send(data);
        });
    });
}