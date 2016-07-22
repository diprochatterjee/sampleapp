'use strict';

/**
 * @ngdoc function
 * @name crudsampleApp.controller:ViewAllCtrl
 * @description
 * # ViewAllCtrl
 * Controller of the crudsampleApp
 */
angular.module('crudsampleApp')
  .controller('ViewAllCtrl', function (MessageModel,$state,$timeout) {
var self = this;

  	var goHome = function(){
  		//garbage collect the object holding the list of Messages
  		//by calling the setter method with no argument.
  		MessageModel.setMsgList();
  		// take the user to home page by calling the user state. User can publish a message to be viewed.
  		$state.go('message');
  	};

    var pageChanged = function(){
      var startOfPageIndex = (self.currentPage - 1) * self.messagesPerPage;
      var endOfPageIndex = startOfPageIndex + self.messagesPerPage;
      self.currentPageMessageList =  self.list.slice(startOfPageIndex,endOfPageIndex);
    };
    var changeMessagesPerPage = function(messagesPerPage){
      self.messagesPerPage = messagesPerPage;
      self.changePage();
    };
  	self.initController = function(){
  	  self.emptyList = false;
      self.currentPage = 1;
      self.messagesPerPage = 5;
      self.list = [];
      var successHandler = function() {
	      	self.list = MessageModel.getMsgList();
	  		console.log(self.list);
	  		if(self.list.length === 0){
	  			self.emptyList = true;
	  			self.errorMessage = 'Sorry, there are no messages published right now. You will redirected to home page to publish message so that you can view it.';
	        $timeout(self.goHome, 3000);
	  		} else {
	        self.changePage();
	      }
  	  };
      var errorHandler = function(reason) {
      	self.errorMessage = reason;
      };
  		//store MessageModel list in controllerAs variable by calling the getter method of Factory Recipe MessageModel.
  	  MessageModel.populateList().then(successHandler,errorHandler);
  		
      self.goHome = goHome;
      self.changePage = pageChanged;
      self.changeMessagesPerPage = changeMessagesPerPage;
  		
  	};

    
  	self.initController();
  });
