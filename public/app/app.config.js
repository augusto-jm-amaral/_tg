(function () {
  'use strict';

  angular
    .module('app')
    .config(config);
    // .run(run);

    config.$inject = ['$routeProvider', '$httpProvider'];

    function config($routeProvider, $httpProvider) {

      $routeProvider.when('/home', {
        templateUrl: 'app/modules/home/home.html',
        // controller: 'HomeCtrl',
        access: {
          loginRiquided: false
        }
      });

      $routeProvider.otherwise({redirectTo: '/home'});
    };
    //
    // // run.$inject = ['$scope'];
    //
    // function run($scope){
    //   $scope.$on('$routeChangeStart', function (next, current) {
    //
    //   });
    // };

})();
