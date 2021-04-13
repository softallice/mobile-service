const assert = require('assert');
const app = require('../../src/app');

describe('\'consent\' service', () => {
  it('registered the service', () => {
    const service = app.service('consent');

    assert.ok(service, 'Registered the service');
  });
});
