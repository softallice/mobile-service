// exercise-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'exercise';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    writeDate: { type: String, required: true },
    walking: { type: Number , default: 0 },
    running: { type: Number , default: 0 },
    gym: { type: Number , default: 0 },
    bike: { type: Number , default: 0 },
    riding: { type: Number , default: 0 },
    hiking: { type: Number , default: 0 },
    yoga: { type: Number , default: 0 },
    etc: { type: Number , default: 0 },

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
