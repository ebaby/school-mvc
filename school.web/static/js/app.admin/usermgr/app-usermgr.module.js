define(['require','angular','ngload','usermgr/app-usermgr.router','components/moduleExtras'],function(require,ng,ngload,routerCfg,moduleExtras){
    var module = angular.module('app.usermgr', ['ui.router']);
	moduleExtras.call(module,routerCfg);
	return module;
})