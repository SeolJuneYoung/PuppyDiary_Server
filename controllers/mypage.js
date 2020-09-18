//클라이언트 입출력 관련

const MypageModel = require('../models/mypageModels'); // 스키마 불러오기 
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/resMessage');
const util = require('../modules/util');
const hangul = require('hangul-js');


const mypage = {

        /**
         * 🔥 cookie 🔥
         * 현재 사용자가 가지고 있는 쿠키 확인: req.cookies.[cookie_name]
         * 쿠기 저장: res.cookie('cookie_name', 'cookie_value', option)
         * [option] 👇
         * maxAge: 쿠키의 만료 시간을 밀리초 단위로 설정
         * expires: 쿠키의 만료 시간을 표준 시간 으로 설정
         * path: 쿠키의 경로 (default: /)
         * domain: 쿠키의 도메인 이름 (default: loaded)
         * secure: HTTPS 프로토콜만 쿠키 사용 가능
         * httpOnly: HTTP 프로토콜만 쿠키 사용 가능
         * signed: 쿠키의 서명 여부를 결정
         *  */ 
    registermyInfo : async (req, res) => {

        const {
            puppyname,
            age,
            birth,
            gender
        } = req.body;
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
            try {
                if( !puppyname || !age || !birth || !gender){
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
                }
                const userIdx = req.params.userIdx;
                const result = await MypageModel.registermyInfo(userIdx,puppyname,age,birth,gender);
                if (result.length > 0) {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.REGISTER_MYINFO_SUCCESS, { register : result }));
                }
                else {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.REGISTER_MYINFO_FAIL));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
             }
        // }
    },
    showMypage : async (req, res) => {
        const userIdx = req.decoded.userIdx;
        try {
            const result = await MypageModel.showMypage(userIdx);
            if (!result.length) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.READ_PROFILE_FAIL));
            }
            else return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, result));
        } catch (err) {
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    showmyInfo: async (req, res) => {
        //const userIdx = req.params.userIdx;
        //const {token, _} = await jwt.sign(user[0]);
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        } else {
            try {
                const userIdx = req.decoded.userIdx;
                const result = await MypageModel.showInfo(userIdx);
                if (result.length>0) {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SHOW_MYINFO_SUCCESS, result));
                }
                else return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.SHOW_MYINFO_FAIL));
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }
    },
    /*
    deletekg: async(req, res)=>{
        const userIdx = req.decoded.userIdx;
        const reviewIdx = req.params.reviewIdx;
        try{
            const result = await MainModel.deleteReview(reviewIdx);
            if(result === 1){
                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_REVIEW, {reviewIdx: reviewIdx}));
            }else{
                res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ERROR_IN_DELETE_REVIEW));
            }
        }catch(err){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },*/
    
}

module.exports = mypage;