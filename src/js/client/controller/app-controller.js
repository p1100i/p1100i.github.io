define(['app'], function (app) {
  app.controller('appController', ['$rootScope', '$scope', 'settingService', function appControllerFactory($rootScope, $scope, settingService) {
    var
      init = function init() {
        $scope.bodyClass = settingService.get('bodyClass');
      };

    init();
  }]);
});
