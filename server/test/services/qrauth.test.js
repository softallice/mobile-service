const assert = require('assert');
const app = require('../../src/app');

describe('\'qrauth\' service', () => {
  it('registered the service', () => {
    const service = app.service('qrauth');

    assert.ok(service, 'Registered the service');
  });
});
