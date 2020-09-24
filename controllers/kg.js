//클라이언트 입출력 관련


const KgModel = require('../models/kgModels');  // 스키마 불러오기 
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/resMessage');
const util = require('../modules/util');
const hangul = require('hangul-js');


const kg = {
    kgShow : async (req, res) => {
        const year = req.params.year;
        console.log(year);
        const userIdx = 31;
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
                //const userIdx = req.decoded.userIdx;
            console.log(userIdx);
            try {
                const result = await KgModel.showKg(userIdx,year);
                if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.KG_SHOW_FAIL));
                }
                else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.KG_SHOW_SUCCESS, result ));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
             }
            //}
    },
    kgUpdate : async (req, res) => {
        const {
            year,
            month, 
            kg
        } = req.body;
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
        // const userIdx = req.decoded.userIdx;
        // console.log(userIdx);
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
        console.log(userIdx);
        if (!year || !month || !kg) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        try {
            const result = await KgModel.updateKg(userIdx,year,month,kg);
            if (result.length == 0) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.KG_UPDATE_FAIL));
            }
            else return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.KG_UPDATE_SUCCESS, result));
        } catch (err) {
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }}
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

module.exports = kg;