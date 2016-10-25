module.exports = function(app) {

    const Users = app.models.Users;
    const Produtos = app.models.Produtos;
    const Vendas = app.models.Vendas;
    const cfg = app.infra.config;

    const service = '/vendas';

    app.route(service)
        .all(app.utils.Auth.authenticate('usuario'))
        .post(function(req, res) {

            req.body.forEach(function  (venda, index) {
                
                Vendas.findOne({
                    isbn: venda.isbn
                }).then(function  (_venda) {

                    // console.log(_venda);

                    if(!_venda){

                        new Vendas({
                            isbn: venda.isbn,
                            user: req.user._id,
                            cpfUserBuy: venda.cpfComprador
                        }).save(function  (err, _venda) {

                            // console.log(err);
                            // console.log(_venda);

                            venda.produtos.forEach(function  (produto, index) {

                                new Produtos({
                                    vendaIsbn: venda.isbn,
                                    isbn: produto.isbn,
                                    name: produto.nome,
                                    desc: produto.desc,
                                    type: produto.tipo,
                                    value: produto.valor,
                                    qtd: produto.qtd,
                                    tamanho: produto.tamanho,
                                    cor: produto.cor,
                                    user: req.user._id
                                }).save(function  (err, _produto) {

                                    // console.log(_produto);

                                    Vendas.update({ _id: _venda._id },{$push: {produtos: _produto._id}}).exec();
                                    Vendas.update({ _id: _venda._id },{$inc: {value: (produto.valor *  produto.qtd)}}).exec();

                                    if(err)
                                        console.log(err)
                                });

                            });
                            
                        });

                    }

                }).catch(function  (err) {
                    console.log(err);
                })


            });

            res.sendStatus(200).end();

        })
        .get(function  (req, res) {
            
            Vendas.find({user: req.user._id})
                .populate('produtos')
                .then(function  (vendas) {
                    res.status(200).json(vendas).end();
                })
                .catch(function  (err) {
                    console.log(err);
                    res.sendStatus(412).end();
                })
        });

};
