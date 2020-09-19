

//데이터 처리

const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const accountTable = 'account';
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

const account = {
    
    //Mypuppypage 보여주기
    showAccount : async (userIdx,year,month) => {
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
    showAccountdaily : async (userIdx,year,month,date) => {
        const query = `SELECT * FROM ${accountTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('show kg ERROR : ', err);
            throw err;
        }
    },
    updateAccount : async (userIdx, year, month, date, item, price) => {

        // let query = `SELECT * FROM ${accountTable} WHERE userIdx = ${userIdx} AND month = '${month}' AND year = '${year}' AND date = '${date}'`;
        try { 
            // const accCheckresult = await pool.queryParam(query);
            // if (accCheckresult.length == 0) {
                const fields = 'userIdx, year, month, date, item, price';
                const questions = '?, ?, ?, ?, ?, ?';
                const values = [userIdx, year, month, date, item, price];
                const insertquery = `INSERT INTO ${accountTable} (${fields}) VALUES (${questions})`;
                await pool.queryParamArr(insertquery, values);
            // }
            // else{
            //     const updatequery = `UPDATE ${accountTable} set item = '${item}', price = '${price}' where userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
            //     await pool.queryParam(updatequery);
            // }
            query = `SELECT * FROM ${accountTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}'`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update account ERROR : ', err);
            throw err;
        }
    }, 
    
   
}

module.exports = account;

