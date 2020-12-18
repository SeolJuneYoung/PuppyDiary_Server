const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const calendarTable = 'calendar';
const userTable = 'user';

const calendar = {
    //달력 월별 보여주기
    showCalendar : async (userIdx,year,month) => {
        const query = `SELECT date, inject, water FROM ${calendarTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' `;
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('show kg ERROR : ', err);
            throw err;
        }
    },
    //달력 일별 보여주기
    showCalendardaily : async (userIdx,year,month,date) => {
        const query = `SELECT * FROM ${calendarTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('show kg ERROR : ', err);
            throw err;
        }
    },
    //달력 수정, 업데이트
    updateCalendar : async (userIdx, year,month,date,memo,inject,water) => {
        let query = `SELECT * FROM ${calendarTable} WHERE userIdx = ${userIdx} AND month = '${month}' AND year = '${year}' AND date = '${date}'`;
        try { 
            const calUpdateresult = await pool.queryParam(query);
            if (calUpdateresult.length == 0) {
                const fields = 'userIdx, year, month, date, memo, inject, water';
                const questions = '?, ?, ?, ?, ?, ?, ?';
                const values = [userIdx, year, month, date, memo, inject, water];
                const insertquery = `INSERT INTO ${calendarTable} (${fields}) VALUES (${questions})`;
                await pool.queryParamArr(insertquery, values);
            }
            else{
                const updatequery = `UPDATE ${calendarTable} set memo = '${memo}', inject = '${inject}', water='${water}' where userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
                await pool.queryParam(updatequery);
            }
            query = `SELECT * FROM ${calendarTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update kg ERROR : ', err);
            throw err;
        }
    }, 
    //달력 사진 보여주기
    calendarPhoto : async (userIdx, profile, year, month, date) => {
        const checkquery = `SELECT * FROM ${calendarTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}' `;
        const Calcheckquery = await pool.queryParam(checkquery);
        if (Calcheckquery.length ==0){
            const fields = 'userIdx, year, month, date, photo';
            const questions = '?, ?, ?, ?, ?';
            const values = [userIdx, year, month, date, profile];
            const insertquery = `INSERT INTO ${calendarTable} (${fields}) VALUES (${questions})`;
            await pool.queryParamArr(insertquery, values);
        }
        else{
            const updatequery = `UPDATE ${calendarTable} SET photo = '${profile}' WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
            console.log(profile);
            await pool.queryParam(updatequery);
        }
        try {
            const query = `SELECT userIdx, photo FROM ${calendarTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}' `;
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('update calendarphoto ERROR : ', err);
            throw err;
        }
    },
}

module.exports = calendar;

