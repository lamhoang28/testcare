const otp = require('../database/otp_email')
const bcrypt = require('bcrypt')

exports.createOtp = async function (email,number,res){

    const hash = await bcrypt.genSalt(8)
    const hashOtp = await  bcrypt.hash(number.toString(),hash)
    const Otp = new otp({
        email:email,
        otp:hashOtp
    })
    Otp.save().then(data=>{
        if (data){
            console.log("Send otp code to recipient's email")
            res.render('checkCode', { title:'Verify Email',email:email});
        }
    })
}

exports.checkOtp = function (req,res){
    otp.findOne({email:req.body.email}).then(async data => {
        if (data) {
            var member = await bcrypt.compare(req.body.code, data.otp)
            console.log(data.otp)
            console.log(member)
            if (member){
                res.render('register_info',{title:'register',email:req.body.email})
            }else{
                res.json({
                    message:'The verification code is incorrect'
                })
            }
        }
    })
}