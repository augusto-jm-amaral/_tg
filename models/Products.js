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
        value: {
            type: Number,
            required: true
        },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductTypes',
            required: true
        },
        photos: {
              type: [{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Photos'
              }]
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

    return mongoose.model('Products', schema);
};
