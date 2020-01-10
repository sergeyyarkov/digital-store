const ObjectID = require('mongodb').ObjectID;

module.exports = function(server, db, qiwiApi) {
    server.get('/success', (req, res) => {
        const query = req.query;

        // qiwi
        if (query.bill_id && query.item_id && query.payment === 'qiwi') {
            qiwiApi.getBillInfo(query.bill_id).then(async (data) => {
                const bill_id = query.bill_id,
                    status = data.status.value,
                    email = data.customer.email,
                    method = 'qiwi',
                    date = data.status.changedDateTime,
                    amount = data.amount.value;

                if (status === 'PAID') {
                    const ids = query.item_id.split('and');
                    const findBill = await db.collection('buyers').findOne({bill_id: query.bill_id});

                    if(findBill == null) {
                        const result = [];

                        //выдаем данные и создаем покупателя
                        for (let i = 0; i < ids.length; i++) {
                            const item = await db.collection('info').findOne({"_id": ObjectID(ids[i])}),
                                data = item.data;

                            result.push(data.splice(-1, 1));
                            db.collection('info').updateOne({"_id": ObjectID(ids[i])}, {$set: {data: data}});
                        }

                        db.collection('buyers').insertOne({bill_id, email, method, date, amount, data: result});
                        res.render('main/success', {result, email});
                    } else {
                        res.send('Этот заказ уже был оплачен. Данные были высланы покупателю.');
                    }
                } else if (status === 'WAITING') {
                    res.send('Инвоис ждет оплаты');
                } else if (status === 'EXPIRED') {
                    res.send('Время жизни счета истекло. Счет не оплачен');
                }
            })
            .catch(() => {
                res.render('main/404');
            });
        } else {
            res.render('main/404');
        }
    });
}