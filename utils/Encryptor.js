const bcrypt = require('bcrypt-nodejs');

function Encryptor() {

  var clazz = {
    encryptPass: function (pass) {
      return bcrypt.hashSync(pass, bcrypt.genSaltSync());
    }
  };

  return clazz;
};

module.exports = function (app) {

  return Encryptor;
};
