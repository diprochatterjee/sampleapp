'use strict';

/**
 * @ngdoc function
 * @name crudsampleApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the crudsampleApp
 */
angular.module('crudsampleApp')
  .controller('ModalCtrl', function ($uibModalInstance,$scope) {
    
    var self = this;
    
    self.ok = function () {
      
      	$uibModalInstance.close();

  	};

  	self.cancel = function () {
    	 
        $uibModalInstance.dismiss('cancel');
        
  	};

  });
