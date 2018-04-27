define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
    var module = ng.module('app.service');
    module.service('setHomeWorkSrv', ['$q', 'httpFuns', function ($q, httpFuns) {
        //console.log(httpFuns);
        var actions = {
            getteacherclasslist: "getteacherclasslist",
            getclassbooks: "getclassbooks",
            gethomeworklist: "gethomeworklist",
            getyibuzhizuoyelist: "getyibuzhizuoyelist",
            sethomework: "sethomework",
            deletehomework: "deletehomework",
            updatesubendtime: "updatesubendtime",
            gethomestatistics: "gethomestatistics",
            getteachercansethomework: "getteachercansethomework",
            setuserguidance: "setuserguidance",
            getchecklist: "huoqupigailiebiao",
            gethomeworkquestionlist: "gethomeworkquestionlist",

        }
        var funcs = {
            getTeacherClasslist: _getTeacherClasslist,
            getClassBooks: _getClassBooks,
            getHomeWorkList: _getHomeWorkList,
            getYiBuZhiZuoYeList: _getYiBuZhiZuoYeList,
            setHomeWork: _setHomeWork,
            deleteHomeWork: _deleteHomeWork,
            updateSubendTime: _updateSubendTime,
            getHomeStatistics: _getHomeStatistics,
            getTeacherCanSetHomeWork: _getTeacherCanSetHomeWork,
            setUserGuidance: _setUserGuidance,
            getCheckList: _getCheckList,
            getHomeWorkQuestionList: _getHomeWorkQuestionList,

        };
        return funcs;
        function _getTeacherClasslist(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherclasslist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getClassBooks(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getclassbooks, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getHomeWorkList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworklist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getYiBuZhiZuoYeList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getyibuzhizuoyelist, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _setHomeWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.sethomework, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _deleteHomeWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.deletehomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _updateSubendTime(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.updatesubendtime, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeStatistics(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomestatistics, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeacherCanSetHomeWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteachercansethomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _setUserGuidance(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setuserguidance, verification: angular.toJson(verification), data: angular.toJson(params) }, true);
        }
        function _getCheckList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getchecklist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkQuestionList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkquestionlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }

    }]);
})