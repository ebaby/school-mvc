define(['require','angular','utils/http-funs'],function(require,ng){
	var module = ng.module('app.service');
	module.service('classmanageSrv', ['$q','httpFuns', function($q,httpFuns){
        //console.log(httpFuns);
		var actions = {
            getteacherclasslist: "getteacherclasslist",
            getteacherclassstudentlist: "getteacherclassstudentlist",
            deleteclass: "deleteclass",
            unlocktheclass:"unlocktheclass",
            yichubanjixuesheng: "yichubanjixuesheng",
            setteacherguanzhustudent: "setteacherguanzhustudent",
            grades: "getgrade",
            getjcbblist: "getjcbblist",
            xueke: "getxueke",
            createclass: "createclass",
            xiugaibanji: "xiugaibanji",
            getbanjixinxi: "getbanjixinxi",
            getjsapicongfig: "getjsapicongfig",
            checklogin: "checklogin",
            getclassinfo: "getclassinfo",
            updateclassinfo: "updateclassinfo",
            getclassbooks: "getclassbooks",
            getallbooks: "getallbooks",
            teacherattenstudent: "teacherattenstudent",
            deleteclassstudent: "deleteclassstudent",
            addclassbook: "addclassbook",
            deleteclassbook: "deleteclassbook",
            setuserguidance: "setuserguidance",

            //记录操作日志
            platformoperlog: "platformoperlog"
        }
        var funcs = {
            getTeacherClasslist: _getTeacherClasslist,
            getTeacherClassStudentlist: _getTeacherClassStudentlist,
            deleteClass: _deleteClass,
            unlockTheclass:_unlockTheclass,
            removeStudent: _removeStudent,
            setTeacherAttStudent: _setTeacherAttStudent,
            getGrades: _getGrades,
            getJCBblist: _getJCBblist,
            getXK: _getXK,
            createClass: _createClass,
            updateClass: _updateClass,
            updateClassinfo: _updateClassinfo,
            wxAuthorize: _wxAuthorize,
            checkLogin: _checkLogin,
            platformoperLog: _platformoperLog,
            getClassInfo: _getClassInfo,
            getClassBooks: _getClassBooks,
            getAllBooks: _getAllBooks,
            teacherAttenStudent: _teacherAttenStudent,
            deleteClassStudent: _deleteClassStudent,
            addClassBook: _addClassBook,
            deleteClassBook: _deleteClassBook,
            setUserGuidance: _setUserGuidance,

        };
        return funcs;
        function _getTeacherClasslist(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherclasslist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeacherClassStudentlist(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherclassstudentlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _deleteClass(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.deleteclass, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _unlockTheclass(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.unlocktheclass, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _removeStudent(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.yichubanjixuesheng, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _setTeacherAttStudent(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setteacherguanzhustudent, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getGrades(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.grades, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getJCBblist(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getjcbblist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getXK(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.xueke, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _createClass(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.createclass, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _updateClass(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.xiugaibanji, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _updateClassinfo(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.updateclassinfo, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _wxAuthorize(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getjsapicongfig, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _checkLogin(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.checklogin, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _platformoperLog(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.platformoperlog, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getClassInfo(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassinfo, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getClassBooks(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassbooks, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getAllBooks(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getallbooks, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _teacherAttenStudent(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.teacherattenstudent, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _deleteClassStudent(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.deleteclassstudent, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _addClassBook(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.addclassbook, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _deleteClassBook(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.deleteclassbook, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _setUserGuidance(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setuserguidance, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
		
	}]);
})