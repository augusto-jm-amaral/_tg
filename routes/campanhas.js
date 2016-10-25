// var bcrypt = require('bcrypt-nodejs'),
//  jwt = require('jwt-simple');

module.exports = function(app) {

    const Produtos = app.models.Produtos;
    const Campanhas = app.models.Campanhas;
    // const ProductTypes = app.models.ProductTypes;

    // const Vendas = app.models.Vendas;
    // const cfg = app.infra.config;
    const service = '/campanhas';

    app.route(service)
        .all(app.utils.Auth.authenticate('usuario'))
        .post(function  (req, res) {

            // console.log(req.body);
            // Produtos.findOne({
            //     isbn: req.body.produto.isbn
            // }).then(function  (produto) {

                new Campanhas({
                    nome: req.body.nome,
                    desc: req.body.desc,
                    produto: req.body.produto._id,
                    user: req.user._id
                }).save(function  (err, campanha) {
                   if(err){
                    console.log(err);
                    res.sendStatus(412).end();
                   }else{
                    res.status(200).json(campanha).end();
                   } 
                }); 

            // }).catch(function  (err) {
            //     console.log(err);
            //     res.sendStatus(412).end();
            // });
            
        })
        .get(function(req, res) {

            Campanhas.find({user: req.user._id})
                .populate('produto')
                .then(function  (campanhas) {
                    res.status(200).json(campanhas).end();
                }).catch(function  (err) {
                    res.sendStatus(412).end();
                });

        })
        .put(function  (req,res) {
            
            Campanhas.update({_id: req.body._id}, {nome: req.body.nome, desc: req.body.desc, update: new Date(), produto: req.body.produto._id})
            .then(function  (campanha) {
                res.sendStatus(200).end();
            }).catch(function  (err) {
                console.log(err);
                res.sendStatus(412).end();
            })
        });

        app.route(service + '/:_id')
         .all(app.utils.Auth.authenticate('usuario'))
         .delete(function  (req,res) {
              
            Campanhas.remove({_id: req.params._id})
            .then(function  (campanha) {
                res.sendStatus(200).end();
            }).catch(function  (err) {
                console.log(err);
                res.sendStatus(412).end();
            })
         });

};
