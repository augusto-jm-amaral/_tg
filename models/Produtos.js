module.exports = function(app) {

    var mongoose = app.infra.db;
    var Schema = mongoose.Schema;

    var schema = new Schema({
        isbn: {
          type: Number,
          required: true
        },
        vendaIsbn: {
            type: Number,
            required: true
        },
        // buy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Buys',
        //     required: true
        // },
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
        qtd: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            // ref: 'ProductTypes',
            required: true
        },
        // type: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'ProductTypes',
        //     required: true
        // },
        // photos: {
        //       type: [{
        //           type: mongoose.Schema.Types.ObjectId,
        //           ref: 'Photos'
        //       }]
        // },
        tamanho:{
          type: String
        },
        cor: {
          type: String
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

    return mongoose.model('Produtos', schema);
};
