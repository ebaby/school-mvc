define(['require', 'angular', 'ngload', 'userinfo/app-userinfo.router', 'components/moduleExtras', 'pagination'], function (require, ng, ngload, routerCfg, moduleExtras) {
	var module = angular.module('app.userinfo',['ui.router']);
	moduleExtras.call(module,routerCfg);
	return module;
})