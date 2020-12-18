//사진 업로드 관련 모듈 => S3 이용

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');
const s3 = new aws.S3();

// s3 : path를 location으로 
// 최종 업로드되는 파일의 이름이 path에 저장됨 
// 이름이 저장될 때 중복되면 안되므로 multer가 알아서 키값을 어렵고 복잡하게 만들어서 저장

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'puppy-diary', //bucket이름
        acl: 'public-read',
        key: function(req, file, cb){
            cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    })
}); 
module.exports = upload;
