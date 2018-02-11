define(['app'], function (app) {
  app.controller('divideController', ['$location', '$window', function DivideControllerFactory($location, $window) {
    var
      divide = this,

      items = [],

      control = {
        'tries' : {},
        'sum'   : {}
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

        control.sum   = createItem('220');
        control.tries = createItem('100');
      },

      save = function save() {
        var
          serialized  = $window.JSON.stringify(items),
          bookmark    = $window.btoa(serialized);

        $location.search('items', bookmark);

        divide.bookmark = $location.absUrl();
      },

      reparse = function reparse() {
        var
          len = items.length;

        while (len--) {
          refine(items[len]);
        }

        refine(control.sum);
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

        if (!control.sum.value) {
          control.sum.css = 'bg-solarized-1';
          valid = false;
        } else {
          control.sum.css = '';
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
          sum,
          success,
          tries     = control.tries.value,
          used      = [];

        while (--tries) {
          used.clear();

          sum = control.sum.value;

          while (sum > 0) {
            use  = pickRandom();
            sum -= use.value;

            used.push(use.str);
          }

          if (sum === 0) {
            success = true;
            used.push('+ ===========');
            used.push(control.sum.value);
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

        divide.solution = used.join('\n');
      },

      removeItem = function removeItem(item) {
        items.remove(item);
      },

      init = function init() {
        divide.removeItem = removeItem;
        divide.reparse    = reparse;
        divide.control    = control;
        divide.example    = example;
        divide.run        = run;
        divide.save       = save;
        divide.items      = items;
        divide.addItem    = addItem;

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
