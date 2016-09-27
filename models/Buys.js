module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        products: {
              type: [{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Products'
              }]
        },
        userSell: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        userBuy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
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

    return mongoose.model('Buys', schema);
};
