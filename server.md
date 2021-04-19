# 환경 파일 
```sh
yarn add dotenv
or 
npm install --save dotenv
```
## .env 파일 만들기
1. package.json과 같은 폴더의 위치에 생성
2. .gitignore 파일에 .env 추가

## app.js
```js
// dotenv 적용
const dotenv= require('dotenv');
dotenv.config();

//화이트 리스트 적용
const whitelist = [app.get('client_url')] || [process.env.client_url] ;
const corsOptions = {
  origin: (origin, callback) => {
    // if (whitelist.indexOf(origin) !== -1) { 
    if (!origin || whitelist.indexOf(origin) !== -1) { //test
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
```

## 서비스 생성
```sh
feathers generate service
1. account(사용자 관리)
2. email(이메일 인증)
3. auth-management(인증 관리)
4. messages(메시지)
5. notifications(noti 등록)
6. push(웹 push)
7. subscription(구독)
8. consent(동의 내용) - markdown 데이터 화면에 표시
9. fb-push(firebase push)) - fcm push
10. qrauth - QR authentication
```
## 쿼리
https://docs.feathersjs.com/api/databases/querying.html#select

## 파일 업로드 참고
https://github.com/mkalus/self-cleaning-blob-storage-example