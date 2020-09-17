//데이터 처리

const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// const calendarTable = 'calendar';
// const kgTable = 'kg';
// const accountTable = 'account';
// const imagesTable = 'images';
const userTable = 'user';

//calendar 데이터 받아오기 
//calendar data : year, month, date, water, inject, memo, image
//kg year, month 연결지어 update, delete, store
//kg data : year, month, kg
//account year,month,date 연결지어 update 
//account data : year, month, date, item, price

const mypage = {
    
    //Mypuppypage 보여주기
    showMypage: async (userIdx) => {
        const query = `SELECT profile, email FROM ${userTable} WHERE userIdx = '${userIdx}';`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('show my page ERROR : ', err);
            throw err;
        }
    },
    showInfo: async (userIdx) => {
        let query = `SELECT image, puppyname, age, birth, gender FROM ${userTable} WHERE userIdx = ${userIdx};`;
        try { 
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('show myInfo ERROR : ', err);
            throw err;
        }
    }, 
    registermyInfo: async (userIdx,puppyname,age,birth,gender) => {

        // const fields = ' puppyname, age, birth, gender';
        // const questions = '?, ?, ?, ?';
        // const values = [ puppyname, age, birth, gender];
        
        // insert 같이 values 값 들어가는 것은 queryParamArr 함수 써주는 게 좋음~~
        // let query = `INSERT INTO ${userTable} (${fields}) VALUES (${questions}) WHERE userIdx = ${userIdx};`;
        let query = `update ${userTable} set puppyname = '${puppyname}', age = '${age}', birth = '${birth}', gender = '${gender}' where userIdx = ${userIdx}`;
    
        try{    
            await pool.queryParam(query);
            query = `SELECT  puppyname, age, birth, gender FROM ${userTable} WHERE userIdx = ${userIdx};`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('register my page ERROR : ', err);
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

module.exports = mypage;