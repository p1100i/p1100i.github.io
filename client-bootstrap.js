var
  html = document.getElementsByTagName('html')[0],

  init = function init() {
    var
      file,
      karma = window && window.__karma__,
      files = karma && karma.files,

      karmaRequirejsConfig = {
        'baseUrl' : '/base/js/client'
      },

      // Workaround so, r.js ignores it on minifaction.
      karmaDeps = ['../lib/angular-mocks/angular-mocks'],

      onRequireJsFinished = function onRequireJsFinished() {
        if (karma) {
          requirejs(karmaDeps, function () {
            karma.start();
          });
        }
      };

    for (file in files) {
      if (/absolute.*spec\.js$/g.test(file)) {
        karmaDeps.push(file);
      }
    }

    requirejs.config({
      'baseUrl': '/js/client',

      'urlArgs' : function () {
        return '?' + Math.random().toString(36).slice(2);
      },

      'paths' : {
        'angular'         : '../lib/angular/angular',
        'angularCookies'  : '../lib/angular-cookies/angular-cookies',
        'angularRoute'    : '../lib/angular-route/angular-route'
      },

      'shim' : {
        'angular'  :{
          'exports' : 'angular'
        },

        'angularCookies' : {
          'deps'    : ['angular'],
          'exports' : 'angularCookies'
        },

        'angularRoute' : {
          'deps'    : ['angular'],
          'exports' : 'angularRoute'
        }
      }

    });

    if (karma) {
      requirejs.config(karmaRequirejsConfig);
    }

    //
    // List all of your services/constants/controllers/etc, here.
    //
    requirejs([
      'angular',
      'app',
      'angularCookies',
      'angularRoute',
      'constant/route-config',
      'controller/about-controller',
      'controller/app-controller',
      'controller/help-controller',
      'directive/help-directive',
      'factory/magic-service',
      'factory/setting-service'
    ], function (angular, app) {
      app.config(['$routeProvider', 'routeConfig', function ($routeProvider, routeConfig) {
        var
          i,
          path,
          paths,
          controller,
          route,
          routes = routeConfig.routes;

        for (controller in routes) {
          route = routes[controller];
          paths = route.paths;

          for (i = 0; i < paths.length; i++) {
            path = paths[i];

            $routeProvider.when(path, {
              'controller'  : controller,
              'templateUrl' : route.templateUrl
            });
          }
        }

        $routeProvider.otherwise({
          redirectTo : '/'
        });
      }]);

      window.angularTemplates(app);

      angular.bootstrap(html, ['app']);

      onRequireJsFinished();
    });
  };

window.onload = init;
