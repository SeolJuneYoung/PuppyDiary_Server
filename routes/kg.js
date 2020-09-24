const express = require('express');
const router = express.Router();
const kgController = require('../controllers/kg');
const AuthMiddleware = require('../middlewares/auth');

router.post('/update', AuthMiddleware.checkToken, kgController.kgUpdate);
router.get('/show/:year',AuthMiddleware.checkToken, kgController.kgShow);
//AuthMiddleware.checkToken, 
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
