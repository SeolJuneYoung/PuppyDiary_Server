//내 정보 페이지 관련
const MypageModel = require('../models/mypageModels'); // 스키마 불러오기 
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/resMessage');
const util = require('../modules/util');
const hangul = require('hangul-js');


const mypage = {
    //정보 등록
    registermyInfo : async (req, res) => {
        const {
            puppyname,
            age,
            birth,
            gender
        } = req.body;
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        } else {
            const userIdx = req.decoded.userIdx;
            try {
                if( !puppyname || !age || !birth || !gender){
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
                }
                // const userIdx = req.params.userIdx;

                const result = await MypageModel.registermyInfo(userIdx,puppyname,age,birth,gender);
                if (result.length > 0) {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.REGISTER_MYINFO_SUCCESS, result ));
                }
                else {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.REGISTER_MYINFO_FAIL));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }
    },
    //내 정보 조회
    showMypage : async (req, res) => {
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
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
        }
    },
    //내 정보 상세 조회
    showmyInfo: async (req, res) => {
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
            try {
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
}

module.exports = mypage;