//데이터 처리

const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// const calendarTable = 'calendar';
const kgTable = 'kg';
// const accountTable = 'account';
// const imagesTable = 'images';s
const userTable = 'user';

//calendar 데이터 받아오기 
//calendar data : year, month, date, water, inject, memo, image
//kg year, month 연결지어 update, delete, store
//kg data : year, month, kg
//account year,month,date 연결지어 update 
//account data : year, month, date, item, price

const kg = {
    
    //Mypuppypage 보여주기
    showKg : async (userIdx,year) => {
        const query = `SELECT * FROM ${kgTable} WHERE userIdx = ${userIdx} AND year = '${year}'`;
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('show kg ERROR : ', err);
            throw err;
        }
    },
    updateKg : async (userIdx, year, month, kg) => {

        let query = `SELECT * FROM ${kgTable} WHERE userIdx = ${userIdx} AND month = '${month}';`;
        try { 
            const kgUpdateresult = await pool.queryParam(query);
            if (kgUpdateresult.length == 0) {
                const fields = 'userIdx, year, month, kg';
                const questions = '?, ?, ?, ?';
                const values = [userIdx, year, month, kg];
                const insertquery = `INSERT INTO ${kgTable} (${fields}) VALUES (${questions})`;
                await pool.queryParamArr(insertquery, values);
            }
            else{
                const updatequery = `UPDATE ${kgTable} set kg = '${kg}' where userIdx = ${userIdx} AND year = '${year}' AND month = '${month}'`;
                await pool.queryParam(updatequery);
            }
            query = `SELECT * FROM ${kgTable} WHERE userIdx = ${userIdx}`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update kg ERROR : ', err);
            throw err;
        }
    }, 
    
    /*
    updateProfile: async (userIdx, profile) => {
        let query = `UPDATE ${userTable} SET profile = '${profile}' WHERE userIdx = ${userIdx}`;
        try {
            await pool.queryParam(query);
            query = `SELECT userIdx, userName, profile FROM ${userTable} WHERE userIdx = ${userIdx}`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('update profile ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('update profile ERROR : ', err);
            throw err;
        }
    },
    selectNickname: async (userIdx) => {
        let query = `SELECT * FROM ${userTable} WHERE userIdx = ${userIdx};`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('search by keyword ERROR : ', err);
            throw err;
        }
    },
   
    //calendar data 보여주기
    showCalendar: async (userIdx) => {
        const query = 'SELECT c.water, c.inject, c.memo, c.image FROM ${bookstoreTable} bs, ${userTable} u 
                        WHERE' ;
        try {
            const result = await pool.queryParam(query);
            return result;
            } catch (err) {
                console.log('showCalendar ERROR : ', err);
                throw err;
            }
    },
    deleteKg: async(userIdx, year, month)=>{
        const query = `DELETE from ${userTable} 
                        WHERE userIdx = ${userIdx} 
                        AND year = ${year} 
                        AND month = ${month}`;
        try{
            await pool.queryParam(query);
            return 1;
        }catch(err){
            console.log('deleteKg ERROR : ',err);
            throw err;
        }
    },
    updatedKg: async(userIdx, kg, year, month)=>{
        //const date = moment().format('YYYY년 M월 D일 HH:mm 수정');
        let query = `update ${userTable} set kg = ${kg} where userIdx=${userIdx} and year = ${year} and month = ${month}`;
        try{
            await pool.queryParam(query);
            query = `SELECT * FROM ${userTable} WHERE userIdx = ${userIdx};`; 
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('updateKg ERROR : ',err);
            throw err;
        }
    }*/
}

module.exports = kg;