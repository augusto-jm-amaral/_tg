var passport = require('passport');
var passportJwt = require('passport-jwt');

module.exports = function (app) {

  var Users = app.models.Users;
  var cfg = app.infra.config;
  var Strategy = passportJwt.Strategy;

  var opts = {};

  opts.secretOrKey = cfg.secret;
  opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeader();

  passport.use('usuario',new Strategy(opts, function(playload, done){

      var promise = Users.findById(playload._id);
      promise.then(function (usuario) {
        if(usuario){
          return done(null, usuario);
        }
        return done(null, false);
      }).catch(function (err) {
        return done(null, false);
      });
  }));

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function(permissao){
      return passport.authenticate(permissao, cfg.jwtSession);
    }
  };

};
