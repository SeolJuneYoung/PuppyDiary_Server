/*
 📌 달력
 달력 월별, 일일 조회/ 사진 업로드/ 일일 정보 수정
*/

const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');
 

/*
 📌 REQUEST HEADER:
{
    KEY : TOKEN
    VALUE : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE1OTk4MDE0MjcsImV4cCI6MTU5OTgzNzQyNywiaXNzIjoib3VyLXNvcHQifQ.5zPwsSaivMNlPuOX9iHy1crB53v6CWE-i9o8r2iJCQI
}
*/


/* ✔️ update, 달력 일일 정보 업데이트
METHOD : POST
URI : localhost:3000/calendar/update
REQUEST PARAM:
{
    "year" : "2020",
    "month" : "8",
    "date" : "10",
    "memo" : "오늘은 산책갔다 온 날,
    "inject" : "0",
    "water" : "1"
}
{
    "status": 200,
    "success": true,
    "message": "달력 업데이트 성공",
    "data": [
        {
            "idcalendar": 3,
            "userIdx": 31,
            "year": 2020,
            "month": 8,
            "date": 10,
            "memo": "와 배부르다",
            "inject": 0,
            "water": 1,
            "photo": null
        }
    ]
}
*/
router.post('/update', AuthMiddleware.checkToken, calendarController.calendarUpdate); //달력일일 정보 업데이트


/* ✔️ show/:year/:month, 달력 월별 조회
METHOD : GET
URI : localhost:3000/calendar/show/:year/:month
REQUEST PARAM:
{
    "year" : "2020",
    "month" : "8"
}
{
    "status": 200,
    "success": true,
    "message": "달력 조회 성공",
    "data": [
        {
            "date": 24,
            "inject": 1,
            "water": 0
        },
        {
            "date": 22,
            "inject": 1,
            "water": 1
        }
    ]
}
*/
router.get('/show/:year/:month', AuthMiddleware.checkToken, calendarController.calendarShow); //달력 월별 조회


/* ✔️ show/:year/:month/:date, 달력 일일 조회
METHOD : GET
URI : localhost:3000/calendar/show/:year/:month/:date
REQUEST PARAM:
{
    "year" : "2020",
    "month" : "8",
    "date" : "24"
}
{
    "status": 200,
    "success": true,
    "message": "달력 조회 성공",
    "data": [
        {
            "idcalendar": 1,
            "userIdx": 31,
            "year": 2020,
            "month": 8,
            "date": 24,
            "memo": "와 배고프다",
            "inject": 1,
            "water": 0,
            "photo": "https://puppy-diary.s3.ap-northeast-2.amazonaws.com/1600541409961.jpg"
        }
    ]
}
*/
router.get('/show/:year/:month/:date', AuthMiddleware.checkToken,calendarController.calendarShowdaily); //달력 일일 조회


/* ✔️ show/:year/:month/:date/photo, 달력 사진 업로드
METHOD : POST
URI : localhost:3000/calendar/show/:year/:month/:date/photo
 REQUEST BODY : ⭐️image file ⭐️
{
    "status": 200,
    "success": true,
    "message": "달력 사진 업로드 성공",
    "data": [
        {
            "userIdx": 31,
            "photo": "https://puppy-diary.s3.ap-northeast-2.amazonaws.com/1600541409961.jpg"
        }
    ]
}
*/
router.post('/:year/:month/:date/photo', upload.single('profile'), AuthMiddleware.checkToken, calendarController.calendarPhoto); //달력 사진 업로드
module.exports = router;