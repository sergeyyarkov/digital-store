const nodemailer = require('nodemailer');

module.exports = {
    transporter: nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_LOGIN, // email login
            pass: process.env.EMAIL_PASSWORD // email password
        }
    })
}