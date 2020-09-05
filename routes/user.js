const express = require('express');
const router = express.Router();
//const upload = require('../modules/multer');
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');


router.post('/checknickname', UserController.checkNickname);//user/checknickname
router.post('/checkemail', UserController.checkEmail);//user/checkemail
router.post('/signin', UserController.signin);//user/signin
router.post('/signup', UserController.signup);//user/signup
router.post('/findpw', UserController.findPassword);//user/findpw

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
//router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);//user/profile

module.exports = router;

//로그인, 회원가입 체크