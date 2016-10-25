(function() {
    'use strict';

    angular
        .module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['user', 'toaster'];

    function MenuController(user, toaster) {

      var vm = this;

      vm.nome = user.user.name;

      vm.logout = function  () {
        user.logout();
      };

    };

})();
