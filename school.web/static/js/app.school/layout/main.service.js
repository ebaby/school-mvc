define(['require','angular','utils/http-funs'],function(require,ng){
	var module = ng.module('app.service');
	module.service('mainSrv', ['$q','httpFuns', function($q,httpFuns){
        //console.log(httpFuns);
		var actions = {
            getchecklist: "huoqupigailiebiao", 
            deletehomework: "deletehomework",
            updatesubendtime: "updatesubendtime",
            getteacherclasslist: "getteacherclasslist",
            setuserguidance: "setuserguidance",
            checklogin: "checklogin",

        }
        var funcs = {
            getCheckList: _getCheckList,   
            deleteHomeWork: _deleteHomeWork, 
            updateSubendTime: _updateSubendTime,
            getTeacherClasslist: _getTeacherClasslist,
            setUserGuidance: _setUserGuidance,
            checkLogin: _checkLogin,

        };
        return funcs;
        function _getCheckList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getchecklist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _deleteHomeWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.deletehomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _updateSubendTime(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.updatesubendtime, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeacherClasslist(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherclasslist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _setUserGuidance(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setuserguidance, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _checkLogin(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.checklogin, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }

	}]);
})