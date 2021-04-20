// Initializes the `notice` service on path `/notice`
const { Notice } = require('./notice.class');
const createModel = require('../../models/notice.model');
const hooks = require('./notice.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/notice', new Notice(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notice');

  service.hooks(hooks);
};
