'use strict';

module.exports = function(Temperatura) {
  Temperatura.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      ctx.instance.date = new Date();
    } else {
      ctx.data.date = new Date();
    }
    next();
  });

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
