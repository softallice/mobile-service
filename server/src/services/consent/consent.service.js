// Initializes the `consent` service on path `/consent`
const { Consent } = require('./consent.class');
const createModel = require('../../models/consent.model');
const hooks = require('./consent.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/consent', new Consent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('consent');

  service.hooks(hooks);
};
