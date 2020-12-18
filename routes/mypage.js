/*
 📌 내 정보 탭
 내 정보 조회, 강아지 정보 등록
*/
const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypage');
const AuthMiddleware = require('../middlewares/auth');


/*
 📌 REQUEST HEADER:
{
    KEY : TOKEN
    VALUE : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE1OTk4MDE0MjcsImV4cCI6MTU5OTgzNzQyNywiaXNzIjoib3VyLXNvcHQifQ.5zPwsSaivMNlPuOX9iHy1crB53v6CWE-i9o8r2iJCQI
}
*/


/* ✔️ registermyinfo, 강아지 정보 등록 
METHOD : POST
URI : localhost:3000/mypage/registermyinfo
REQUEST HEADER : 
{
    "puppyname" : "maru",
    "age" : "4",
    "birth" : "2017.12.19",
    "gender" : "1"
}
{
    "status": 200,
    "success": true,
    "message": "강아지 정보 등록 성공",
    "data": {
        "register": [
            {
                "puppyname": "maru",
                "age": 4,
                "birth": "2017.12.19",
                "gender": 1
            }
        ]
    }
}
*/
router.post('/registermyinfo',AuthMiddleware.checkToken, mypageController.registermyInfo); 


/* ✔️ myinfo, 내 정보 조회
METHOD : GET
URI : localhost:3000/mypage/myinfo
{
    "status": 200,
    "success": true,
    "data": [
        {
            "profileImg": null,
            "puppyname": "마루",
            "age": 3,
            "birth": "2017.12.19",
            "gender": 1
        }
    ]
}
*/
router.get('/myinfo', AuthMiddleware.checkToken, mypageController.showmyInfo); // 내 정보 조회


module.exports = router;
