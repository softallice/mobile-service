const assert = require('assert');
const app = require('../../src/app');

describe('\'board\' service', () => {
  it('registered the service', () => {
    const service = app.service('board');

    assert.ok(service, 'Registered the service');
  });
});
