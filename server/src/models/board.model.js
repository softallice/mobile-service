// board-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
var fs = require("fs");
var path = require("path");

module.exports = function (app) {
  console.log(app)
  const modelName = 'board';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: { type: String, required: [true, "Title is required!"] },
      body: { type: String, required: [true, "Body is required!"] },
      author: {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "user",
          // required: true,
        },
        username: String,
        email: String,
        image: { type: String, default: null },
      },
      views: { type: Number, default: 0 },
      category: { type: String },
      file: [
        {
          originalFileName: { type: String },
          serverFileName: { type: String },
          size: { type: Number },
          isDeleted: { type: Boolean, default: false },
        },
      ],
      // updatedAt: { type: Date },
  }, {
    timestamps: true
  },
  // {
  //   versionKey: false,
  // }
  );

  schema.methods.processDelete = function () {
    this.isDeleted = true;
    this.save();
  };

  schema.methods.getFileStream = function () {
    var stream;
    var filePath = path.join(__dirname, "upload", this.serverFileName); // 5-1
    var fileExists = fs.existsSync(filePath);
    if (fileExists) {
      stream = fs.createReadStream(filePath);
    } else {
      this.processDelete();
    }
    return stream;
  };

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
