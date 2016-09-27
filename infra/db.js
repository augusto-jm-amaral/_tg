var mongoose = require('mongoose');

module.exports = function(app) {

    var cfg = {
        url: 'mongodb://localhost/tcc',
        options: {
            // user: 'campushouseuser',
            // pass: 'C4W9UsH0uZe',
            server: {
                // poolSize: 10,
                // debug: true
            }
        }
    };

    mongoose.connect(cfg.url, cfg.options);
    mongoose.set('debug', true);
    mongoose.set('poolSize', 10);

    mongoose.connection.on('connected',  () => {
      console.log('Mongoose:: Conectado em ' + cfg.url);
    });

    mongoose.connection.on('disconnected',  () => {
      console.log('Mongoose:: Desconectado de ' + cfg.url);
    });

    mongoose.connection.on('error',  (erro) => {
      console.log('Mongoose:: Erro na conexão com ' + cfg.url + ', erro: ' + erro);
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongose:: Desconectado pelo termino da aplicação.');
        process.exit(0);
      });
    });

  return mongoose;
};
