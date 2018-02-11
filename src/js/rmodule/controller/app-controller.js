define(['app'], function (app) {
  app.controller('appController', ['$rootScope', '$location', '$window', function appControllerFactory($rootScope, $location, $window) {
    var
      app = this,

      leftAnchors   = [],
      rightAnchors  = [],

      createAnchor = function createAnchor(name, href, title, icon, disabled) {
        var
          anchor = {};

        anchor.name     = name;
        anchor.href     = href;
        anchor.title    = title;
        anchor.icon     = icon;
        anchor.enabled  = !disabled;

        return anchor;
      },

      setMenu = function setMenu() {
        leftAnchors.push(
          createAnchor('help',  '#!/help', 'Help',  'question-circle')
        );

        rightAnchors.push(
          createAnchor('about', '#!/',     'About', 'home')
        );
      },

      isAnchorSelected = function isAnchorSelected(anchor) {
        var
          path = '#!' + $location.path();

        return anchor.href === path;
      },

      onFocused = function onFocused() {
        $rootScope.$broadcast('window:focus');
      },

      init = function init() {
        app.isAnchorSelected  = isAnchorSelected ;
        app.leftAnchors       = leftAnchors;
        app.rightAnchors      = rightAnchors;

        $window.onfocus = onFocused;

        setMenu();
      };

    init();
  }]);
});
