define(['require', 'angular', 'ngload', 'analyze/app-analyze.router', 'components/moduleExtras', 'pagination'], function (require, ng, ngload, routerCfg, moduleExtras) {
	var module = angular.module('app.analyze',['ui.router']);
	moduleExtras.call(module,routerCfg);
	return module;
})