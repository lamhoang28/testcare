var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


const authentication = require ('../service/authentication')


router.post('/checkMail',authentication.checkMail)

const otp = require('../service/otp_service')
router.post('/checkCodeVerify', otp.checkOtp);
router.post('/register_info', authentication.register);
router.post('/login', authentication.login);
router.get('/authentication', authentication.authentication);

module.exports = router;
