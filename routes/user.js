const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');

/*✔️ signup
METHOD : POST
URI : localhost:3000/user/signup
REQUEST BODY : 
{
    "email" : "jooe0824@naver.com",
    "password" : "123123",
    "passwordconfirm" : "123123"
}
RESPONSE DATA : {
    "status": 200,
    "success": true,
    "message": "회원 가입 성공",
    "data": {
        "userIdx": 2
    }
}
*/
router.post('/signup', UserController.signup);//user/signup

/*✔️ signin
METHOD : POST
URI : localhost:3000/user/signin
REQUEST BODY : 
{
    "email" : "jooe0824@naver.com",
    "password" : "123123"
}*/
router.post('/signin', UserController.signin);//user/signin

/*✔️ updatepw
METHOD : POST
URI : localhost:3000/user/updatepw
REQUEST BODY : 
{
    "email":"jooe0824@naver.com",
    "password": "puppydiary",
    "newpassword": "puppydiary123",
    "passwordConfirm": "puppydiary123"
}
*/
router.post('/updatepw', AuthMiddleware.checkToken, UserController.updatepw);//user/updatepw

router.get('/getemail', UserController.getEmail);//user/updatepw
/*이메일 중복확인 처리 필요
✔️ checkemail
METHOD : POST
URI : localhost:3000/user/checkemail
REQUEST BODY : 
{
    "email" : "juju0824@naver.com"
}
RESPONSE DATA : {
    "status": 200,
    "success": true,
    "message": "가입 가능한 이메일입니다.",
    "data": {
        "email": "juju0824@naver.com"
    }
}
*/

router.post('/checkemail', UserController.checkEmail);//user/checkemail

/*✔️ findpw
METHOD : POST
URI : localhost:3000/user/findpw
REQUEST BODY : 
{
    "email":"jooe0824@naver.com"
}
RESPONSE DATA :{
    "status": 200,
    "success": true,
    "message": "이메일 발송 성공",
    "data": {
        "toEmail": "jooe0824@naver.com",
        "subject": "New Email From DaendDaend"
    }
}
*/
router.post('/findpw', UserController.findPassword);//user/findpw

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/

router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);//user/profile

module.exports = router;

//로그인, 회원가입 체크