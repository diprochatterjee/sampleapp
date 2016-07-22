'use strict';

/**
 * @ngdoc service
 * @name crudsampleApp.loadingInterceptor
 * @description
 * # loadingInterceptor
 * Factory in the crudsampleApp.
 */
angular.module('crudsampleApp')
  .factory('loadingInterceptor', function ($q, $rootScope) {
      
   var httpRequestCounter = 0;

    return {

        request: function (config) {

            httpRequestCounter++;

            // Show loader
            $rootScope.$broadcast("show_loading_icon");
            return config || $q.when(config);

        },

        response: function (response) {

            if ((--httpRequestCounter) === 0) {
                // Hide loader
                $rootScope.$broadcast("hide_loading_icon");
            }

            return response || $q.when(response);

        },

        responseError: function (response) {

            if (!(--httpRequestCounter)) {
                // Hide loader
                $rootScope.$broadcast("hide_loading_icon");
            }

            return $q.reject(response);
        }
        
    };

  });
