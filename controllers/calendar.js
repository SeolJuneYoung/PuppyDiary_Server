
//클라이언트 입출력 관련

const CalendarModel = require('../models/calendarModels');  // 스키마 불러오기 
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/resMessage');
const util = require('../modules/util');
const hangul = require('hangul-js');


const calendar = {
    calendarShow : async (req, res) => {
        const year = req.params.year;
        const month = req.params.month;

        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
            try {
                const result = await CalendarModel.showCalendar(userIdx,year,month);
                if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.CALENDAR_SHOW_FAIL));
                }
                else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CALENDAR_SHOW_SUCCESS, result ));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }
    },
    calendarShowdaily : async (req, res) => {
        const year = req.params.year;
        const month = req.params.month;
        const date = req.params.date;
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
            try {
                const result = await CalendarModel.showCalendardaily(userIdx,year,month,date);
                if (result.length == 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.CALENDAR_SHOW_FAIL));
                }
                else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CALENDAR_SHOW_SUCCESS, result ));
                }
            } catch (err) {
                res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
        }
    },
    calendarUpdate : async (req, res) => {
        const {
            year,
            month, 
            date,
            memo,
            inject,
            water
        } = req.body;
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
            // const profile = req.file.location;
      
            if (!year || !month || !date ) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
            }else if (!memo && !water && !inject ) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
            }
            else{
                try {
                   
                    const result = await CalendarModel.updateCalendar(userIdx, year,month,date,memo,inject,water);
                    if (result.length == 0) {
                        return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.CALENDAR_UPDATE_FAIL));
                    }
                    else return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CALENDAR_UPDATE_SUCCESS, result));
                } catch (err) {
                    res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
                }
            }
        }
    },

    calendarPhoto: async (req, res) => {
        // 데이터 받아오기
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
            const year = req.params.year;
            const month = req.params.month;
            const date = req.params.date;
            if (req.decoded === undefined) { 
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
            }
            else{
                const userIdx = req.decoded.userIdx;
                console.log(userIdx);
                console.log(req.file);
                const profile = req.file.location;

                if (profile === undefined ) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
                }
                //image type check
                const type = req.file.mimetype.split('/')[1];
                if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.UNSUPPORTED_TYPE));
                }
                const result = await CalendarModel.calendarPhoto(userIdx, profile, year, month, date);
                console.log(result.length);
                if(result.length == 0){
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CALENDAR_PHOTO_FAIL));
                }
                else{
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CALENDAR_PHOTO_SUCCESS, result));
                }
            }
        }
    }
}

module.exports = calendar;

