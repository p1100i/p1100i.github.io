describe('landing page', function () {
  beforeEach(function () {
    browser.get('/');
  });

  it('should have the title', function () {
    expect(browser.getTitle()).toEqual('p1100i.github.io');
  });
});
