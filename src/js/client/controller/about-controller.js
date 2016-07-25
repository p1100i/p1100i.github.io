define(['app'], function (app) {
  app.controller('aboutController', ['$rootScope', '$scope', function AboutControllerFactory($rootScope, $scope) {
    var
      getSolarizedColorSets = function getSolarizedColorSets() {
        var
          i,
          j,
          set,
          sets = [];

        for (i = 0; i < 4; i++) {
          set = [];

          for (j = 0; j < 5; j++) {
            set.push('solarized-' + (i * 5 + j));
          }

          sets.push(set);
        }

        return sets;
      },

      getCustomColorSets = function getCustomColorSets() {
        return [
          ['navy', 'blue', 'aqua', 'teal', 'olive'],
          ['green', 'lime', 'yellow', 'gold', 'orange'],
          ['red', 'maroon', 'fuchsia', 'purple', 'white'],
          ['grey-white', 'grey-light', 'grey', 'grey-dark', 'grey-black']
        ];
      },

      init = function init() {
        $scope.title        = 'Welcome to home';
        $scope.description  = 'homepage of p1100i';

        $scope.customColorSets    = getCustomColorSets();
        $scope.solarizedColorSets = getSolarizedColorSets();
      };

    init();
  }]);
});
