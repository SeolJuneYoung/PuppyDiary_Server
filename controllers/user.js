const UserModel = require('../models/userModels');
const encrypt = require('../modules/crypto'); //비밀번호 로직
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/resMessage');
const util = require('../modules/util');
const jwt = require('../modules/jwt');
const mailer = require('../modules/mailer');
const multer = require('../modules/multer');

const user = {
    //email 중복 처리
    checkEmail: async(req, res)=>{
        const email = req.body;
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if ( !regExp.test(email) ) {
            return res.status(statusCode.OK)
                .send(util.fail(statusCode.OK, resMessage.NOT_EMAIL_FORM));
        }
        if(!email){
            //email이 null이라면
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        const result = await UserModel.checkUserByEmail(email);
        if(result.length!==0){
            //result가 이미 있다면 already email , email 중복
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ALREADY_EMAIL));
        }
        //중복처리 확인한 email
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.AVAILABLE_EMAIL, {email: email}));
    },
    //email로 회원가입하기
    signup : async (req, res) => {
        const {
            email,
            password,
            passwordConfirm
        } = req.body;

        //var regPw = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,20}$/i;
        var regPw = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,20})/i;
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if ( !regExp.test(email) ) {
            return res.status(statusCode.OK)
                .send(util.fail(statusCode.OK, resMessage.NOT_EMAIL_FORM));
        }
        else{
            if ( !regPw.test(password)) {
                return res.status(statusCode.OK)
                .send(util.fail(statusCode.OK, resMessage.NOT_PASSWORD_FORM));
            }
            if (!password || !email || !passwordConfirm) {
            //셋중 하나의 값이라도 null이라면
            return res.status(statusCode.OK)
                .send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        if(password !== passwordConfirm){
            //비밀번호와 비밀번호 확인이 다르다면
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.DIFFERENT_PW));
        }
        const checkidResult = await UserModel.checkUserByEmail(email);
        if(checkidResult.length>0){
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ALREADY_ID));
        }
        //salt, hash이용해서 비밀번호 암호화
        else{
            const {
                salt,
                hashed
            } = await encrypt.encrypt(password);

            //models.user.js 의 signup 쿼리 이용해서 회원가입 진행
            const idx = await UserModel.signup(email, hashed, salt);
            const user = await UserModel.getUserIdxByEmail(email);
            // if(user.lengh == 0){

            // }
            const {token, _} = await jwt.sign(user[0]);
            if (idx === -1) {
                return res.status(statusCode.DB_ERROR)
                    .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
            console.log(hashed);
            res.status(statusCode.OK)
                .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
                    userIdx: idx,
                    jwtToken: token
            }));
        }
    }
    },
//jwt token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE1OTk4MDE0MjcsImV4cCI6MTU5OTgzNzQyNywiaXNzIjoib3VyLXNvcHQifQ.5zPwsSaivMNlPuOX9iHy1crB53v6CWE-i9o8r2iJCQI

    //로그인 로직
    signin : async (req, res) => {
        const {
            email,
            password
        } = req.body;
        
        if (!email || !password) {
            //email과 pwd 중 하나라도 맞지 않으면
            res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_EMAIL_PW));
            return;
        }
    
        // User의 email이 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.checkUserByEmail(email);
        if (!user[0]) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_USER));
        }

        // crypto.js module 이용해서 pwd secure 확실하게
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        // console.log(hashed);
        // console.log(user[0].password);
        if (hashed !== user[0].hashed) {
            return res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, resMessage.MISS_MATCH_PW));
        }

        const {token, _} = await jwt.sign(user[0]);
//JWT 토큰은 로그인이 성공하면 response data로 전달한다.
        user[0].accessToken = token;

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
                userIdx : user[0].userIdx,
                jwtToken: token
            }));
    },
    updatepw : async (req,res) => {
        const {
            password,
            newpassword,
            passwordConfirm
        } = req.body;
        
        //const {token, _} = await jwt.sign(user[0]);
        if (req.decoded === undefined) { 
             return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        } else {
            const userIdx = req.decoded.userIdx;
            
            if (!newpassword || !passwordConfirm || !password) {
            //email과 pwd 중 하나라도 맞지 않으면
                res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
                return;
            }
        //pw 와 pwconfirm이 맞지 않으면
            if(newpassword !== passwordConfirm){
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.DIFFERENT_PW));
            }
        //email을 주면 user를 알려줌
        const user = await UserModel.checkUserByUserIdx(userIdx);
        //pw hashed하기
            const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        //pw 맞는지 확인하기
            if (hashed !== user[0].hashed) {
                return res.status(statusCode.OK)
                .send(util.fail(statusCode.OK, resMessage.MISS_MATCH_PW));
            }

            try{
                const {
                    salt,
                    hashed
                } = await encrypt.encrypt(newpassword);
            const result = await UserModel.updateNewPW(userIdx, hashed, salt);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_PW));
       
            }catch(err){
                console.log('update PW ERR ERR : ',err);
                throw err;
            }
        }
    },
    getEmail : async(req, res)=>{
        // const email = req.body;
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
        
        if(!userIdx){
            //email이 null이라면
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        const result = await UserModel.getEmail(userIdx);
        const email = result[0].email; 
                console.log("email" + email);
        if(result.length == 0){
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.GET_EMAIL_FAIL));
        }
        //중복처리 확인한 email
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.GET_EMAIL_SUCCESS, email ));
    }
    },
    /*
    updateImages: async(req, res)=>{
        const bookstoreIdx=req.params.bookstoreIdx;
        let imageLocations=[];
        for(var i=0;i<3;i++){
            imageLocations[i]=req.files[i].location;
        }
        const result=await UserModel.updateImages(bookstoreIdx, imageLocations);
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.UPDATE_IMAGE_SUCCESS, result));
    },*/
    updateProfile: async (req, res) => {
        // 데이터 받아오기
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
        }
        else{
            const userIdx = req.decoded.userIdx;
            console.log(userIdx);
        // jwt 토큰을 가져와서 디코드 시켜줌
        // 체크토큰은 decoded된 정보를 담아줌
            console.log(req.file);
            const profile = req.file.location;
        //const profile = req.file.location;
        // s3는 path를 location으로 
        // 최종 업로드되는 파일의 이름이 path에 저장됨 
        // 이름이 저장될 때 중복되면 안되므로 multer가 알아서 키값을 어렵고 복잡하게 만들어서 저장? 
        // +) ms 단위의 시간으로 파일이름 저장해줘도 좋음!

        // data check - undefined
            if (profile === undefined ) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
            }
        // image type check
            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.UNSUPPORTED_TYPE));
            }
            const result = await UserModel.updateProfile(userIdx, profile);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_PROFILE_SUCCESS, result));
        }
    },
    //비밀번호 찾기
    findPassword: async(req, res)=>{
        const userEmail=req.body.email;
        console.log('email:', userEmail);
        //email null
        if (req.decoded === undefined) { 
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.EMPTY_TOKEN));
       } else {
           const userIdx = req.decoded.userIdx;
           
            if(!userEmail){
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
            }
        //email 이 DB에 있는지 확인
            const result = await UserModel.checkUserByEmail(userEmail);
            if(result.length===0){
                //DB에 이메일이 없다
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_USER));
            }
        //임시 비밀번호를 해당 이메일로 발송
        try{
            const newPW = Math.random().toString(36).slice(2);
            let emailParam = {
                toEmail : userEmail,
                subject : 'New Email From DaengDaengDiary',
                text : `댕댕이어리 회원님! 새로운 pw입니다. \nNew Password : ${newPW}`
            };
            //새로운 pw 다시 설정
            const {
                salt,
                hashed
            } = await encrypt.encrypt(newPW);
            await UserModel.updateNewPW(userEmail, hashed, salt);
            //mailer module 사용 
            mailer.sendGmail(emailParam);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SEND_EMAIL_SUCCESS, {
                toEmail : userEmail,
                subject: 'New Email From DaendDaend'
            }))
        }catch(err){
            console.log('find PW by email mailer ERR : ',err);
            throw err;
        }
    }}
}
module.exports = user;