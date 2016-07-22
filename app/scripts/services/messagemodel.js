'use strict';

/**
 * @ngdoc service
 * @name crudsampleApp.MessageModel
 * @description
 * # MessageModel
 * Factory in the crudsampleApp.
 */
angular.module('crudsampleApp')
  .factory('MessageModel', function (lodash,CognizoneAPICaller,$q) {
    // Service logic
    // ...
// instance holder of the object describing list of published messages
    var listofmessages; 

    var initPrivateVars = function(){
      
        listofmessages = [];

    };

    initPrivateVars();
    
    //constructor function to instantiate the object describing list of published messages
    
    var Message = function(response){
    
      this.text = response.text;
      this.dateTime = response.dateTime;
      this.id = response.id;

    };
    var setMsgList = function(response) {
      
      if(response && response.length > 0){
      
          lodash.forEach(response, function(msg){
      
            listofmessages.push(new Message(msg));
      
          });  

      } else {

          initPrivateVars();

      }
      
    };

    // Public API here
    return {

      setMsgList : setMsgList,

      populateList : function () {

        var deferred = $q.defer();

        var successCallback = function (response) {

          setMsgList(response);
          deferred.resolve(response);

        };

        var errorCallback = function (reason) {

          deferred.reject(reason);

        };

        CognizoneAPICaller.viewAll().then(successCallback,errorCallback);

        return deferred.promise;

      },

      getMsgList : function() {

        return listofmessages;

      }

    };
    
  });
