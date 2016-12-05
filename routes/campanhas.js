// var bcrypt = require('bcrypt-nodejs'),
//  jwt = require('jwt-simple');

module.exports = function(app) {

    const Produtos = app.models.Produtos;
    const Campanhas = app.models.Campanhas;
    const Cupons = app.models.Cupons;
    const Vendas = app.models.Vendas;

    const service = '/campanhas';

    app.route('/promocoes')
        .all(app.utils.Auth.authenticate('usuario'))
        .get(function  (req, res) {

          Cupons.aggregate([
              {
                $match: {
                      user: req.user._id
                  }
              },
              {
                $group: { _id: null, isbns: {$addToSet: "$isbn"}}
              }
          ], function (err, result) {
            console.log(result);
            if(err || result.length == 0){
              console.log(err);
              res.sendStatus(400).end();
            }else{

              Vendas.aggregate([
                  {
                    $match: {
                          isbn: {$in : result[0].isbns}
                      }
                  },
                  {
                    $group: { _id: null, idsProdutos: {$addToSet: "$produtos"} }
                  }
              ], function (err, result) {


                console.log('Produtos: '+ JSON.stringify(result));
                if(err || (result.length == 0)){
                  console.log(err);
                  res.sendStatus(400).end();
                }else{

                  var aux = [];

                  result[0].idsProdutos.forEach(function (element, index, array) {
                    element.forEach(function (ele, ind, arr) {
                      var existe = false;
                      aux.forEach(function (e, i, a) {
                        if((ele+'') == (e+'')){
                          existe = true;
                        }
                      });

                      if(!existe){
                        aux.push(ele);
                      }

                    });
                  });

                  console.log('Aux: '+ JSON.stringify(aux));

                  Produtos.aggregate([
                      {
                        $match: {
                              _id: {$in: aux}
                          }
                      },
                      {
                        $group: { _id: null, types: {$addToSet: "$type"}}
                      }
                  ], function (err, result) {

                    if(err || result.length == 0){
                      console.log(err);
                      res.sendStatus(400).end();
                    }else{
                      // Produtos.find({$type: {$in: result[0].types}})
                      //   .then(function (res) {
                      console.log(result);

                      Produtos.aggregate([
                          {
                            $match: {
                                  type: {$in: result[0].types}
                              }
                          },
                          {
                            $group: { _id: null, p_ids: {$addToSet: "$_id"}}
                          }
                      ], function (err, result) {

                        console.log(result);

                        if(err || result.length == 0){
                          console.log(err);
                          res.sendStatus(400).end();
                        }else{

                          Campanhas.find({produto: {$in: result[0].p_ids}})
                            .populate('produto')
                            .populate('user')
                            .then(function (result) {
                              res.status(200).json(result).end();
                            }).catch(function (err) {

                              console.log(err);
                              res.sendStatus(400).end();
                            });

                        }
                          // res.sendStatus(200).end();
                          // console.log(result);

                    });
                   }
                  });
                }
              });

            }

          });

        });

    app.route(service)
        .all(app.utils.Auth.authenticate('usuario'))
        .post(function  (req, res) {

            console.log(req.body);
            // Produtos.findOne({
            //     isbn: req.body.produto.isbn
            // }).then(function  (produto) {

                new Campanhas({
                    nome: req.body.nome,
                    desc: req.body.desc,
                    produto: req.body.produto,
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
            });
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
