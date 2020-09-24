const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');


router.post('/update/:idaccount', AuthMiddleware.checkToken, accountController.accountUpdate);
router.get('/check/:year/:month/:date/:item/:price', AuthMiddleware.checkToken, accountController.accountCheck);
router.post('/insert', AuthMiddleware.checkToken, accountController.accountInsert);
router.delete('/delete/:idaccount', AuthMiddleware.checkToken, accountController.accountDelete);
router.get('/show/:year/:month/:date', AuthMiddleware.checkToken, accountController.accountShow);

module.exports = router;