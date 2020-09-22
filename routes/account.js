const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');


router.post('/update/:idaccount', accountController.accountUpdate);
router.get('/check/:year/:month/:date/:item/:price', accountController.accountCheck);
router.post('/insert/:year/:month/:date', accountController.accountInsert);
router.delete('/delete/:idaccount', accountController.accountDelete);
router.get('/show/:year/:month/:date', accountController.accountShow);

module.exports = router;