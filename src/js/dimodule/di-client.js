var
  di = require('./di');

di.set('package', require('../../../package'));

require('./socket-client');

module.exports = di;
