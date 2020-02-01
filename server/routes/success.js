const ObjectID = require('mongodb').ObjectID;
const nodemailer = require('../config/nodemailer.config');

module.exports = function(server, db, qiwiApi) {
    server.get('/success', async (req, res) => {
        const store = await db.collection('content').findOne({}),
            query = req.query;

        // qiwi
        if (query.bill_id && query.item_id && query.payment === 'qiwi') {
            qiwiApi.getBillInfo(query.bill_id).then(async (data) => {
                const bill_id = query.bill_id,
                    status = data.status.value,
                    email = data.customer.email,
                    method = 'qiwi',
                    date = data.status.changedDateTime,
                    amount = parseFloat(data.amount.value);

                if (status === 'PAID') {
                    const ids = query.item_id.split('and'),
                        findBill = await db.collection('buyers').findOne({bill_id: query.bill_id});

                    if(findBill == null) {
                        const result = [];

                        // создаем покупателя и выдаем данные
                        for (let i = 0; i < ids.length; i++) {
                            const item = await db.collection('info').findOne({"_id": ObjectID(ids[i])}),
                                data = item.data;

                            result.push(data.splice(-1, 1).join(''));
                            db.collection('info').updateOne({"_id": ObjectID(ids[i])}, {$set: {data: data}});
                        }
                        db.collection('buyers').insertOne({bill_id, email, method, date, amount, data: result});

                        await nodemailer.transporter.sendMail({
                            from: `"Оплата аккаунта." <${process.env.EMAIL_LOGIN}>`,
                            to: email,
                            subject: "Оплата успешно проведена.",
                            text: "Данные купленного товара находятся в этом письме.",
                            html: `
                                <b>Номер заказа: ${bill_id}</b><br>
                                <b>Дата оплаты: ${new Date(data.status.changedDateTime).toLocaleDateString()}</b><br>
                                <b>Данные товара:</b><br>
                                <p>${result.join('<br>')}</p>
                            `
                        });

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
                res.render('main/failure', {email: store.email});
            });
        } else {
            res.status(404).render('main/404');
        }
    });
}