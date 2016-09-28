(function () {

  angular
    .module('app')
    .service('user', user);

    user.inject = ['$http', '$window', 'toaster', '$location'];

    function user($http, $window, toaster, $location) {

      /* jshint validthis: true */
      var vm = this;
      vm.resource = '/users';

      this.user = ($window.sessionStorage.user ? $window.sessionStorage.nome : {});

      vm.login = function (user) {

        $http.post(vm.resource + '/login', user)
          .then(function (res) {

            this.user = {};

            this.user.name = res.data.name;
            this.user._id = res.data._id;
            $window.sessionStorage.user = res.data;
            $window.sessionStorage.token = res.data.token;
            $location.path = '/dash';

          }).catch(function (err) {

            toaster.pop({
              type:'error',
              title: 'Entrar',
              body: "E-mail ou senha invalidos.",
              showCloseButton: true
            });

          });
      };

      vm.logout = function () {
        delete $window.sessionStorage.token;
        $window.sessionStorage.user = {};
        $location.path = '/home';
      };

      vm.create =  function (user) {

        $http.post( vm.resource + '/logista', user)
        .then(function (res) {

          toaster.pop({
            type:'success',
            title: 'Cadastro',
            body: "Usuário cadastrado com sucesso",
            showCloseButton: true
          });

        }).catch(function (err) {
          console.log(err);

          toaster.pop({
            type:'info',
            title: 'Cadastro',
            body: "Esta e-mail já está em uso",
            showCloseButton: true
          });
        });

      };

    };

})();
