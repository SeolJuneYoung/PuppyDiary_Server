/*
 📌 KG
 몸무게 연별, 월별 조회/ 수정/ 삭제
*/

const express = require('express');
const router = express.Router();
const kgController = require('../controllers/kg');
const AuthMiddleware = require('../middlewares/auth');


/*
 📌 REQUEST HEADER:
{
    KEY : TOKEN
    VALUE : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE1OTk4MDE0MjcsImV4cCI6MTU5OTgzNzQyNywiaXNzIjoib3VyLXNvcHQifQ.5zPwsSaivMNlPuOX9iHy1crB53v6CWE-i9o8r2iJCQI
}
*/


/* ✔️ update, 몸무게 업데이트
METHOD : POST
URI : localhost:3000/kg/update
REQUEST BODY:
{
    "year" : "2020",
    "month" : "9",
    "kg" : "3.5"
}
{
    "status": 200,
    "success": true,
    "message": "kg 업데이트 성공",
    "data": [
        {
            "kgIdx": 8,
            "userIdx": 31,
            "year": 2018,
            "jan": 0,
            "feb": 0,
            ...
            "month": 5,
            "kg": 3.5
        },
        ...
*/
router.post('/update', AuthMiddleware.checkToken, kgController.kgUpdate); //몸무게 업데이트


/* ✔️ show/:year, 연별 몸무게 조회
METHOD : GET
URI : localhost:3000/kg/show/:year
{
    "status": 200,
    "success": true,
    "message": "kg 조회 성공",
    "data": 3.5
}
*/
router.get('/show/:year', AuthMiddleware.checkToken,  kgController.kgShow); //연별 몸무게 조회


/* ✔️ delete/:year/:month, 몸무게 삭제
METHOD : DELETE
URI : localhost:3000/kg/delete/:year/:month
{
    "status": 200,
    "success": true,
    "message": "kg 삭제 성공"
}
*/
router.delete('/delete/:year/:month', AuthMiddleware.checkToken,  kgController.kgDelete); //몸무게 삭제


/* ✔️ show/:year/:month, 월별 몸무게 조회
METHOD : GET
URI : localhost:3000/kg/show/:year/:month
{
    "status": 200,
    "success": true,
    "message": "kg 조회 성공",
    "data": 3.5
}
*/
router.get('/show/:year/:month', AuthMiddleware.checkToken,  kgController.kgShowmonth); //월별 몸무게 조회


module.exports = router;
