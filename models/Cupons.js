module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        isbn: {
            type: Number,
            required: true,
            index: {
              unique: true
            }
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
        }
    });

    return mongoose.model('Cupons', schema);
};
