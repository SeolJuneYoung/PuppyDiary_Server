const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');
 
router.post('/update', AuthMiddleware.checkToken, calendarController.calendarUpdate); //달력일일 정보 업데이트
router.get('/show/:year/:month', AuthMiddleware.checkToken, calendarController.calendarShow); //달력 월별 조회
router.get('/show/:year/:month/:date', AuthMiddleware.checkToken,calendarController.calendarShowdaily); //달력 일일 조회
router.post('/:year/:month/:date/photo', upload.single('profile'), AuthMiddleware.checkToken, calendarController.calendarPhoto); //달력 사진 업로드
module.exports = router;