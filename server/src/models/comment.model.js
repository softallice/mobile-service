// comment-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'comment';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    author: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      username: { type: String, required: [true, "username is required!"] },
      email: { type: String, required: [true, "email is required!"] },
      image: { type: String, default: null },
    },
    parentComment: {
      _id: { type: Schema.Types.ObjectId, ref: "comment" },
      hasComment: { type: String, enum: ["no", "yes"], default: "no" },
    },
    text: { type: String, required: [true, "text is required!"] },
    isDeleted: { type: Boolean, default: false },
    updatedAt: { type: Date },
  }, {
    timestamps: true
  },
  {
    versionKey: false 
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
