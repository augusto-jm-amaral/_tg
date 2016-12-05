const express = require('express');
const load = require('express-load');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

module.exports = function() {

    var app = express();

    var cors = require('cors')

    app.use(cors());

    app.use(bodyParser.json());
    app.use(express.static('./public'));
    app.use(expressValidator());

    load('infra')
        .then('models')
        .then('utils')
        .then('routes')
        .into(app);

    app.utils.Populate.UserTypes();
    // app.utils.Populate.ClearDb();

    return app;
};
