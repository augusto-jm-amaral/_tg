(function () {
  'use strict';

  angular
    .module('app')
    .config(config);
    // .run(run);

    config.$inject = ['$routeProvider', '$httpProvider'];

    function config($routeProvider, $httpProvider) {

      $httpProvider.interceptors.push('TokenInterceptor');

      $routeProvider.when('/home', {
        templateUrl: 'app/modules/home/home.html',
        // controller: 'HomeCtrl',
        access: {
          loginRiquided: false
        }
      })
      .when('/dash', {
        templateUrl: 'app/modules/dash/dash.html',
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
