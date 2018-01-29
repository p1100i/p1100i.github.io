define(['app'], function (app) {
  app.controller('divideController', ['$scope', '$location', '$window', 'settingService', function DivideControllerFactory($scope, $location, $window, settingService) {
    var
      items = [],

      control = {
        'tries'   : {},
        'divide'  : {}
      },

      refine = function refine(item) {
        item.value = parseInt(item.str) || 0;

        return item;
      },

      createItem = function createItem(str) {
        var
          item = {
            'str' : str
          };

        return refine(item);
      },

      addItem = function addItem(str) {
        items.push(createItem(str));
      },

      example = function example() {
        addItem('10 - milka');
        addItem('50 - cinimini');
        addItem('110 - nutella');
        addItem('40 - cucumber');

        control.divide  = createItem('220');
        control.tries   = createItem('100');
      },

      save = function save() {
        var
          serialized  = $window.JSON.stringify(items),
          bookmark    = $window.btoa(serialized);

        $location.search('items', bookmark);

        $scope.bookmark = $location.absUrl();
      },

      reparse = function reparse() {
        var
          len = items.length;

        while (len--) {
          refine(items[len]);
        }

        refine(control.divide);
        refine(control.tries);
      },

      pickRandom = function pickRandom() {
        var
          i = Math.floor(Math.random() * items.length);

        return items[i];
      },

      validate = function validate() {
        var
          valid = true;

        if (!control.tries.value) {
          control.tries.css = 'bg-solarized-1';
          valid = false;
        } else {
          control.tries.css = '';
        }

        if (!control.divide.value) {
          control.divide.css = 'bg-solarized-1';
          valid = false;
        } else {
          control.divide.css = '';
        }

        return valid;
      },

      run = function run() {
        reparse();

        if (!validate()) {
          return;
        }

        var
          use,
          divide,
          success,
          tries     = control.tries.value,
          used      = [];

        while (--tries) {
          used.clear();

          divide = control.divide.value;

          while (divide > 0) {
            use     = pickRandom();
            divide -= use.value;

            used.push(use.str);
          }

          if (divide === 0) {
            success = true;
            used.push('+ ===========');
            used.push(control.divide.value);
            break;
          }
        }

        tries = control.tries.value - tries;

        if (!success) {
          used.clear();
          used.push('~~~~~~~~~~~~~~~');
          used.push('FAIL - Could not calculate it with ' + tries + ' tries');
        } else {
          used.push('~~~~~~~~~~~~~~~');
          used.push('SUCCES - Calculated with ' + tries + ' tries');
        }

        $scope.solution = used.join('\n');
      },

      removeItem = function removeItem(item) {
        items.remove(item);
      },

      init = function init() {
        $scope.removeItem = removeItem;
        $scope.reparse    = reparse;
        $scope.control    = control;
        $scope.example    = example;
        $scope.run        = run;
        $scope.save       = save;
        $scope.items      = items;
        $scope.addItem    = addItem;

        control.tries   = createItem('100');

        var
          urlItems = $location.search().items;

        if (urlItems) {
          urlItems = $window.atob(urlItems);
          urlItems = $window.JSON.parse(urlItems);

          items.copy(urlItems);
        }
      };

    init();
  }]);
});
