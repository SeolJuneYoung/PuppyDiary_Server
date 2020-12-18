const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const userTable = 'user';

const mypage = {
    //간단 정보 보여주기
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
    //정보 보여주기
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
    //내 정보 등록하기
    registermyInfo: async (userIdx,puppyname,age,birth,gender) => {
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
}

module.exports = mypage;