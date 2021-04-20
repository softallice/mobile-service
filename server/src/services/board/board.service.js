// Initializes the `board` service on path `/board`
const { Board } = require('./board.class');
const createModel = require('../../models/board.model');
const hooks = require('./board.hooks');

const errors = require("@feathersjs/errors");
var fs = require("fs");
var path = require("path");
const multer = require("multer");

module.exports = function (app) {
  console.log(app)
  const options = {
    Model: createModel(app),
    lean: true,
    paginate: app.get('paginate')
  };

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, "./upload"),
    filename: (_req, file, cb) =>
      cb(null, `${Date.now()}-${file.originalname}`),
  });
  const upload = multer({
    storage,
    limits: {
      fieldSize: 100000000000,
      fileSize: 100000000000,
    },
  });

  // Initialize our service with any options it requires
  app.use('/board', 
  upload.array("files"),
  (req, _res, next) => {
    const { method } = req;

    if (method === "POST" || method === "PUT") {
      if('views' in req.body){
        next();
      }
      req.feathers.files = req.files;
      const body = [];


      if (req.files === undefined) {
        return;
      }
      for (const file of req.files)
        body.push({
          // description: req.body.description,
          originalFileName: file.originalname,
          serverFileName: file.filename,
          size: file.size,
          // userId: req.user.id
        });
      req.body.file = body ;
    }
    if (method === "GET") {
      if(req.query.serverFileName){
        // console.log(req);
        let stream;
        let filePath = path.join(
          __dirname,
          "/../../..",
          "/upload",
          req.query.serverFileName
        );
        // console.log(filePath);
        var fileExists = fs.existsSync(filePath);
        if (fileExists) {
          stream = fs.createReadStream(filePath);
        } else {
          // this.processDelete();
        }
        // console.log(stream);
        if(stream){
          console.log(req.query.serverFileName);
          if(String(req.query.serverFileName).includes('.png')){
            _res.writeHead(200, {
              'Content-Type': 'image/png',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.jpeg') || String(req.query.serverFileName).includes('.jpg')){
            _res.writeHead(200, {
              'Content-Type': 'image/jpeg',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.doc')){
            _res.writeHead(200, {
              'Content-Type': 'application/msword',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.pdf') ){
            _res.writeHead(200, {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.xls') || String(req.query.serverFileName).includes('.xlsx')){
            _res.writeHead(200, {
              'Content-Type': 'application/vnd.ms-excel',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.zip')){
            _res.writeHead(200, {
              'Content-Type': 'application/zip',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.js')){
            _res.writeHead(200, {
              'Content-Type': 'application/x-javascript',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.json')){
            _res.writeHead(200, {
              'Content-Type': 'application/json',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.mkv')){
            _res.writeHead(200, {
              'Content-Type': 'video/x-matroska',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else if(String(req.query.serverFileName).includes('.xml')){
            _res.writeHead(200, {
              'Content-Type': 'application/xml',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }else{
            _res.writeHead(200, {
              'Content-Type': 'application/octet-stream',
              'Content-Disposition': `attachment; filename= ${encodeURIComponent(req.query.serverFileName)}`
            });
          }
          
          stream.pipe(_res);
          return;
        }else { 
          _res.statusCode = 404;
          _res.end();
          throw new errors.NotFound("File not found.");
        }
      }
      
    }
      next();
    },
    new Board(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('board');

  service.hooks(hooks);
};
