var bcrypt = require('bcrypt-nodejs'),
 jwt = require('jwt-simple');

module.exports = function(app) {

    // const Users = app.models.Users;
    const Produtos = app.models.Produtos;
    // const ProductTypes = app.models.ProductTypes;

    const Vendas = app.models.Vendas;
    // const cfg = app.infra.config;
    const service = '/produtos';

    app.route(service)
        .all(app.utils.Auth.authenticate('usuario'))
        .get(function(req, res) {

            Produtos.aggregate([
                {$match: {
                        user: req.user._id
                    }
                },
                {$group: 
                    { _id: {isbn: "$isbn", nome: "$name", tipo: "$tipo"}, 
                      quantidade: {$sum: "$qtd"},
                      // nome: { $push: "$name"}, 
                      // tipo: { $push: "$type"}, 
                      avgAmount: {
                        $avg: { 
                            $multiply: ["$value", "$qtd"]
                        }
                      }
                  }
               }
            ], function  (err, result) {
                if(err){
                    console.log(err)
                    res.sendStatus(412).end();
                }else{
                    res.status(200).json(result).end();
                }
            });

        });

    app.route('/products')
        .all(app.utils.Auth.authenticate('usuario'))
        .get(function(req, res) {

            Produtos.find({})
                .then(function  (produtos) {

                    res.status(200).json(produtos).end();
                    
                }).catch(function  (err) {
                   res.sendStatus(412).end(); 
                });

        });

};
