var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/mypage', require('./mypage'));
// router.use('/calendar', require('./calendar'));
// router.use('/account', require('./account'));
router.use('/kg', require('./kg'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth')); //middleware로 들어가게 되면서 없어도 될 듯

module.exports = router;
//경로 설정, 정리해놓은 것