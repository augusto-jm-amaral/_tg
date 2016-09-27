module.exports = function(app) {

    const UserTypes = app.models.UserTypes;
    const ProductTypes = app.models.ProductTypes;

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

            // Insert ProductTypes
            ProductTypes: function() {

                ProductTypes.findOne({
                        name: 'Sapatos'
                    })
                    .then(function(productTypes) {

                      if(!productTypes){
                        new ProductTypes({
                          name: 'Sapatos',
                          desc: 'Tênis, Sandalhas, etc...',
                          order: 1
                        }).save();
                      }

                    });

                ProductTypes.findOne({
                        name: 'Roupas'
                    })
                    .then(function(productTypes) {

                      if(!productTypes){
                        new ProductTypes({
                          name: 'Roupas',
                          desc: 'Blusas, calças, shorts, etc...',
                          order: 1
                        }).save();
                      }

                    });

            }
        }
        return clazz;
    };

    return PopulateDb();
};
