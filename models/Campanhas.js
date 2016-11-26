module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        nome: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            required: true,
            default: 0
        },
        produto: {
              // type: [{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Produtos',
                  required: true
              // }]
        },
        user: {
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

    return mongoose.model('Campanhas', schema);
};
