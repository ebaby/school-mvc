define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
    var module = ng.module('app.service');
    module.service('menuMgrSrv', ['$q', 'httpFuns', function ($q, httpFuns) {
        //console.log(httpFuns);
        var actions = {
            savemenu: "/Content/SaveMenu",
            getmenulist: "/Content/GetMenuList",
            getmenu: "/Content/GetMenuEntity",
            getparentmenus: "/Content/GetParentMenus",

        }
        var funcs = {
            saveMenu: _saveMenu,
            getMenuList: _getMenuList,
            getMenu: _getMenu,
            getParentMenus: _getParentMenus,

        };
        return funcs;
        function _saveMenu(params) {
            return httpFuns.httpPost(actions.savemenu, params);
        }
        function _getMenuList(params) {
            return httpFuns.httpPost(actions.getmenulist, params);
        }
        function _getMenu(params) {
            return httpFuns.httpPost(actions.getmenu, params);
        }
        function _getParentMenus(params) {
            return httpFuns.httpPost(actions.getparentmenus, params);
        }

    }]);
})