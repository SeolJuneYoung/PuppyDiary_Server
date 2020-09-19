
//클라이언트 입출력 관련
const AccountModel = require('../models/accountModels');  // 스키마 불러오기 
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/resMessage');
const util = require('../modules/util');
const hangul = require('hangul-js');


const account = {
    accountShow : async (req, res) => {
        const year = req.params.year;
        const month = req.params.month;
        const date = req.params.date;
        // console.log(year);
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
            const userIdx = 31;
            console.log(userIdx);
            try {
                const result = await AccountModel.showAccountdaily(userIdx,year,month,date);
                if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_SHOW_FAIL));
                }
                else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ACCOUNT_SHOW_SUCCESS, result ));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
             }
    },
    accountUpdate : async (req, res) => {
        const {
            year,
            month, 
            date,
            item,
            price
        } = req.body;
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
        // const userIdx = req.decoded.userIdx;
        // console.log(userIdx);
        const userIdx = 31;
        console.log(userIdx);
        // const profile = req.file.location;
      
        if (!year || !month || !date ) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        else{
            try {
                const result = await AccountModel.updateAccount(userIdx, year, month, date, item, price);
                if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_UPDATE_FAIL));
                }
                else return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ACCOUNT_UPDATE_SUCCESS, result));
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }
    },

}

module.exports = account;

