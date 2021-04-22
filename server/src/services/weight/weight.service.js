// Initializes the `weight` service on path `/weight`
const { Weight } = require('./weight.class');
const createModel = require('../../models/weight.model');
const hooks = require('./weight.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/weight', new Weight(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('weight');

  service.hooks(hooks);
};
