var bcrypt = require('bcrypt-nodejs'),
 jwt = require('jwt-simple');

module.exports = function(app) {

    const Users = app.models.Users;
    const UserTypes = app.models.UserTypes;
    const cfg = app.infra.config;
    const service = '/users';

    app.route(service + '/logista')
        .post(function(req, res) {

            UserTypes.findOne({
                    name: 'Logista'
                })
                .then(function(userType) {

                    new Users({
                            name: req.body.proprietario,
                            empresa: req.body.empresa,
                            pass: req.body.password,
                            cnpj: req.body.cnpj,
                            email: req.body.email,
                            type: userType._id
                        })
                        .save(function(err, usuario) {
                            if (!err) {
                                res.status(200).json(usuario).end();
                            } else {
                                console.log(err);
                                res.sendStatus(400).end();
                            }
                        });
                }).catch(function(err) {
                    console.log(err);
                    res.sendStatus(412).end();
                });

        });

    app.route(service + '/login')
        .post(function get(req, res) {

            var email = req.body.email;
            var pass = req.body.password;

            Users.findOne({
                email: email
            }, function(err, user) {

              // console.log(user);

                if (user && !err) {
                    if (bcrypt.compareSync(pass, user.pass)) {

                        const playload = {
                            _id: user._id
                        };

                        res.status(200).json({
                            token: jwt.encode(playload, cfg.secret),
                            name: user.name,
                            _id: user._id
                        }).end();

                    } else {
                        res.sendStatus(400).end();
                    }
                } else {
                    res.sendStatus(400).end();
                }
            });

        });
};
