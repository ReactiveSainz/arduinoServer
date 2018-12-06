'use strict';

module.exports = function(Registro) {
  Registro.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      ctx.instance.date = new Date();
    } else {
      ctx.data.date = new Date();
    }
    next();
  });

  Registro.remoteMethod('postValue', {
    accepts: [
      {arg: 'temperatura', type: 'number', required: true},
    ],

    returns: [{arg: 'status', type: 'string'}],
  });

  Registro.postValue = function(temperatura, cb) {
    console.log('temp to post:', temperatura);
    
    return Registro.create({temperatura}, function(error, Datos) {
      if (error) console.log(error);
      return cb(null, 'ok');
    });
  };
};
