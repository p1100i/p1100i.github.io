define(['app', 'di', 'build'], function (app, di, build) {
  app.controller('aboutController', [function AboutControllerFactory() {
    var
      ctrl = this,

      package = di.get('package'),

      getDateFormat = function getDateFormat(short) {
        if (short) {
          return 'yyyy-MM-dd HH:mm';
        }

        return 'yyyy-MM-dd HH:mm:ss';
      },

      displayData = function displayData(data) {
        return data || 'n/a';
      },

      init = function init() {
        ctrl.buildCommit  = displayData(build.commit);
        ctrl.buildDate    = displayData(build.date);
        ctrl.format       = displayData(getDateFormat());
        ctrl.unixTime     = displayData(Math.floor(build.date / 1e3));
        ctrl.version      = displayData(package.version);
      };

    init();
  }]);
});
