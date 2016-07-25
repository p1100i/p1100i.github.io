describe('settingService', function () {
  var test;

  beforeEach(function () {
    test = this;

    module('app');

    inject(['settingService', function (settingService) {
      test.service = settingService;
    }]);
  });

  describe('.get()', function () {
    it('should return undefined', function () {
      expect(this.service.get('something')).toBe(undefined);
    });

    describe('with calling on existing setting', function () {
      it('should return the default value', function () {
        expect(this.service.get('bodyClass')).toBe('simple');
      });

      describe('with set on the property', function () {
        beforeEach(function () {
          this.service.set('bodyClass', 'complex');
        });

        it('should expect', function () {
          expect(this.service.get('bodyClass')).toBe('complex');
        });
      });
    });
  });

  describe('.set()', function () {
    it('should not throw', function () {
      expect(this.service.set.bind(null, 'someone')).not.toThrow();
    });
  });
});
