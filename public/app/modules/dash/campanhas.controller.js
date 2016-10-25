(function() {
    'use strict';

    angular
        .module('app')
        .controller('CampanhasController', CampanhasController);

    CampanhasController.$inject = ['user', 'toaster', '$http'];

    function CampanhasController(user, toaster, $http) {

      var vm = this;

      vm.produtos = [];
      vm.campanha = {};
      vm.campanhas = [];

      vm.adicionar = function  () {
        vm.campanha = {};
        if(vm.produtos.length)
          vm.campanha.produto = vm.produtos[0];
        $('#myModal').modal('show');  
      };

      vm.deletarCampanha = function  (campanha) {
        $http.delete('/campanhas/' + campanha._id)
          .then(function  (res) {
              toaster.pop({
                type: 'success',
                title: 'Campanha',
                body: 'Campanha removida com sucesso.',
                showCloseButton: true
              });

              vm.carregaCampanhas();
          }).catch(function  (err) {
              toaster.pop({
                type: 'success',
                title: 'Campanha',
                body: 'Erro ao remover a campanha.',
                showCloseButton: true
              });
          });
      };

      vm.editar = function  (campanha) {

        vm.campanha = campanha;
        
        // angular.forEach(vm.produtos, function(produto, key) {
        //   vm.campanha.produto._id = produto._id  
        // });

        $('#myModal').modal('show');  
      };

      vm.carregaProdutos = function  () {
        $http.get('/products')
          .then(function  (res) {
            vm.produtos = res.data;
            if(vm.produtos.length)
              vm.campanha.produto = vm.produtos[0];
          }).catch(function  (err) {
            console.log(err);
          });
      };

      vm.carregaCampanhas = function  () {
        $http.get('/campanhas')
          .then(function  (res) {
            vm.campanhas = res.data;
          }).catch(function  (err) {
            console.log(err);
          });
      };

      vm.salvar = function  () {
        console.log(vm.campanha);
        if(vm.campanha._id){
          $http.put('/campanhas',vm.campanha)
            .then(function  (res) {

              $('#myModal').modal('hide');

              vm.campanha = {};

              toaster.pop({
                type: 'success',
                title: 'Campanha',
                body: 'Campanha atualizada com sucesso.',
                showCloseButton: true
              });

              vm.carregaCampanhas();

            }).catch(function  (err) {

              toaster.pop({
                type: 'error',
                title: 'Campanha',
                body: 'Erro ao atualizar a campanha',
                showCloseButton: true
              });

            });
              
        }else{
          $http.post('/campanhas',vm.campanha)
            .then(function  (res) {

              $('#myModal').modal('hide');

              vm.campanhasha = {};

              toaster.pop({
                type: 'success',
                title: 'Campanha',
                body: 'Campanha adicionada com sucesso.',
                showCloseButton: true
              });

              vm.carregaCampanhas();

            }).catch(function  (err) {
              toaster.pop({
                type: 'error',
                title: 'Campanha',
                body: 'Erro ao adicionar a campanha.',
                showCloseButton: true
              });
            });

        }
      };

      vm.carregaProdutos();
      vm.carregaCampanhas();

    };

})();
