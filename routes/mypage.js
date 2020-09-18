const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypage');
const AuthMiddleware = require('../middlewares/auth');


/**
 * 📌 내 정보 탭
 * 내 정보 조회, 내가 쓴 후기 조회, 작성, 사진 업데이트, 최근 본 책방 조회
 */
//router.post('/registermyinfo', AuthMiddleware.checkToken, mypageController.registermyInfo);
router.post('/registermyinfo/:userIdx', mypageController.registermyInfo);
router.get('/myinfo', AuthMiddleware.checkToken, mypageController.showmyInfo);
//main/myinfo
//main/registermyinfo
/*✔️ myinfo
METHOD : GET
URI : localhost:3000/mypage/myinfo
REQUEST HEADER : 
{
    KEY : TOKEN
    VALUE : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE1OTk4MDE0MjcsImV4cCI6MTU5OTgzNzQyNywiaXNzIjoib3VyLXNvcHQifQ.5zPwsSaivMNlPuOX9iHy1crB53v6CWE-i9o8r2iJCQI
}
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
}*/
module.exports = router;
