var
  depi          = require('depi'),
  shortMethods  = require('short-methods');

depi.set('build', require('./build.js'));

shortMethods(true);

module.exports = depi;
