define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
    var module = ng.module('app.service');
    module.service('checkHomeWorkSrv', ['$q', 'httpFuns', function ($q, httpFuns) {
        //console.log(httpFuns);
        var actions = {
            teacherthumbsuphomework:"teacherthumbsuphomework",
            gethomeworkquestionrapidcommonlist:"gethomeworkquestionrapidcommonlist",
            sumbithomeworkresultpingyu:"sumbithomeworkresultpingyu",
            getpingyu:"getpingyu",
            addsinglecomment:"addsinglecomment",
            promptedsubmithomework: "promptedsubmithomework",
            getchecklist: "huoqupigailiebiao",
            gethomeworksublog: "gethomeworksublog",
            checkoutquestionlist: "checkoutquestionlist",
            correcthomework: "correcthomework",
            gethomeworkquestionlist: "gethomeworkquestionlist",
            updatesubendtime: "updatesubendtime",
            resubmitwork: "resubmitwork",
            gethomeworkquestioncommoncclasslist: "gethomeworkquestioncommoncclasslist",
            gethomeworkquestioncommonlist: "gethomeworkquestioncommonlist",
            gethomeworkresult: "gethomeworkresult",
            deletehomework: "deletehomework",

        }
        var funcs = {
            teaThumb:_teaThumb,
            getSimpleremark:_getSimpleremark,
            subRemind:_subRemind,
            getPingyu:_getPingyu,
            addSinglecomment:_addSinglecomment,
            cuiSubmitworkpl: _cuiSubmitworkpl,
            getCheckList: _getCheckList,
            getHomeWorkSublog: _getHomeWorkSublog,
            checkOutQuestionList: _checkOutQuestionList,
            correctHomeWork: _correctHomeWork,
            getHomeWorkQuestionList: _getHomeWorkQuestionList,
            updateSubendTime: _updateSubendTime,
            reSubmitWork: _reSubmitWork,
            getHomeWorkQuestionCommoncClassList: _getHomeWorkQuestionCommoncClassList,
            getHomeWorkQuestionCommonList: _getHomeWorkQuestionCommonList,
            getHomeWorkResult: _getHomeWorkResult,
            deleteHomeWork: _deleteHomeWork,

        };
        return funcs;
        function _teaThumb(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.teacherthumbsuphomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getSimpleremark(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkquestionrapidcommonlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _subRemind(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.sumbithomeworkresultpingyu, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getPingyu(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getpingyu, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _addSinglecomment(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.addsinglecomment, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _cuiSubmitworkpl(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.promptedsubmithomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getCheckList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getchecklist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkSublog(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworksublog, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _checkOutQuestionList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.checkoutquestionlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _correctHomeWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.correcthomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkQuestionList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkquestionlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _updateSubendTime(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.updatesubendtime, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _reSubmitWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.resubmitwork, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkQuestionCommoncClassList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkquestioncommoncclasslist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkQuestionCommonList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkquestioncommonlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getHomeWorkResult(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.gethomeworkresult, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _deleteHomeWork(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.deletehomework, verification: angular.toJson(verification), data: angular.toJson(params) });
        }

    }]);
})