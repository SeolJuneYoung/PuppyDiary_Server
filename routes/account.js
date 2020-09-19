const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

router.post('/update', accountController.accountUpdate);
router.get('/show/:year/:month/:date', accountController.accountShow);

module.exports = router;