var
  TASK_CONFIG = {
    'bower' : {
      'install' : {
        'options' : {
          'copy' : false
        }
      }
    },

    'browserify' : {
      'target' : {
        'files': [
          {
            'expand'  : true,
            'src'     : 'client-bootstrap.js',
            'dest'    : 'build/precompiled/js'
          }
        ]
      }
    },

    'clean' : {
      'coverage' : 'test/coverage',

      'precompiled' : 'build/precompiled',
      'compiled'    : 'build/compiled',
      'minified'    : 'build/minified'
    },

    'concat' : {
      'options': {
        'separator': ';'
      },

      'compiled' : {
        'files': {
          'build/compiled/js/bootstrap.js' : ['bower_components/requirejs/require.js', 'build/precompiled/js/template.js', 'build/precompiled/js/client-bootstrap.js']
        }
      }
    },

    'copy' : {
      'asset_compiled' : {
        'expand'  : true,
        'cwd'     : 'asset/',
        'src'     : '**/*',
        'dest'    : 'build/compiled/'
      },

      'asset_minified' : {
        'expand'  : true,
        'cwd'     : 'asset/',
        'src'     : '**/*',
        'dest'    : 'build/minified/'
      },

      'view' : {
        'expand'  : true,
        'cwd'     : 'src/html/view',
        'src'     : '**/*',
        'dest'    : 'build/compiled'
      },

      'js_lib_client' : {
        'expand'  : true,
        'cwd'     : 'bower_components',
        'src'     : '**/*',
        'dest'    : 'build/compiled/js/lib'
      },

      'js_src_client' : {
        'expand'  : true,
        'cwd'     : 'src/js/client',
        'src'     : '**/*',
        'dest'    : 'build/compiled/js'
      }
    },

    'cssmin' : {
      'options': {
        'shorthandCompacting': false,
        'roundingPrecision': -1
      },

      'minified': {
        'files': [
          {
            'src'   : 'build/compiled/css/app.css',
            'dest'  : 'build/minified/css/app.css'
          }
        ]
      }
    },

    'env' : {
      'coverage': {
        'SRC_COVERAGE' : '../test/coverage/instrument/src/js'
      }
    },

    'gh-pages' : {
      'options': {
        'base': 'build/minified',
        'user': {
          'name': '<%= pkg.author.name %>',
          'email': '<%= pkg.author.email %>'
        }
      },

      'src': ['**/*']
    },

    'htmlmin' : {
      'minified': {
        'options': {
          'removeComments'      : true,
          'collapseWhitespace'  : true
        },

        'files': [
          {
            'expand'  : true,
            'src'     : ['*.html'],
            'cwd'     : 'build/compiled',
            'dest'    : 'build/minified'
          }
        ]
      }
    },

    'instrument' : {
      'files' : 'src/js/**/*.js',

      'options' : {
        'lazy'      : true,
        'basePath'  : 'test/coverage/instrument'
      }
    },

    'jasmine_nodejs' : {
      'options' : {
        'random' : true
      },

      'all' : {
        'specs' : 'test/spec/node/**/*.spec.js'
      }
    },

    'jscs' : {
      'options' : {
        'disallowTrailingWhitespace'            : true,
        'disallowTrailingComma'                 : true,
        'disallowFunctionDeclarations'          : true,
        'disallowNewlineBeforeBlockStatements'  : true,
        'disallowMixedSpacesAndTabs'            : true,
        'requireDotNotation'                    : true,
        'requireMultipleVarDecl'                : true,
        'requireSpaceAfterKeywords'             : true,
        'requireSpaceBeforeBlockStatements'     : true,
        'requireSpacesInConditionalExpression'  : true,
        'requireCurlyBraces'                    : true,
        'disallowKeywordsOnNewLine'             : ['else'],
        'validateIndentation'                   : 2,
        'requireSpacesInFunction' : {
          'beforeOpeningCurlyBrace' : true
        }
      },

      'default' : ['*.js', 'config', 'src', 'test/spec']
    },

    'jshint' : {
      'options': {
        'globals'     : {
          'define'    : false,
          'requirejs' : false,
          'inject'    : false
        },

        'jasmine'     : true,
        'browser'     : true,
        'curly'       : true,
        'eqeqeq'      : true,
        'eqnull'      : true,
        'latedef'     : true,
        'newcap'      : true,
        'node'        : true,
        'nonew'       : true,
        'nonbsp'      : true,
        'quotmark'    : 'single',
        'undef'       : true,
        'debug'       : true,
        'indent'      : 2
      },

      'default' : ['*.js', 'config', 'src', 'test/spec'],

      'strict' : {
        'options' : {
          'noempty' : true,
          'unused'  : 'vars'
        },

        'files' : {
          'src' : ['*.js', 'config', 'src', 'test/spec']
        }
      }
    },

    'karma' : {
      'unit' : {
        'configFile' : 'test/karma.conf.js'
      }
    },

    'makeReport' : {
      'src' : 'test/coverage/reports/**/*.json',

      'options' : {
        'type'  : 'lcov',
        'dir'   : 'test/coverage/reports',
        'print' : 'detail'
      }
    },

    'md5symlink' : {
      'options' : {
        'patterns' : ['.js', '.css']
      },

      'minified': {
        'src'   : 'build/minified/**/*',
        'dest'  : 'build/minified'
      }
    },

    'ngtemplates' : {
      'default' : {
        'cwd'         : 'src/html/template',
        'src'         : '**/*.html',
        'dest'        : 'build/precompiled/js/template.js',
        'options'     : {
          'bootstrap': function (module, script) {
            // This predefines a function which will populate the angular
            // cache with the template HTML. Check out the generated
            // template.js under the build directory, you'll need to call
            // it with your angular app instance.
            return 'window.angularTemplates = function angularTemplates(app) { app.run([\'$templateCache\', function ($templateCache) { ' + script + ' } ]) };';
          },

          // Reference existing task.
          'htmlmin' : {
            'collapseWhitespace'        : true,
            'collapseBooleanAttributes' : true
          }
        }
      }
    },

    'requirejs' : {
      'compile' : {
        'options': {
          'baseUrl'         : 'build/compiled/js',
          'mainConfigFile'  : 'client-bootstrap.js',
          'include'         : ['bootstrap.js'],
          'out'             : 'build/minified/js/bootstrap.js'
        }
      }
    },

    'storeCoverage' : {
      'options' : {
        'dir' : 'test/coverage/reports'
      }
    },

    'stylus' : {
      'options' : {
        // Use import statements on css as copy inclusion.
        'include css' : true,
        'compress'    : false
      },

      'compiled' : {
        'files': [
          {
            'src'     : 'src/styl/main.styl',
            'dest'    : 'build/compiled/css/app.css'
          }
        ]
      }
    },

    'symlinkassets' : {
      'minified': {
        'root'  : 'minified',
        'src'   : 'build/minified/**/*',
        'dest'  : 'build/minified'
      }
    },

    'watch' : {
      'asset' : {
        'files' : ['asset/**/*'],
        'tasks' : ['copy:asset_compiled', 'copy:asset_minified']
      },

      'bootstrap' : {
        'files' : ['client-bootstrap.js'],
        'tasks' : ['browserify', 'concat:compiled']
      },

      'client' : {
        'files' : ['src/js/client/**/*.js', 'test/spec/client/**/*.js'],
        'tasks' : ['copy:js_src_client', 'test:client']
      },

      'html' : {
        'files' : ['src/html/**/*.html'],
        'tasks' : ['ngtemplates', 'concat:compiled', 'copy:view']
      },

      'styl' : {
        'files' : ['src/styl/**/*'],
        'tasks' : ['stylus:compiled']
      }
    }
  },

  TASKS = {
    'coverage' : [
      'clean:coverage',
      'env:coverage',
      'instrument',
      'jasmine_nodejs',
      'storeCoverage',
      'makeReport'
    ],

    'test:core' : [
      'jshint:default',
      'jasmine_nodejs'
    ],

    'test:client' : [
      'karma'
    ],

    'test:style' : [
      'jshint:strict',
      'jscs'
    ],

    'compile' : [
      'clean:precompiled',
      'clean:compiled',
      'browserify',
      'ngtemplates',
      'concat:compiled',
      'stylus:compiled',
      'copy:js_src_client',
      'copy:js_lib_client',
      'copy:view',
      'copy:asset_compiled'
    ],

    'minify' : [
      'clean:minified',
      'htmlmin:minified',
      'cssmin:minified',
      'copy:asset_minified',
      'requirejs'
    ],

    'md5' : [
      'md5symlink',
      'symlinkassets'
    ],

    'build:dev' : [
      'test:core',
      'compile',
      'test:client'
    ],

    'build' : [
      'compile',
      'minify',
      'md5'
    ],

    'test' : [
      'test:core',
      'test:client',
      'test:style'
    ],

    'dev' : [
      'clean',
      'build:dev',
      'watch'
    ],

    'publish' : [
      'clean',
      'bower',
      'build',
      'gh-pages'
    ],

    'default' : [
      'bower',
      'test:style',
      'coverage',
      'build',
      'test:client'
    ]
  },

  runGrunt = function runGrunt(grunt) {
    var
      registerTask = function registerTask(taskName, task) {
        grunt.registerTask(taskName, task);
      },

      registerTasks = function registerTasks(tasks) {
        var
          taskName;

        for (taskName in tasks) {
          registerTask(taskName, tasks[taskName]);
        }
      },

      init = function init() {
        grunt.initConfig(TASK_CONFIG);

        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-jasmine-nodejs');
        grunt.loadNpmTasks('grunt-jscs');
        grunt.loadNpmTasks('grunt-istanbul');
        grunt.loadNpmTasks('grunt-env');
        grunt.loadNpmTasks('grunt-angular-templates');
        grunt.loadNpmTasks('grunt-bower-task');
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-requirejs');
        grunt.loadNpmTasks('grunt-contrib-stylus');
        grunt.loadNpmTasks('grunt-gh-pages');
        grunt.loadNpmTasks('grunt-md5symlink');
        grunt.loadNpmTasks('grunt-symlinkassets');
        grunt.loadNpmTasks('grunt-karma');

        registerTasks(TASKS);
      };

    init();
  };

module.exports = runGrunt;