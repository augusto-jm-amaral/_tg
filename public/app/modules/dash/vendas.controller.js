(function() {
    'use strict';

    angular
        .module('app')
        .controller('VendasController', VendasController);

    VendasController.$inject = ['user', 'toaster', '$http'];

    function VendasController(user, toaster, $http) {

      var vm = this;

      vm.vendas = [];

      vm.listaProdutos = function  (produtos) {
        
        var retorno = '';

        produtos.forEach(function  (produto, index) {
          retorno += produto.name + '['+ produto.qtd +'], ';
        });

        return retorno;

      };

      vm.atualizar = function () {
        
        $http.get('/vendas')
        .then(function  (res) {
          vm.vendas = res.data;
          toaster.pop({
            type: 'success',
            title: 'Vendas',
            body: 'Lista de vendas carregada',
            showCloseButton: true
          });
        }).catch(function  (err) {
          console.log(err);
          toaster.pop({
            type: 'error',
            title: 'Vendas',
            body: 'Erro ao carregar a lista de vendas',
            showCloseButton: true
          });
        });

      };

      vm.atualizar();

    };

})();
