var
  requireHelper = require('../../require-helper'),
  fn            = requireHelper('./home');

describe('fn', function () {
  it('should return 1', function () {
    expect(fn()).toEqual(1);
  });
});
