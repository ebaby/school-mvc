define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
    var module = ng.module('app.service');
    module.service('analyzeSrv', ['$q', 'httpFuns', function ($q, httpFuns) {
        //console.log(httpFuns);
        var actions = {
            getteacherclasslist: "getteacherclasslist",
            getxueqingfenzuoyeindexpage: "getxueqingfenzuoyeindexpage",
            xueqingfenxi: "xueqingfenxi",
            gethomeworkanalsyszsdquestionlist: "gethomeworkanalsyszsdquestionlist",
            xueqingfenxisorcelevel: "xueqingfenxisorcelevel",
            getclassxueqingfenxi: "getclassxueqingfenxi",
            getstusentanalysis: "getstusentanalysis",
            getstusentanalysishistroy: "getstusentanalysishistroy",
            promptedredowrongquestion: "promptedredowrongquestion",
            getclassxueqingfenxisorcelevel: "getclassxueqingfenxisorcelevel",
            getclasshomeworklist: "getclasshomeworklist",
            getlistpigaiwrongti: "getlistpigaiwrongti",
            dianzanxuesheng: "dianzanxuesheng",
            updatesubendtime: "updatesubendtime",
            subpigaiwrongti: "subpigaiwrongti",
            updateclassinfo: "updateclassinfo",
            getclassbooks: "getclassbooks",
            getallbooks: "getallbooks",
            teacherattenstudent: "teacherattenstudent",
            deleteclassstudent: "deleteclassstudent",
            addclassbook: "addclassbook",
            deleteclassbook: "deleteclassbook",
            gethomeworkusersanalsyszsdquestionlist: "gethomeworkusersanalsyszsdquestionlist",
            gethomeworkclassanalsyszsdquestionlist: "gethomeworkclassanalsyszsdquestionlist",
            getteacherclasscharpterlist: "getteacherclasscharpterlist",
            gethomeworkclassanalsyscharpteridusuallywronglist: "gethomeworkclassanalsyscharpteridusuallywronglist",
            getclasscharpteriduserlist: "getclasscharpteriduserlist",
            getclassuserallwronglist: "getclassuserallwronglist",
            getclassuserwronglist: "getclassuserwronglist",
            //记录操作日志
            platformoperlog: "platformoperlog"
        }
        var funcs = {
            getTeacherClasslist: _getTeacherClasslist,
            getXueQingFenZuoYeIndexPage: _getXueQingFenZuoYeIndexPage,
            xueQingFenXi: _xueQingFenXi,
            getHomeWorkAnalsysZsdQuestionList: _getHomeWorkAnalsysZsdQuestionList,
            xueQingFenXiSorceLevel: _xueQingFenXiSorceLevel,
            getClassXueQingFenXi: _getClassXueQingFenXi,
            getStusentAnalysis: _getStusentAnalysis,
            getStusentAnalysisHistroy: _getStusentAnalysisHistroy,
            promptedRedoWrongQuestion: _promptedRedoWrongQuestion,
            getClassXueQingFenXiSorceLevel: _getClassXueQingFenXiSorceLevel,
            getClassHomeWorkList: _getClassHomeWorkList,
            getListPiGaiWrongTi: _getListPiGaiWrongTi,
            dianZanXueSheng: _dianZanXueSheng,
            updateSubendTime: _updateSubendTime,
            subPiGaiWrongTi: _subPiGaiWrongTi,
            platformoperLog: _platformoperLog,
            getClassBooks: _getClassBooks,
            getAllBooks: _getAllBooks,
            teacherAttenStudent: _teacherAttenStudent,
            deleteClassStudent: _deleteClassStudent,
            addClassBook: _addClassBook,
            deleteClassBook: _deleteClassBook,
            getHomeWorkUsersAnalsysZsdQuestionList: _getHomeWorkUsersAnalsysZsdQuestionList,
            getHomeWorkClassAnalsysZsdQuestionList: _getHomeWorkClassAnalsysZsdQuestionList,
            getTeacherClassCharpterList: _getTeacherClassCharpterList,
            getHomeWorkClassAnalsysCharpterIdUsuallyWrongList: _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList,
            getClassCharpterIdUserList: _getClassCharpterIdUserList,
            getClassUserAllWrongList: _getClassUserAllWrongList,
            getClassUserWrongList: _getClassUserWrongList,

        };
        return funcs;
        function _getTeacherClasslist(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherclasslist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getXueQingFenZuoYeIndexPage(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getxueqingfenzuoyeindexpage, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _xueQingFenXi(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.xueqingfenxi, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkAnalsysZsdQuestionList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkanalsyszsdquestionlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _xueQingFenXiSorceLevel(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.xueqingfenxisorcelevel, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getClassXueQingFenXi(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassxueqingfenxi, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getStusentAnalysis(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getstusentanalysis, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getStusentAnalysisHistroy(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getstusentanalysishistroy, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _promptedRedoWrongQuestion(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.promptedredowrongquestion, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getClassXueQingFenXiSorceLevel(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassxueqingfenxisorcelevel, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getClassHomeWorkList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclasshomeworklist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getListPiGaiWrongTi(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getlistpigaiwrongti, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _dianZanXueSheng(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.dianzanxuesheng, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _updateSubendTime(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.updatesubendtime, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _subPiGaiWrongTi(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.subpigaiwrongti, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _platformoperLog(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.platformoperlog, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
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
        function _getHomeWorkUsersAnalsysZsdQuestionList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkusersanalsyszsdquestionlist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getHomeWorkClassAnalsysZsdQuestionList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkclassanalsyszsdquestionlist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getTeacherClassCharpterList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherclasscharpterlist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkclassanalsyscharpteridusuallywronglist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getClassCharpterIdUserList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclasscharpteriduserlist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getClassUserAllWrongList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassuserallwronglist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getClassUserWrongList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassuserwronglist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
    }]);
})