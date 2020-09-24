
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
            if (req.decoded === undefined) { 
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
            }
            else{
                const userIdx = req.decoded.userIdx;
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
            }
    },
    accountInsert : async (req, res) => {
        // const year = req.params.year;
        // const month = req.params.month;
        // const date = req.params.date;
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
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
        console.log(userIdx);
        // const profile = req.file.location;
      
        if (!year || !month || !date ) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        else{
            try {
                const result = await AccountModel.insertAccount(userIdx, year, month, date, item, price);
                if ( result == -1){
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_SAME_ITEM));
                }
                else if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_UPDATE_FAIL));
                }
                else return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ACCOUNT_UPDATE_SUCCESS, result));
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }}
    },
    accountDelete: async (req, res) => {
        const idaccount = req.params.idaccount;

        // console.log(year);
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
       if (req.decoded === undefined) { 
        return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
    }
    else{
        const userIdx = req.decoded.userIdx;
            console.log(userIdx);
            try {
                const result = await AccountModel.deleteAccount(idaccount);
                if (result.length == 0 || result == 1) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_DELETE_FAIL));
                }
                else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ACCOUNT_DELETE_SUCCESS ));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
             }}
    },
    accountUpdate: async (req, res) => {
        const {
            item,
            price
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
        const idaccount = req.params.idaccount;
        
        // const profile = req.file.location;
      
        if (!item || !price ) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        else{
            try {
                const result = await AccountModel.updateAccount(idaccount, item, price);
                if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_UPDATE_FAIL));
                }
                else return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ACCOUNT_UPDATE_SUCCESS, result));
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }}
    },
    accountCheck :  async (req, res) => {
        const year = req.params.year;
        const month = req.params.month;
        const date = req.params.date;
        const item = req.params.item;
        const price = req.params.price;
        console.log(item);
        // if (req.decoded === undefined) { 
        //     return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        // } else {
            if (req.decoded === undefined) { 
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
            }
            else{
                const userIdx = req.decoded.userIdx;
            try {
                const check = await AccountModel.checkAccount(userIdx,year,month,date,item,price);
                const idx = check[0].idaccount; 
                console.log("idx" + idx);
                if (check.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ACCOUNT_SHOW_FAIL));
                }
                else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ACCOUNT_SHOW_SUCCESS, idx ));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
             }}
    },
}

module.exports = account;

