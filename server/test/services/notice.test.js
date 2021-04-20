const assert = require('assert');
const app = require('../../src/app');

describe('\'notice\' service', () => {
  it('registered the service', () => {
    const service = app.service('notice');

    assert.ok(service, 'Registered the service');
  });
});
