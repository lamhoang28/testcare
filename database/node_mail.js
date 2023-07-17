const nodemailer = require ('nodemailer')
const config = require("../config/db.config");
const otp = require('../service/otp_service')
exports.sendCode = async function (to,number,res) {

    var html = `
        <h1>VERIFY MY EMAIL ADDRESS</h1>
        <h3>Please verify your email to secure your account.</h3>
        <p>The code will expire after 60 seconds.</p>
        <mark>${number}</mark>
        <br>
        <i>thanks.</i>
    `

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: config.EM,
            pass: config.PW
        },
    })

    const options = {
        from: config.EM,
        to: to,
        subject: 'Verify Email',
        html:html
    }
    await transport.sendMail(options, (err) => {
        if (err) {
            res.json({
                message:err
            })
        }
        otp.createOtp(to,number,res)
    })
}