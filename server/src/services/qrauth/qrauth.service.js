// Initializes the `qrauth` service on path `/qrauth`
const { Qrauth } = require('./qrauth.class');
const createModel = require('../../models/qrauth.model');
const hooks = require('./qrauth.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/qrauth', new Qrauth(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('qrauth');

  service.hooks(hooks);
};
