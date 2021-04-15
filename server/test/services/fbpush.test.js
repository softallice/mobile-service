const assert = require('assert');
const app = require('../../src/app');

describe('\'fbpush\' service', () => {
  it('registered the service', () => {
    const service = app.service('fbpush');

    assert.ok(service, 'Registered the service');
  });
});
