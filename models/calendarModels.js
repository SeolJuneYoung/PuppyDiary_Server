

//데이터 처리

const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const calendarTable = 'calendar';
// const kgTable = 'kg';
// const accountTable = 'account';
// const imagesTable = 'images';s
const userTable = 'user';

//calendar 데이터 받아오기 
//calendar data : year, month, date, water, inject, memo, image
//kg year, month 연결지어 update, delete, store
//kg data : year, month, kg
//account year,month,date 연결지어 update 
//account data : year, month, date, item, price

const calendar = {
    
    //Mypuppypage 보여주기
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
    
    calendarPhoto : async (userIdx, profile, year, month, date) => {
    let query = `UPDATE ${calendarTable} SET photo = '${profile}' WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
    try {
        await pool.queryParam(query);
        query = `SELECT userIdx, photo FROM ${calendarTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}' `;
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        // if (err.errno == 1062) {
        //     console.log('update profile ERROR : ', err.errno, err.code);
        //     throw err;
        // }
        console.log('update calendarphoto ERROR : ', err);
        throw err;
    }
},
   
}

module.exports = calendar;

