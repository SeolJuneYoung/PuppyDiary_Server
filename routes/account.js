/*
 📌 가계부
가계부 내용 조회/ 업데이트/ 삭제
*/

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

/*
 📌 REQUEST HEADER:
{
    KEY : TOKEN
    VALUE : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE1OTk4MDE0MjcsImV4cCI6MTU5OTgzNzQyNywiaXNzIjoib3VyLXNvcHQifQ.5zPwsSaivMNlPuOX9iHy1crB53v6CWE-i9o8r2iJCQI
}
*/

/* ✔️ update/:idaccount, //가계부 내용 업로드
METHOD : POST
URI : localhost:3000/account/update/:idaccount
REQUEST PARAM:
{
    "idaccount"
}
{
    "status": 200,
    "success": true,
    "message": "가계부 업데이트 성공",
    "data": [
        {
            "idaccount": 4,
            "userIdx": 31,
            "year": 2020,
            "month": 8,
            "date": 21,
            "item": "밥묵자",
            "price": 300
        }
    ]
}
*/
router.post('/update/:idaccount', AuthMiddleware.checkToken, accountController.accountUpdate); //가계부 내용 업로드


/* ✔️ check/:year/:month/:date/:item/:price, //가계부 디테일 조회
METHOD : GET
URI : localhost:3000/account/check/:year/:month/:date/:item/:price
{
    "status": 200,
    "success": true,
    "message": "가계부 조회 성공",
    "data": 4
}
*/
router.get('/check/:year/:month/:date/:item/:price', AuthMiddleware.checkToken, accountController.accountCheck); //가계부 디테일 조회


/* ✔️ insert, //가계부 내용 넣기 (최초)
METHOD : POST
URI : localhost:3000/account/insert
REQUEST BODY:
{
    "year" : "2020",
    "month" : "8",
    "date" : "21",
    "item" : "밥",
    "price" : "32000"
}
{
    "status": 200,
    "success": true,
    "message": "가계부 업데이트 성공",
    "data": [
        {
            "idaccount": 2,
            "userIdx": 31,
            "year": 2020,
            "month": 8,
            "date": 21,
            "item": "주사",
            "price": 15000
        },
        ...
    ]
}
*/
router.post('/insert', AuthMiddleware.checkToken, accountController.accountInsert); //가계부 내용 넣기 (최초)


/* ✔️ delete/:idaccount, //가계부 삭제
METHOD : DELETE
URI : localhost:3000/account/delete/:idaccount
REQUEST PARAM:
{
    "idaccount"
}
{
    "status": 200,
    "success": true,
    "message": "가계부 삭제 성공"
}
*/
router.delete('/delete/:idaccount', AuthMiddleware.checkToken, accountController.accountDelete); //가계부 내용 삭제


/* ✔️ show/:year/:month/:date, //가계부 조회
METHOD : DELETE
URI : localhost:3000/account/show/:year/:month/:date
{
    "status": 200,
    "success": true,
    "message": "가계부 조회 성공",
    "data": [
        {
            "idaccount": 2,
            "userIdx": 31,
            "year": 2020,
            "month": 8,
            "date": 21,
            "item": "주사",
            "price": 15000
        },
        ...
}
*/
router.get('/show/:year/:month/:date', AuthMiddleware.checkToken, accountController.accountShow); //가계부 조회

module.exports = router;