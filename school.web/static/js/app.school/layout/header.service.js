define(['require','angular','utils/http-funs','layout/header.service'],function(require,ng){
	var module = ng.module('app.service');
	module.service('headerSrv', ['$q','httpFuns', function($q,httpFuns){
        //console.log(httpFuns);
		var actions = {
            getteacherinfo: "getteacherinfo",
            teacherloginout: "teacherloginout",
            getteachersmessagerecordlist: "getteachersmessagerecordlist",
            setteachersmessagerecordread: "setteachersmessagerecordread",


        }
        var funcs = {
            getTeacherInfo: _getTeacherInfo,  
            teacherLoginOut: _teacherLoginOut,
            getTeachersMessageRecordList: _getTeachersMessageRecordList,
            setTeachersMessageRecordRead: _setTeachersMessageRecordRead,

        };
        return funcs;
        function _getTeacherInfo(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherinfo, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _teacherLoginOut(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.teacherloginout, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeachersMessageRecordList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteachersmessagerecordlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _setTeachersMessageRecordRead(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setteachersmessagerecordread, verification: angular.toJson(verification), data: angular.toJson(params) });
        }

	}]);
})