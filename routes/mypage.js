const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypage');
const AuthMiddleware = require('../middlewares/auth');


/**
 * 📌 내 정보 탭
 * 내 정보 조회, 내가 쓴 후기 조회, 작성, 사진 업데이트, 최근 본 책방 조회
 */
router.get('/mypage', AuthMiddleware.checkToken, mypageController.showMypage);
//main/mypage

module.exports = router;
