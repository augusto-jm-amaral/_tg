module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        order: {
          type: Number,
          required: true
        }
    });

    return mongoose.model('ProductTypes', schema);
};
