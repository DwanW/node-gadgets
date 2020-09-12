const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dwanw@mail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dwanw@mail.com',
        subject: 'Sorry to see you go!',
        text: `Good Bye, ${name}, Is there anything we could have done to kept you on board`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}