define(['require', 'angular', 'ngload', 'articlemgr/app-articlemgr.router', 'components/moduleExtras'], function (require, ng, ngload, routerCfg, moduleExtras) {
    var module = angular.module('app.articlemgr', ['ui.router']);
	moduleExtras.call(module,routerCfg);
	return module;
})