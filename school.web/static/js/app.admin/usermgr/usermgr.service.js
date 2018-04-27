define(['require', 'angular', 'utils/http-funs'], function (require, ng) {
    var module = ng.module('app.service');
    module.service('userMgrSrv', ['$q', 'httpFuns', function ($q, httpFuns) {
        //console.log(httpFuns);
        var actions = {
            saveuser: "/Admin/Save",
            getuserlist: "/Admin/GetUserList",
            getuser: "/Admin/GetUser",

        }
        var funcs = {
            saveUser: _saveUser,
            getUserList: _getUserList,
            getUser: _getUser,

        };
        return funcs;
        function _saveUser(params) {
            return httpFuns.httpPost(actions.saveuser, params);
        }
        function _getUserList(params) {
            return httpFuns.httpPost(actions.getuserlist, params);
        }
        function _getUser(params) {
            return httpFuns.httpPost(actions.getuser, params);
        }

    }]);
})