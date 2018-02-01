define(['app'], function (app) {
  app.factory('settingService', ['$rootScope', '$cookies', function ($rootScope, $cookies) {
    var
      DEFAULTS = {
        'bodyClass' : 'simple'
      },

      data = {},

      getDateFormat = function getDateFormat(short) {
        if (short) {
          return 'yyyy-MM-dd HH:mm';
        }

        return 'yyyy-MM-dd HH:mm:ss';
      },

      get = function get(key) {
        var
          value = data[key];

        return value === undefined ? DEFAULTS[key] : value;
      },

      set = function set(key, value) {
        data[key] = value;

        $rootScope.$broadcast('settingChanged', key);
      },

      init = function init() {
      };

    init();

    return {
      'get'           : get,
      'getDateFormat' : getDateFormat,
      'set'           : set
    };
  }]);
});
