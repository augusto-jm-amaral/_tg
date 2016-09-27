(function () {

  angular
    .module('app')
    .service('home', home);

    home.inject = ['$http'];

    function home($http) {
      var vm = this;
    };

})();
