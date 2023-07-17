const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://apps_Chat:lamnh102800@cluster0.abfgdww.mongodb.net/Member').then(data=>{
    if (data!=null) {
        console.log("Connect Success")
    }
})
const {Schema} = mongoose

var Member = new Schema({
    _id:String,
    fullName:String,
    date:Date,
    address:String,
    phone:String,
    avatar:String,
    passWord:String
})
const member = mongoose.model("Member",Member)
module.exports = member