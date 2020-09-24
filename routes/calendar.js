const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

router.post('/update', AuthMiddleware.checkToken, calendarController.calendarUpdate);
router.get('/show/:year/:month', AuthMiddleware.checkToken, calendarController.calendarShow);
router.get('/show/:year/:month/:date', AuthMiddleware.checkToken,calendarController.calendarShowdaily);
router.post('/:year/:month/:date/photo', upload.single('profile'), AuthMiddleware.checkToken, calendarController.calendarPhoto);
module.exports = router;