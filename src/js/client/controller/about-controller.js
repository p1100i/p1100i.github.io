define(['app'], function (app) {
  app.controller('aboutController', ['$rootScope', '$scope', function AboutControllerFactory($rootScope, $scope) {
    var
      PROJECTS = [
        [
          'expendebles',
          'Your personal privacy-respecting cashflow app.',
          'https://p1100i.github.io/expendebles',
          'bank'
        ],

        [
          'jsorted',
          'Visual and audio demo of some sorting methods.',
          'https://p1100i.github.io/jsorted',
          'bar-chart'
        ],

        [
          'generator-morf',
          'A yeoman generator to bootstrap a finely tuned [node, angular] project.',
          'https://www.github.com/p1100i/generator-morf',
          'space-shuttle'
        ],

        [
          'quadtree2.js',
          '2d spatial indexing structure.',
          'https://p1100i.github.io/quadtree2.js',
          'map'
        ],

        [
          'click-da-game-of-life.js',
          'JS implementation of Conways - Game Of Life.',
          'https://p1100i.github.io/click-da-game-of-life.js',
          'th'
        ]
      ],

      createProject = function createProject(name, description, href, icon) {
        return {
          'name'        : name,
          'description' : description,
          'href'        : href,
          'icon'        : icon
        };
      },

      getProjects = function getProjects() {
        var
          i,
          projects = [];

        for (i = 0; i < PROJECTS.length; i++) {
          projects.push(createProject.apply(null, PROJECTS[i]));
        }

        return projects;
      },

      init = function init() {
        $scope.projects = getProjects();
      };

    init();
  }]);
});
