var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        name: {
            type: String,
            required: true
        },
        empresa: {
          type: String
        },
        email: {
          type: String,
          index: {
            unique: false
          },
          required: true
        },
        cnpj: {
          type: Number
        },
        pass: {
            type: String,
            required: true
        },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserTypes',
            required: true
        },
        loc: {
            type: {
                type: 'String',
                default: 'Point'
            },
            coordinates: [Number]
        },
        receive: {
              type: [{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Campaigns'
              }]
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

    // schema.method('validPass', function(encodedPassword, password) {
    //     return bcrypt.compareSync(password, encodedPassword);
    // });

    schema.pre('save', function (next) {

      var salt = bcrypt.genSaltSync();
      this.pass = bcrypt.hashSync(this.pass, salt);

      next();
    });

    return mongoose.model('Users', schema);
};
