const user = require('../database/user_database')
const nodeMail = require('../database/node_mail')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.checkMail =  function (req,res) {
    user.findOne({_id:req.body.email}).then(_data=>{
        if (_data){
            return res.json({
                message : 'Email already exists'
            })
        }
         var number= Math.round(Math.random() * (999999 - 100000) + 100000)
         return nodeMail.sendCode(req.body.email,number,res)
    })
}
exports.register = async function (req,res){
    var passWord = await bcrypt.hash(req.body.passWord,8)
    const _user = new user({
        _id:req.body.email,
        fullName:req.body.fullName,
        sex:req.body.sex,
        date:req.body.age,
        address:req.body.address,
        phone:req.body.phone,
        avatar:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        passWord:passWord
    })
    _user.save().then(data=>{
        if (data){
            res.render('index',{title:'Email'})
        }
    })
}
exports.login = function (req,res){

    user.findOne({_id:req.body.email}).then(async data=>{
        if (data){
            var checker = await bcrypt.compareSync(req.body.passWord,data.passWord,8)
            console.log(checker)
            if (checker){
                var token = jwt.sign({data},req.body.passWord)
               jwt.verify(token,req.body.passWord,function (err,data) {
                    if (err){
                            return res.json({
                                error : 'Invalid token'
                            })
                    }
                    return res.render('home',{title:data.data.fullName})
                        // return res.json({
                        //     message : 'Login Success',
                        //     token : token,
                        //     veryfy : data
                        // })
                })

            }else{
                return res.json({
                    message : 'Incorrect account or password'
                })
            }

        }else{
            return res.json({
                error : 'Account does not exist'
            })
        }

    })
}
exports.authentication = function (req,res) {
    user.find({}).then(data=>{
        res.render('authentication',{data:data})
    })
}