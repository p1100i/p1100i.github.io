define(['app'], function (app) {
  app.factory('magicService', ['$sce', '$timeout', '$window', '$routeParams', function magicService($sce, $timeout, $window, $routeParams) {
    var
      id = 1,

      WORDS = [
      ],

      getId = function getId() {
        return id++;
      },

      getIdParam = function getIdParam() {
        var
          id = $routeParams.editId || $routeParams.id;

        if (!id) {
          return;
        }

        id = parseInt(id, 10);

        return id;
      },

      enqueueDigest = function enqueueDigest(timeout) {
        $timeout(function () {}, timeout);
      },

      getBy = function getBy(array, key, value, returnIndex) {
        var
          i,
          item;

        if (key === undefined || value === undefined) {
          return returnIndex ? -1 : undefined;
        }

        for (i = 0; i < array.length; i++) {
          item = array[i];


          if (item[key] === value) {
            return returnIndex ? i : item;
          }
        }

        return returnIndex ? -1 : undefined;
      },

      getIndexBy = function getIndexBy(array, key, value) {
        return getBy(array, key, value, true);
      },

      random = function random(number) {
        return Math.floor(Math.random() * number);
      },

      getRandomElement = function getRandomElement(array) {
        return array[random(array.length)];
      },

      safeStringify = function safeStringify(object) {
        var
          result;

        try {
          result = JSON.stringify(object);
        } catch (e) {
          result = 'Could not convert to JSON:' + e;
        }

        return result;
      },

      removeAt = function removeAt(array, index) {
        array.splice(index, 1);

        return array;
      },

      sanitizeAsId = function sanitizeAsId(id) {
        if (id && id.match) {
          return id.match(/[A-Za-z-_0-9]/g).join('');
        }

        return '';
      },

      getRandomWord = function getRandomWord() {
        return getRandomElement(WORDS);
      },

      getRandomWords = function getRandomWords(count) {
        var
          i,
          words = [];

        for (i = 0; i < count; i++) {
          words.push(getRandomWord());
        }

        return words.join(' ');
      },

      clear = function clear(array) {
        array.splice(0, array.length);

        return array;
      },

      scrollTop = function scrollTop() {
        $window.scrollTo(0, 0);
      };

    return {
      'getId'               : getId,
      'getIdParam'          : getIdParam,
      'getBy'               : getBy,
      'getIndexBy'          : getIndexBy,
      'removeAt'            : removeAt,
      'random'              : random,
      'clear'               : clear,
      'scrollTop'           : scrollTop,
      'enqueueDigest'       : enqueueDigest,
      'safeStringify'       : safeStringify,
      'getRandomElement'    : getRandomElement,
      'getRandomWord'       : getRandomWord,
      'getRandomWords'      : getRandomWords,
      'sanitizeAsId'        : sanitizeAsId
    };
  }]);
});
