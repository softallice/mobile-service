/* eslint-disable no-console */
/*
  https 설정을 위한 import
*/
const path = require('path');
const https = require('https');
const fs = require('fs');

/*
  서버 실행 port, log ....
*/
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');

//  http 환경 설정 가져오기
const useSSL = app.get('ssl');
var server = null;

if(useSSL){
  // set up server with ssl (https)
  const certDirPath = path.join(__dirname, '..', '..', 'server', 'config', 'cert'); 
  console.log('Start Https');
  console.log('certDirPath', certDirPath);

  server = https.createServer({
    key: fs.readFileSync(path.normalize(certDirPath + path.sep + 'softmagic.local.key')),
    cert: fs.readFileSync(path.normalize(certDirPath + path.sep + 'softmagic.local.crt')),
    rejectUnauthorized: false,
    requestCert: false
  }, app).listen(port);

  app.setup(server);
}else{
  // set up server without ssl (http)
  // server = http.createServer(app).listen(port);
  console.log('Start Http');
  server = app.listen(port);
}

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
