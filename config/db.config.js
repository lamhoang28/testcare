const dotev = require('dotenv')
dotev.config({path:'./.env'})

module.exports = {
    EM: process.env.EMAIL,
    PW:process.env.PASS,
    IF:process.env.EM,
    APP_URL:process.env.APP_URL
}