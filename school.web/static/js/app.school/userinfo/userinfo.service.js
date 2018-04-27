define(['require','angular','utils/http-funs'],function(require,ng){
	var module = ng.module('app.service');
	module.service('userinfoSrv', ['$q','httpFuns', function($q,httpFuns){
        //console.log(httpFuns);
		var actions = {
            getprovince: "getprovince",
            getcity: "getcity",
            getcounty: "getcounty",
            getschool: "getschool",
            setteacherpassword: "setteacherpassword",
            savebaseinfo: "setteacherinfobase",
            saveteachinfo: "setteachertaught",
            teachauth: "saveteachinfo",
            emailauth: "saveteachinfo",
            phoneauth: "saveteachinfo",
            setteacherpic: "setteacherpic",
            getteacherintegral: "getteacherintegral",
            getteacherintegralbuyproductlist: "getteacherintegralbuyproductlist",
            getteacherintegralcanbuyproductlist: "getteacherintegralcanbuyproductlist",
            teacherbuyintegralproduct: "teacherbuyintegralproduct",
        }
        var funcs = {
            getProvince: _getProvince,
            getCity: _getCity,
            getCounty: _getCounty,
            getSchool: _getSchool,
            setTeacherPassword: _setTeacherPassword,
            saveBaseInfo: _saveBaseInfo,
            saveTeachInfo: _saveTeachInfo,
            teachAuth: _teachAuth,
            emailAuth: _emailAuth,
            phoneAuth: _phoneAuth,
            setTeacherPic: _setTeacherPic,
            getTeacherIntegral: _getTeacherIntegral,
            getTeacherIntegralBuyProductList: _getTeacherIntegralBuyProductList,
            getTeacherIntegralCanBuyProductList: _getTeacherIntegralCanBuyProductList,
            teacherBuyIntegralProduct: _teacherBuyIntegralProduct,
        };
        return funcs;
        function _getProvince(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getprovince, verification:angular.toJson(verification), data: angular.toJson(params) });
        }		
        function _getCity(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getcity, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getCounty(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getcounty, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getSchool(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getschool, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _setTeacherPassword(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setteacherpassword, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _saveBaseInfo(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.savebaseinfo, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _saveTeachInfo(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.saveteachinfo, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _teachAuth(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.teachauth, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _emailAuth(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.emailauth, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _phoneAuth(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.phoneauth, verification:angular.toJson(verification), data: angular.toJson(params) });
        }
        function _setTeacherPic(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.setteacherpic, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeacherIntegral(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherintegral, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeacherIntegralBuyProductList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherintegralbuyproductlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _getTeacherIntegralCanBuyProductList(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.getteacherintegralcanbuyproductlist, verification: angular.toJson(verification), data: angular.toJson(params) });
        }
        function _teacherBuyIntegralProduct(params, verification) {
            return httpFuns.httpPost(globalConfig.apiPath, { action: actions.teacherbuyintegralproduct, verification: angular.toJson(verification), data: angular.toJson(params) });
        }

	}]);
})