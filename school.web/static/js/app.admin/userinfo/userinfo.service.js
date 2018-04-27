define(['require','angular','utils/http-funs'],function(require,ng){
	var module = ng.module('app.service');
	module.service('userinfoSrv', ['$q','httpFuns', function($q,httpFuns){
        //console.log(httpFuns);
		var actions = {
		    livecourselist: "api/TelecastLession/livecourselist",
		    studentuserinfo_save: "api/Account/studentuserinfo_save",
		    studentuserinfo_update_pwd: "api/Account/studentuserinfo_update_pwd",
		    addprintrecord: "api/homework/addprintrecord",
		    getuserallclass: "api/Class/getuserallclass",
		    updateusermobile: "api/Account/updateusermobile",
		    getuserallclass: "api/Class/getuserallclass",
		    getprintrecordlist: "api/homework/getprintrecordlist",
		    deleteprintrecord: "api/homework/deleteprintrecord",
		    getmobliecode: "api/Account/getmobliecode",

        }
        var funcs = {
            liveCourseList: _liveCourseList,
            studentUserInfoSave: _studentUserInfoSave,
            studentUserInfoUpdatePwd: _studentUserInfoUpdatePwd,
            addPrintRecord: _addPrintRecord,
            getUserAllClass: _getUserAllClass,
            updateUserMobile: _updateUserMobile,
            getUserAllClass: _getUserAllClass,
            getPrintRecordList: _getPrintRecordList,
            deletePrintRecord: _deletePrintRecord,
            getMoblieCode: _getMoblieCode,


        };
        return funcs;
        function _liveCourseList(params) {
            return httpFuns.httpPost( { action: actions.livecourselist,  data: params });
        }
        function _studentUserInfoSave(params) {
            return httpFuns.httpPost({ action: actions.studentuserinfo_save, data: params });
        }
        function _studentUserInfoUpdatePwd(params) {
            return httpFuns.httpPost({ action: actions.studentuserinfo_update_pwd, data: params });
        }
        function _addPrintRecord(params) {
            return httpFuns.httpPost({ action: actions.addprintrecord, data: params });
        }
        function _getUserAllClass(params) {
            return httpFuns.httpPost({ action: actions.getuserallclass, data: params });
        }
        function _updateUserMobile(params) {
            return httpFuns.httpPost({ action: actions.updateusermobile, data: params });
        }
        function _getUserAllClass(params) {
            return httpFuns.httpPost({ action: actions.getuserallclass, data: params });
        }
        function _getPrintRecordList(params) {
            return httpFuns.httpPost({ action: actions.getprintrecordlist, data: params });
        }
        function _deletePrintRecord(params) {
            return httpFuns.httpPost({ action: actions.deleteprintrecord, data: params });
        }
        function _getMoblieCode(params) {
            return httpFuns.httpPost({ action: actions.getmobliecode, data: params });
        }


	}]);
})