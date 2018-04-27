define(['require','angular','ngload','menumgr/app-menumgr.router','components/moduleExtras'],function(require,ng,ngload,routerCfg,moduleExtras){
    var module = angular.module('app.menumgr', ['ui.router']);
	moduleExtras.call(module,routerCfg);
	return module;
})