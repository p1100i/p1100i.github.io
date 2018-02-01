define(['app', 'pkg', 'build'], function (app, pkg, build) {
  app.controller('appController', ['$rootScope', '$scope', 'settingService', function appControllerFactory($rootScope, $scope, settingService) {
    var
      init = function init() {
        $scope.format       = settingService.getDateFormat();
        $scope.version      = pkg.version;
        $scope.buildDate    = build.date;
        $scope.unixTime     = Math.floor(build.date / 1e3);
        $scope.buildCommit  = build.commit;

        $scope.bodyClass = settingService.get('bodyClass');
      };

    init();
  }]);
});
