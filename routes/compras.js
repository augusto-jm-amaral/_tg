module.exports = function(app) {

    const Users = app.models.Users;
    const Cupons = app.models.Cupons;
    const Vendas = app.models.Vendas;
    const cfg = app.infra.config;

    const service = '/compras';

    app.route(service)
        .all(app.utils.Auth.authenticate('usuario'))
        .post(function(req, res) {

            new Cupons({
              isbn: req.body.isbn,
              user: req.user._id
            }).save(function (err, _cupom) {
              if(err){
                res.sendStatus(200).end();
              }else{
                res.sendStatus(200).end();
              }
            });

        })
        .get(function  (req, res) {

          Cupons.aggregate([
              {
                $match: {
                      user: req.user._id
                  }
              },
              {
                $group:
                  { _id: "$isbn"}

              }
          ], function (err, result) {

            console.log(result);

            if(err){
              console.log(err);
              res.sendStatus(412).end();

            }else{

              Vendas.find({isbn: {$in : result}})
              .populate('produtos')
              .populate('user')
              .then(function  (vendas) {
                res.status(200).json(vendas).end();
              })
              .catch(function  (err) {
                console.log(err);
                res.sendStatus(412).end();
              });

            }
          });
            // .then(function (cupons) {
            //
            //
            // }).catch(function (err) {
            //   console.log(err);
            //   res.sendStatus(412).end();
            // })
        });

};
