const ObjectID = require('mongodb').ObjectID;

module.exports = function(server, db, qiwiApi) {
    server.put('/payment', async (req, res) => {
        // проверяем товар на его наличие
        const item = await db.collection('info').findOne({"_id": ObjectID(req.body.items[0].id)});
        if (item.data.length > 0) {
            const billId = qiwiApi.generateId();
            const fields = {
                amount: req.body.totalPrice,
                currency: 'RUB',
                comment: `Оплата товара "${req.body.items[0].title}" Счёт: ${billId}`,
                expirationDateTime: qiwiApi.getLifetimeByDay(),
                customFields: {
                    themeCode: 'Sergei-YaS7mIY0CQe'
                },
                email: req.body.email,
                successUrl: `https://polar-peak-95205.herokuapp.com/success?bill_id=${billId}&item_id=${req.body.items[0].id}&payment=qiwi`
            }
            qiwiApi.createBill(billId, fields).then((data) => {
                res.send(data);
            });
        } else {
            res.send('Товара нет в наличии.');
        }
    });
}