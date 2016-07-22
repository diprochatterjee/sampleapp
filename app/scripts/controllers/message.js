'use strict';

/**
 * @ngdoc function
 * @name crudsampleApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the crudsampleApp
 */
angular.module('crudsampleApp')
  .controller('MessageCtrl', function (CognizoneAPICaller,$uibModal,$scope) {
    var self = this;
    var successCallback = function(response){
    	self.success = true;
		self.successMessage = 'You have successfully published the message';
    };
    var errorCallback = function(reason){
    	self.error = true;
        if(reason !== null){
    		self.errorMessage = reason.toString();	
    	}
    	else {
    		self.errorMessage = 'Sorry, the Cognizone API is not working!';
    	}
    	$scope.message.text = '';
    };
    var callCognizoneService = function(){
        var promise = CognizoneAPICaller.publish($scope.message.text);
        promise.then(successCallback, errorCallback);    
    };
    var resetController = function(){
    	self.errorMessage = '';
	    self.error = false;
	    self.success = false;
		self.successMessage = '';
	    $scope.message = {
	    		'text' : ''
	    };
    };
    var initController = function(){
    	resetController();
	    self.enter = callCognizoneService;
	    self.reset = resetController;
	    self.open = function () {
			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'views/modal.html',
		      scope: $scope,
		      controller: 'ModalCtrl',
		      controllerAs: 'modal',
		      size: 'lg'
		    });

		    modalInstance.result.then(function () {
		      self.enter();
		      self.reset();
		    }, function () {
		      self.reset();
		    });
  		};
    };

    initController();
  });
