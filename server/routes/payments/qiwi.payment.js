const ObjectID = require('mongodb').ObjectID;

module.exports = function(server, db, qiwiApi) {
    server.put('/payment', async (req, res) => {
        const ids = req.body.items.map(item => item.id);
        const titles = req.body.items.map(item => item.title).join(',');
        let empty = false;

        for (let i = 0; i < ids.length; i++) {
            const item = await db.collection('info').findOne({"_id": ObjectID(req.body.items[i].id)});
            if (item.data.length === 0) empty = i;
        }
        
        // проверяем товар на его наличие и создаем bill
        if (empty === false) {
            const billId = qiwiApi.generateId();
            const fields = {
                amount: req.body.totalPrice,
                currency: 'RUB',
                comment: `Оплата товара "${titles}" Счёт: ${billId}`,
                expirationDateTime: qiwiApi.getLifetimeByDay(),
                customFields: {
                    themeCode: 'Sergei-YaS7mIY0CQe'
                },
                email: req.body.email,
                successUrl: `${req.headers.origin}/success?bill_id=${billId}&item_id=${ids.join('and')}&payment=qiwi`
            }
            qiwiApi.createBill(billId, fields).then((data) => {
                res.send(data);
            })
            .catch(() => {
                res.send('Произошла ошибка при создании заказа. Попробуйте позже.');
            })
        } else {
            res.send(`Товара "${req.body.items[empty].title}" нет в наличии`);
        }         
    });
}