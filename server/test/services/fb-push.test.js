const assert = require('assert');
const app = require('../../src/app');

describe('\'fb-push\' service', () => {
  it('registered the service', () => {
    const service = app.service('fb-push');

    assert.ok(service, 'Registered the service');
  });
});
