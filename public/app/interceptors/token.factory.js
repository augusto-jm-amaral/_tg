(function() {
        'user strict';

        angular.module('app').factory('TokenInterceptor', TokenInterceptor);

        TokenInterceptor.$inject = ['$q', '$window', '$location'];

        function TokenInterceptor($q, $window, $location) {

            var t = {
                request: function(config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                        config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
                    }
                    return config;
                }

                // requestError: function(rejection) {
                //   return $q.reject(rejection);
                // },
                //
                // responseError: function(rejection) {
                //
                //   // console.log(JSON.stringify(rejection));
                //
                //   return $q.reject(rejection);
                // }
            };

            return t;
        };

})();
