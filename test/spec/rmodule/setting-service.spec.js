describe('settingService', function () {
  var test;

  beforeEach(function () {
    test = this;

    module('app');

    var
      localStorageService = {
        'get' : function get() { return null; },
        'set' : function set() {}
      },

      spies = {
        'localStorageService' : {
          'get' : spyOn(localStorageService, 'get').and.callThrough(),
          'set' : spyOn(localStorageService, 'set').and.callThrough()
        }
      },

      dependencies = {
        'localStorageService' : localStorageService
      },

      callInject = function callInject() {
        module(function ($provide) {
          var name;

          for (name in dependencies) {
            $provide.value(name, dependencies[name]);
          }
        });

        inject(['settingService', function (settingService) {
          test.service = settingService;
        }]);
      };

    test.spies = spies;

    callInject();
  });

  describe('.get()', function () {
    describe('with a property not set', function () {
      beforeEach(function () {
        test.result = test.service.get('something');
      });

      it('should return undefined', function () {
        expect(test.result).toBe(undefined);
      });

      it('should call localStorageService.get', function () {
        expect(test.spies.localStorageService.get).toHaveBeenCalledWith('something');
      });
    });

    describe('with a property having default value', function () {
      beforeEach(function () {
        test.result = test.service.get('bodyClass');
      });

      it('should return the default value', function () {
        expect(test.result).toBe('simple');
      });

      it('should call localStorageService.get', function () {
        expect(test.spies.localStorageService.get).toHaveBeenCalledWith('bodyClass');
      });
    });
  });

  describe('.set()', function () {
    it('should not throw', function () {
      expect(test.service.set.bind(null, 'someone')).not.toThrow();
    });

    describe('with a property not set', function () {
      beforeEach(function () {
        test.result = test.service.set('something', 'myClass');
      });

      it('should call localStorageService.set', function () {
        expect(test.spies.localStorageService.set).toHaveBeenCalledWith('something', 'myClass');
      });
    });

    describe('with a property having default value', function () {
      beforeEach(function () {
        test.result = test.service.set('bodyClass', 'another');
      });

      it('should call localStorageService.set', function () {
        expect(test.spies.localStorageService.set).toHaveBeenCalledWith('bodyClass', 'another');
      });
    });
  });
});
