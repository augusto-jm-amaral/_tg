module.exports = function(app) {

    var cfg = {
        secret: 'TCC',
        jwtSession: {
            session: false
        }
    };

  return cfg;
};
