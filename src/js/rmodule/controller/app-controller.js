define(['app'], function (app) {
  app.controller('appController', ['$rootScope', '$location', '$window', function appControllerFactory($rootScope, $location, $window) {
    var
      app = this,

      leftAnchors   = [],

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
          createAnchor('about',  '#!/',       'About',  'home'),
          createAnchor('divide', '#!/divide', 'Divide', 'calculator')
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

        $window.onfocus = onFocused;

        setMenu();
      };

    init();
  }]);
});
