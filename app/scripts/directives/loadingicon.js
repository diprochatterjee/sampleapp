'use strict';

/**
 * @ngdoc directive
 * @name crudsampleApp.directive:loadingicon
 * @description
 * # loadingicon
 */
angular.module('crudsampleApp')
  .directive('loadingicon', function () {
    return {
      template: '<div><img src="../../images/hourglass.gif" class="ajax-loader"/></div>',
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$root.$on("show_loading_icon", function () {
            return element.show();
        });
        return scope.$root.$on("hide_loading_icon", function () {
            return element.hide();
        });
      }
    };
  });
