const pool = require('../modules/pool');
const table = 'user';
const table3 ='images';

//models..쿼리문 작성
const user = {
    //회원가입 로직
    signup: async (email, password, salt ) => {
        const fields = 'email, hashed, salt';
        const questions = `?, ?, ?`;
        const values = [email, password, salt];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            //쿼리문 실행, 테이블에 회원 정보 기입하기 
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    //이메일 중복확인하기
    checkUserByEmail: async (email) => {
        const query = `SELECT * FROM ${table} WHERE email = '${email}';`;
        try {
            //쿼리문 실행
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            //쿼리문 실행시 에러 발생
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserIdxByEmail: async(email)=>{
        const query = `select * from ${table} where email='${email}'`;
        try{
            const result = pool.queryParam(query);
            return result;
        }catch(err){
            console.log('get userIdx by email ERR : ', err);
            throw err;
        }
    },
    getEmail : async(userIdx)=>{
        const query = `select email from ${table} where userIdx='${userIdx}'`;
        try{
            const result = pool.queryParam(query);
            return result;
        }catch(err){
            console.log('get email by userIdx ERR : ', err);
            throw err;
        }
    },
    checkUserByEmail: async (email) => {
        console.log(email);
        const checkquery = `SELECT * FROM ${table} WHERE email = '${email}';`;
        try {
            const result = await pool.queryParam(checkquery);
            console.log(result);
            return result;
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    checkUserByUserIdx: async (userIdx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx = '${userIdx}';`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    //프로필 업데이트
    updateProfile: async (userIdx, profile) => {
        let query = `UPDATE ${table} SET image = '${profile}' WHERE userIdx = ${userIdx}`;
        try {
            await pool.queryParam(query);
            query = `SELECT userIdx, image FROM ${table} WHERE userIdx = ${userIdx}`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            // if (err.errno == 1062) {
            //     console.log('update profile ERROR : ', err.errno, err.code);
            //     throw err;
            // }
            console.log('update profile ERROR : ', err);
            throw err;
        }
    },
    //프로필에 이미지 업데이트하기 
    updateImages: async(userIdx, locations)=>{
        let query = `INSERT INTO ${table} (image) values (${profileimage})`;
        try{
            await pool.queryParam(query);
            query=`select * from ${table3} where userIdx=${userIdx}`;
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
                console.log('insert image ERR : ',err);
                throw err;
        }
    },
    //이메일로 사용자 찾기 ... 아이디가 없이 이메일로만 회원가입하기 때문에 이 로직은 필요없을 듯
    findUserByEmail: async(userEmail)=>{
        const query = `select email from ${table} where email=${userEmail}`;
        try{
            const result = pool.queryParam(query);
            return result;
        }catch(err){
            console.log('find user by email ERR : ',err);
            throw err;
        }
    },
    //비밀번호 변경, 아이디 다시 찾고 비밀번호 다시 설정할 경우
    updateNewPW: async(userIdx, newhashed, newsalt)=>{ 
        //새로운 해쉬, 솔트 함수 주기

        const query = `update ${table} set hashed='${newhashed}', salt='${newsalt}' where userIdx='${userIdx}'`;
        try{
            const result = pool.queryParam(query);
            return result;
        }catch(err){
            console.log('update pw by email ERR : ',err);
            throw err;
        }
    }
}

module.exports = user;
