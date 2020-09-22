

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
        const query = `SELECT date, inject, water FROM ${accountTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' `;
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('show account ERROR : ', err);
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
            console.log('show account daily ERROR : ', err);
            throw err;
        }
    },
    insertAccount : async (userIdx, year, month, date, item, price) => {

        const checkquery = `SELECT * FROM ${accountTable} WHERE userIdx = ${userIdx} AND month = '${month}' AND year = '${year}' AND date = '${date}' AND item = '${item}' AND price = '${price}'`;
        const check = await pool.queryParam(checkquery);
        if(check.length != 0){
            return -1;
        }
        else{
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
        }
    }, 
    updateAccount :  async (idaccount,item,price) => {
        console.log(idaccount, item, price);
        let query = `UPDATE ${accountTable} SET item = '${item}', price = '${price}' WHERE idaccount = '${idaccount}'`;
        try {
            await pool.queryParam(query);
            query =  `SELECT * FROM ${accountTable} WHERE idaccount = '${idaccount}' `
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('update account ERROR : ', err);
            throw err;
        }
    },
    deleteAccount : async (idaccount) => {
        const check = `SELECT * FROM ${accountTable} WHERE idaccount = '${idaccount}'`
        const checkresult = await pool.queryParam(check);
        if(checkresult.length == 0){
            return 1;
        }
        else{
            const query = `DELETE FROM ${accountTable} WHERE idaccount = '${idaccount}'`;
            try {
                const result = await pool.queryParam(query);
                console.log(result);
                return result;
            } catch (err) {
                console.log('delete account ERROR : ', err);
                throw err;
            }
        }
    },
    checkAccount : async (userIdx,year,month,date,item,price) => {
        console.log(userIdx, year, month, date, item, price);
        const checkquery = `SELECT idaccount FROM ${accountTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}' AND date = '${date}' AND item = '${item}' AND price = '${price}'`;
        // const check = await pool.queryParam(checkquery);
        // console.log(check[0].idaccount);
        
        try {
            const result = await pool.queryParam(checkquery);
            console.log(result);
            const idx = result[0].idaccount;
            console.log(idx);
            return result;
        } catch (err) {
            console.log('delete account ERROR : ', err);
            throw err;
        }
    },
   
}

module.exports = account;

