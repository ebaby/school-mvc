define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
	var module = ng.module('app.service');
	module.service('mainSrv', ['$q','httpFuns', function($q,httpFuns){
        //console.log(httpFuns);
		var actions = {
		    getchecklist: "huoqupigailiebiao",
            adduser:"adduser",

        }
        var funcs = {
            getCheckList: _getCheckList,
            addUser:_addUser,

        };
        return funcs;
        function _getCheckList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getchecklist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _addUser(params) {
            return httpFuns.httpPost(globalConfig.apiPath , {action:actions.adduser, params: params });
        }


	}]);
})