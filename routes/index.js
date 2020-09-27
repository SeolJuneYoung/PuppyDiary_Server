var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/mypage', require('./mypage')); //내 정보 페이지
router.use('/calendar', require('./calendar')); //달력 페이지
router.use('/account', require('./account')); //가계부 페이지
router.use('/kg', require('./kg')); //몸무계 페이지
router.use('/user', require('./user')); //로그인, 회원가입
router.use('/auth', require('./auth')); //middleware로 들어가게 되면서 필요 없어짐

module.exports = router;
//경로 설정, 정리해놓은 것