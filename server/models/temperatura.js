'use strict';

module.exports = function(Temperatura) {
  Temperatura.remoteMethod('postValue', {
    accepts: [{arg: 'value', type: 'number', required: true}],
    returns: [{arg: 'status', type: 'string'}],
  });
  Temperatura.postValue = function(value, cb) {
    return Temperatura.create({value}, function(error, Temperatura) {
      if (error) console.log(error);
      return cb(null, 'ok');
    });
  };
};
