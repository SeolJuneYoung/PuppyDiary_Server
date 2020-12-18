const pool = require('../modules/pool');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


const kgTable = 'kg';
const userTable = 'user';

const kg = {
    //몸무게 보여주기
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
    //월별 몸무게 보여주기
    showKgmonth : async (userIdx,year,month) => {
        const query = `SELECT * FROM ${kgTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}'`;
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('show kg_month ERROR : ', err);
            throw err;
        }
    },
    //몸무게 수정, 업데이트
    updateKg : async (userIdx, year, month, kg) => {
        const checkquery = `SELECT * FROM ${kgTable} WHERE userIdx = ${userIdx} AND year = '${year}' AND month = '${month}';`;
        try { 
            const kgcheckresult = await pool.queryParam(checkquery);
            console.log(kgcheckresult);
            if (kgcheckresult.length == 0) {
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
            const query = `SELECT * FROM ${kgTable} WHERE userIdx = ${userIdx} AND year = '${year}'`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update kg ERROR : ', err);
            throw err;
        }
    }, 
    //몸무게 삭제하기
    deleteKg: async(userIdx, year, month)=>{
        const query = `DELETE from ${kgTable} WHERE userIdx = ${userIdx} AND year = ${year} AND month = ${month}`;
        try{
            await pool.queryParam(query);
            return 1;
        }catch(err){
            console.log('deleteKg ERROR : ',err);
            throw err;
        }
    },
}

module.exports = kg;