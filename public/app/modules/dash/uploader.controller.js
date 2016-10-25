(function() {
    'use strict';

    angular
        .module('app')
        .controller('UploaderController', UploaderController);

    UploaderController.$inject = ['user', 'toaster', 'Upload', '$timeout', '$http'];

    function UploaderController(user, toaster, Upload, $timeout, $http) {

        /* jshint validthis: true */
        var vm = this;

        vm.listaVendas = [];
        vm.sincronizado = false;

        vm.limpar = function  () {
          vm.sincronizado = false;
          vm.listaVendas = [];
        };

        vm.sincronizar = function  () {
          $http.post('/vendas', vm.listaVendas)
            .then(function  (res) {

                vm.sincronizado = true;

                toaster.pop({
                  type: 'success',
                  title: 'Sincronização',
                  body: 'Sucesso ao sincronizar suas vendas',
                  showCloseButton: true
                });

            }).catch(function  (err) {

               vm.sincronizado = false;
              
               toaster.pop({
                  type: 'error',
                  title: 'Sincronização',
                  body: 'Algumas vendas apresentaram erro ao serem sincronizadas.',
                  showCloseButton: true
                });

            });
        };

        vm.uploadFiles = function(file, errFiles) {
          console.log(file);

          var r = new FileReader();
          r.onloadend = function (e) {
            $timeout(function () {
              try{
                vm.listaVendas = JSON.parse(e.target.result);

                toaster.pop({
                  type: 'success',
                  title: 'Upload',
                  body: 'Sucesso ao carregar o arquivo JSON',
                  showCloseButton: true
                });

                console.log(vm.listaVendas);

              }catch(err){
                toaster.pop({
                    type: 'error',
                    title: 'Upload',
                    body: 'JSON inválido',
                    showCloseButton: true
                });
              }
            },10);
          };
          r.readAsBinaryString(file);

        };


    };

})();
