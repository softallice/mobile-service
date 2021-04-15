// Initializes the `fbpush` service on path `/fbpush`
const { Fbpush } = require('./fbpush.class');
const createModel = require('../../models/fbpush.model');
const hooks = require('./fbpush.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/fbpush', new Fbpush(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fbpush');

  service.hooks(hooks);
};
