'use strict';

/**
 * @ngdoc function
 * @name crudsampleApp.controller:ViewAllCtrl
 * @description
 * # ViewAllCtrl
 * Controller of the crudsampleApp
 */
angular.module('crudsampleApp')
  .controller('ViewAllCtrl', function (MessageModel,$state,$timeout,CognizoneAPICaller) {
    var self = this;

    var reload = function(){
      //garbage collect the object holding the list of Messages
      //by calling the setter method with no argument.
      MessageModel.setMsgList();
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

    var deleteMessage = function(messageID,index){

      var successMessage = 'Message successfully deleted! Re-loading page in 3 seconds.';
      var errorMessage = 'Sorry, we could not delete message';
      var successAlert = 'alert alert-success';
      var errorAlert = 'alert alert-danger';

      var successHandler = function(response){
        self.deleteRequested = true;
        self.deleteResponse = response;
        self.deleteResponseMessage = response ? successMessage : errorMessage ;
        self.deleteResponseClass = response ? successAlert : errorAlert;
        self.currentPageMessageList.splice(index,1);
      };

      var errorHandler = function(reason) {
        console.log(reason);
        self.deleteRequested = true;
        self.deleteResponse = false;
        self.deleteResponseMessage = reason ? reason.message : errorMessage;
        console.log(self.deleteResponseMessage);
        self.deleteResponseClass = errorAlert;
      };

      CognizoneAPICaller.deleteMessage(messageID).then(successHandler,errorHandler);
      $timeout(self.initController, 3000);
    };

    self.initController = function(){

      self.emptyList = false;
      self.deleteRequested = false;
      self.currentPage = 1;
      self.messagesPerPage = 5;
      self.list = [];
      self.deleteMessage = deleteMessage;
      reload();

      var successHandler = function() {
        self.list = MessageModel.getMsgList();
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
      self.changePage = pageChanged;
      self.changeMessagesPerPage = changeMessagesPerPage;

    };

    
    self.initController();
  });
