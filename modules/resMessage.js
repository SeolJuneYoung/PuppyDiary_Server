//응답메세지 보내주기 

module.exports = {
    NULL_VALUE: '필요한 값이 없습니다',
    OUT_OF_VALUE: '파라미터 값이 잘못되었습니다',

    // 회원가입
    CREATED_USER: '회원 가입 성공',
    DELETE_USER: '회원 탈퇴 성공',
    ALREADY_ID: '이미 사용중인 아이디입니다.',
    ALREADY_EMAIL: '이미 등록된 이메일입니다.',
    AVAILABLE_EMAIL: '가입 가능한 이메일입니다.',
    ALREADY_NICKNAME: '이미 사용중인 닉네임입니다.',
    AVAILABLE_NICKNAME: '사용 가능한 닉네임입니다.',
    NOT_EMAIL_FORM : '이메일 형식이 아닙니다.',
    NOT_PASSWORD_FORM : '비밀번호는 영어 대,소문자/특수문자/숫자를 포함 8글자 이상입니다.',
    
    // 로그인
    LOGIN_SUCCESS: '로그인 성공',
    LOGIN_FAIL: '로그인 실패',
    NO_USER: '존재하지 않는 회원입니다.',
    MISS_MATCH_PW: '비밀번호가 맞지 않습니다.',

    // 인증
    EMPTY_TOKEN: '토큰 값이 없습니다.',
    EXPIRED_TOKEN: '토큰 값이 만료되었습니다.',
    INVALID_TOKEN: '유효하지 않은 토큰값입니다.',
    AUTH_SUCCESS: '인증에 성공했습니다.',
    ISSUE_SUCCESS: '새로운 토큰이 생성되었습니다.',
    
    // 프로필 조회
    READ_PROFILE_SUCCESS: '프로필 조회 성공',
    READ_PROFILE_FAIL: '정보가 없습니다.',
    UNSUPPORTED_TYPE: '지원하지 않는 타입입니다.',

    // 이미지 업데이트
    UPDATE_IMAGE_SUCCESS: '이미지 업데이트 성공',
    
    // 프로필 업데이트
    UPDATE_PROFILE_SUCCESS: '프로필 업데이트 성공',

    // 데이터 관련
    NO_DATA: '목록이 없습니다.',
    READ_DATA_SUCCESS: '목록 조회 성공',

    // cookie 관련
    COOKIE_SUCCESS: '쿠키가 저장되었습니다.',
    COOKIE_FAIL: '쿠키 저장에 실패했습니다.',

    //이메일 관련
    SEND_EMAIL_SUCCESS: '이메일 발송 성공',
    
    //비밀번호 확인 관련
    DIFFERENT_PW: '비밀번호가 다릅니다.',
    UPDATE_PW: '비밀번호 업데이트 완료',
    GET_EMAIL_FAIL : '비밀번호 업데이트 조회 실패',
    GET_EMAIL_SUCCESS : '비밀번호 업데이트 조회 성공',

    //강아지 정보 페이지 
    REGISTER_MYINFO_FAIL: '강아지 정보 등록 실패',
    REGISTER_MYINFO_SUCCESS: '강아지 정보 등록 성공',

    //kg
    KG_UPDATE_FAIL : 'kg 업데이트 실패',
    KG_SHOW_FAIL : 'kg 조회 실패',
    KG_UPDATE_SUCCESS : "kg 업데이트 성공",
    KG_SHOW_SUCCESS : "kg 조회 성공", 

    //calendar
    CALENDAR_UPDATE_FAIL : '달력 업데이트 실패',
    CALENDAR_SHOW_FAIL : '달력 조회 실패',
    CALENDAR_UPDATE_SUCCESS : "달력 업데이트 성공",
    CALENDAR_SHOW_SUCCESS : "달력 조회 성공", 
    CALENDAR_PHOTO_SUCCESS : "달력 사진 업로드 성공", 
    CALENDAR_PHOTO_FAIL : "달력 사진 업로드 실패", 

    //account
    ACCOUNT_UPDATE_FAIL : '가계부 업데이트 실패',
    ACCOUNT_SHOW_FAIL : '가계부 조회 실패',
    ACCOUNT_UPDATE_SUCCESS : "가계부 업데이트 성공",
    ACCOUNT_SHOW_SUCCESS : "가계부 조회 성공", 
    ACCOUNT_DELETE_SUCCESS : "가계부 삭제 성공",
    ACCOUNT_DELETE_FAIL : "가계부 삭제 실패",
    ACCOUNT_SAME_ITEM : "같은 item,price 가 이미 존재합니다.",

    DB_ERROR: 'DB 오류'
};