module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        produtos: {
              type: [{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Produtos'
              }]
        },
        isbn:{
          type: Number,
          required: true,
          index: {
            unique: true
          }
        },
        value: {
          type: Number,
          required: true,
          default: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        cpfUserBuy: {
          type: Number,
          required: true
        },
        register: {
          type: Date,
          required: true,
          default: new Date()
        },
        update: {
          type: Date,
          required: true,
          default: new Date()
        }
    });

    return mongoose.model('Vendas', schema);
};
