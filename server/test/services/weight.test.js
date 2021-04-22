const assert = require('assert');
const app = require('../../src/app');

describe('\'weight\' service', () => {
  it('registered the service', () => {
    const service = app.service('weight');

    assert.ok(service, 'Registered the service');
  });
});
