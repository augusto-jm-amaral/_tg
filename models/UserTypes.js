module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        name: {
            type: String,
            required: true
        },
        order: {
          type: Number,
          required: true,
          index: {
            unique: true
          }
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

    return mongoose.model('UserTypes', schema);
};
