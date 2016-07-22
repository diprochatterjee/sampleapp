'use strict';

/**
 * @ngdoc overview
 * @name crudsampleApp
 * @description
 * # crudsampleApp
 *
 * Main module of the application.
 */
angular
  .module('crudsampleApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
   //
/* var auth = $base64.encode('user:frontend');
 console.log(auth);

  
  $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth; */
  /*$httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];*/

  $httpProvider.interceptors.push('loadingInterceptor');
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('message', {
      url: '/',
      templateUrl: 'views/message.html',
      controller: 'MessageCtrl',
      controllerAs: 'msg'
    })
    .state('view', {
      url: '/view',
      templateUrl: 'views/viewall.html',
      controller: 'ViewAllCtrl',
      controllerAs: 'vw'
    });
    
  });
