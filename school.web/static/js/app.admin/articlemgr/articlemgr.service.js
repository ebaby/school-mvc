define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
    var module = ng.module('app.service');
    module.service('articleMgrSrv', ['$q', 'httpFuns', function ($q, httpFuns) {
        //console.log(httpFuns);
        var actions = {
            savearticle: "/Article/SaveArticle",
            getarticlelist: "/Article/GetArticleList",
            getarticle: "/Article/GetArticleEntity",
            getparentmenus: "/Content/GetParentMenus",

        }
        var funcs = {
            saveArticle: _saveArticle,
            getArticleList: _getArticleList,
            getArticle: _getArticle,
            getParentMenus: _getParentMenus,

        };
        return funcs;
        function _saveArticle(params) {
            return httpFuns.httpPost(actions.savearticle, params);
        }
        function _getArticleList(params) {
            return httpFuns.httpPost(actions.getarticlelist, params);
        }
        function _getArticle(params) {
            return httpFuns.httpPost(actions.getarticle, params);
        }
        function _getParentMenus(params) {
            return httpFuns.httpPost(actions.getparentmenus, params);
        }

    }]);
})