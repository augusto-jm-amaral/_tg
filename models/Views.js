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
        campaigns: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaigns',
            required: true
        },
        register: {
          type: Date,
          required: true,
          default: new Date()
        }
    });

    return mongoose.model('Views', schema);
};
