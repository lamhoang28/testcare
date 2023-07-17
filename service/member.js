const chats = require('../database/user_database')

exports.readData = function (req,res){
    chats.find().then(data=>{
        if (data!=null){
            res.render('index',{title:"data"})
        }
    })
}