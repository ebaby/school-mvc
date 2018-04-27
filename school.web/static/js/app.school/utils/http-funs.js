define(['require','angular'],function(require,ng){
    var module = ng.module('app.utils');
    //console.log(module);
    module.factory('httpFuns',['$window','$http','$q','$timeout',function($window,$http,$q,cfpLoadingBar,$timeout){ 
        var funcs = {
          "httpGet" : _httpGet,
          "httpPost" : _httpPost,
          "httpPut" : _httpPut,
          "httpDelete" : _httpDelete
        }; 
        return funcs;
        
        function _httpGet(url){
          var deferred = $q.defer(),
          dataPromise = deferred.promise;
          if(url.indexOf('?') == -1){//prevent from cache
            url+="?";
          }
          else{
            (url[url.length-1] != '&') && (url+="&"); 
          }
          url+="dt="+Math.random();
          
          $http.get(url).success(function(data) { 
            deferred.resolve(data);
          }).error(function() {
            deferred.reject('Failed to load data');
          });
          return dataPromise;
        }

        function _httpDelete(url){
          var deferred = $q.defer(),
          dataPromise = deferred.promise;
          $http["delete"](url).success(function(data) { 
            deferred.resolve(data);
          }).error(function() {
            deferred.reject('Failed to load data');
          });
          return dataPromise;
        }
        
        function _httpPost(url,params){
          var deferred = $q.defer(),
          dataPromise = deferred.promise;
          $http.post(url,params).success(function(data) { 
            deferred.resolve.apply(this,Array.prototype.slice.call(arguments));
          }).error(function() {
            deferred.reject('Failed to load data');
          });
          return dataPromise;
        }

        function _httpPut(url,params){
          var deferred = $q.defer(),
          dataPromise = deferred.promise;
          $http.put(url,params).success(function(data) { 
            deferred.resolve.apply(this,Array.prototype.slice.call(arguments));
          }).error(function() {
            deferred.reject('Failed to load data');
          });
          return dataPromise;
        }
      }]);
});