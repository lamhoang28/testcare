const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://apps_Chat:lamnh102800@cluster0.abfgdww.mongodb.net/Member').then(data=>{
    if (data!=null) {
        console.log("Connect Success")
    }
})
const {Schema} = mongoose

var OTP = new Schema({
    email:String,
    otp:String,
    time:{type:Date,default:Date.now,index : {expires:60}}
},{
    collection :'OTP'
})
const otp = mongoose.model("OTP",OTP)
module.exports = otp