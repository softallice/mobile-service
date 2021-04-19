const assert = require('assert');
const app = require('../../src/app');

describe('\'blog-entry\' service', () => {
  it('registered the service', () => {
    const service = app.service('blog-entry');

    assert.ok(service, 'Registered the service');
  });
});
