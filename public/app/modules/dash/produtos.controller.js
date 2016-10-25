(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProdutosController', ProdutosController);

    ProdutosController.$inject = ['user', 'toaster', '$timeout', '$http'];

    function ProdutosController(user, toaster, $timeout, $http) {

      var vm = this;

      vm.listaProdutos = [];

      vm.atualizar = function  () {
        
        $http.get('/produtos')
          .then(function  (res) {
            
            vm.listaProdutos = res.data;

            toaster.pop({
              type: 'success',
              title: 'Produtos',
              body: 'Lista de produtos carregada',
              showCloseButton: true
            });

          }).catch(function  (err) {
              toaster.pop({
                type: 'error',
                title: 'Produtos',
                body: 'Erro ao carregar os produtos',
                showCloseButton: true
              });
          });

        vm.listaVendas = [];
      };

      vm.atualizar();

    };

})();
