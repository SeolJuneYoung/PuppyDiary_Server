const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');


router.post('/update/:idaccount', AuthMiddleware.checkToken, accountController.accountUpdate); //가계부 내용 업로드
router.get('/check/:year/:month/:date/:item/:price', AuthMiddleware.checkToken, accountController.accountCheck); //가계부 디테일 조회
router.post('/insert', AuthMiddleware.checkToken, accountController.accountInsert); //가계부 내용 넣기 (최초)
router.delete('/delete/:idaccount', AuthMiddleware.checkToken, accountController.accountDelete); //가계부 내용 삭제
router.get('/show/:year/:month/:date', AuthMiddleware.checkToken, accountController.accountShow); //가계부 조회

module.exports = router;