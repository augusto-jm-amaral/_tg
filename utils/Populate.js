module.exports = function(app) {

    const UserTypes = app.models.UserTypes;
    const Vendas = app.models.Vendas;
    const Produtos = app.models.Produtos;

    // console.log(UserTypes);

    function PopulateDb() {
        var clazz = {
            // Insert UserTypes
            UserTypes: function() {

                UserTypes.findOne({
                        name: 'Logista'
                    })
                    .then(function(userTypes) {

                      if(!userTypes){
                        new UserTypes({
                          name: 'Logista',
                          order: '1'
                        }).save(function (err) {
                          console.log(err);
                        });
                      }

                    });

                UserTypes.findOne({
                        name: 'Consumidor'
                    })
                    .then(function(userTypes) {

                      if(!userTypes){
                        new UserTypes({
                          name: 'Consumidor',
                          order: '2'
                        }).save();
                      }

                    });

            },
            ClearDb: function  () {
              app.models.Produtos.remove({}).exec();
              app.models.Vendas.remove({}).exec();
            }
        }
        return clazz;
    };

    return PopulateDb();
};
