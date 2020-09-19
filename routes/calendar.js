const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

router.post('/update', calendarController.calendarUpdate);
router.get('/show/:year/:month', calendarController.calendarShow);
router.get('/show/:year/:month/:date', calendarController.calendarShowdaily);
router.post('/:year/:month/:date/photo', upload.single('profile'), calendarController.calendarPhoto);
module.exports = router;