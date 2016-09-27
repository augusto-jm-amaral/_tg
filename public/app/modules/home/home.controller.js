(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeCtrl);

    HomeCtrl.$inject = ['user', 'toaster'];

    function HomeCtrl(user, toaster) {

        /* jshint validthis: true */
        var vm = this;

        vm.cadastro = {};
        vm.login = {};

        vm.cadastrar = function() {
          console.log(vm.formCadastrar.$valid);
            if (vm.formCadastrar.$valid) {
                user.create(vm.cadastro);
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Cadastro',
                    body: 'Existem campos inválidos',
                    showCloseButton: true
                });
            }
        };

        vm.logar = function() {

          if(vm.formEntrar.$valid){
            user.login(vm.login);
          }else{
            toaster.pop({
              type: 'error',
              title: 'Entrar',
              body: 'Existem campos invalidos',
              showCloseButton: true
            });
          }
        };

    };

})();
