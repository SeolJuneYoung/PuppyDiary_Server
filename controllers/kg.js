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
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        } else {
            const userIdx = req.decoded.userIdx;
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
        }
    },
    kgUpdate : async (req, res) => {
        const {
            year,
            month, 
            kg
        } = req.body;
        console.log(year);
        
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
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
            }
        }
    },
    kgDelete: async(req, res)=>{
        const year = req.params.year;
        const month = req.params.month;
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            try{
                const userIdx = req.decoded.userIdx;
                const result = await KgModel.deleteKg(userIdx,year,month);
                if(result === 1){
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_KG));
                }else{
                    res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ERROR_IN_DELETE_REVIEW));
                }
            }catch(err){
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }
    },
}

module.exports = kg;