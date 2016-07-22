'use strict';

/**
 * @ngdoc service
 * @name crudsampleApp.CognizoneAPICaller
 * @description
 * # CognizoneAPICaller
 * Service in the crudsampleApp.
 */
angular.module('crudsampleApp')
  .service('CognizoneAPICaller', function ($http,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
   	var baseURL = 'http://frontendapi.cogni.zone/';
    var urlParser = function(methodName){
    	return baseURL+methodName;
    };
   /* var username = 'user';
    var password = 'frontend';
    var string = username+':'+password;
    console.log(string);
    var encodedString = btoa(string);
    console.log(encodedString);
    var headers = { 
    	'Authorization' : 'Basic ' + encodedString 
    };
    console.log(headers);*/
    this.viewAll = function () {
    	delete $http.defaults.headers.common['X-Requested-With'];
    	 var deferred = $q.defer();
    	 var successCallback = function(response){
    		deferred.resolve(response.data);
    	 };	
    	 var errorCallback = function(reason){
    	 	deferred.reject(reason.data);
    	 };
    	var url = urlParser('getAll');
    	
    	$http({
		  method: 'GET',
		  url: url
		  //headers: headers
		}).then(successCallback,errorCallback);
		return deferred.promise;
    };

    this.publish = function (message) {
    	delete $http.defaults.headers.common['X-Requested-With'];
    	 var deferred = $q.defer();
    	 var successCallback = function(response){
    		deferred.resolve(response.data);
    	 };	
    	 var errorCallback = function(reason){
    	 	deferred.reject(reason.data);
    	 };
    	 var body = {
    	 	"text" : message
    	 };
    	 console.log(body);
    	var url = urlParser('create');
    	$http({
		  method: 'POST',
		  url: url,
		 // headers: headers,
		  data : body
		}).then(successCallback,errorCallback);
		return deferred.promise;
    };
    
  });
