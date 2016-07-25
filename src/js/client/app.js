define('app', ['angular'], function app(angular) {
  var
    angularApp = angular.module('app', ['ngRoute', 'ngCookies']);

  angularApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }]);

  return angularApp;
});
