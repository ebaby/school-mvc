(function(window){
	var global={
	    apiPath: 'http://moapi.yqj.cn/MockAPI/',
		libPath:'/static/js/libs/',
        appPath:'/static/js/app.school/',
        comLib: '/static/js/comlibs/',
	};
	window.globalConfig=window.globalConfig||global;
})(window)
require.config({
    baseUrl: "/static/js/app.school/",
	paths:{
		'app':globalConfig.appPath+"app",
		'jquery': globalConfig.libPath + 'jquery.min',
		'pagination':window.globalConfig.comLib + 'pagination/jquery.pagination',
		'echarts': window.globalConfig.comLib + 'echarts',
		'zrender': window.globalConfig.comLib + 'zrender',
        'angular':globalConfig.libPath+'angular.min',
        'ng-dialog':globalConfig.libPath+'ngDialog.min',
        'angular-toastr':globalConfig.libPath+'angular-toastr',
        'angular-toastr.tpls':globalConfig.libPath+'angular-toastr.tpls',
		'angular-animate':globalConfig.libPath+'angular-animate',
		'angular-loading-bar':globalConfig.libPath+'loading-bar',
        'angular-route':globalConfig.libPath+'angular-ui-router',
        'angular-bootstrap':globalConfig.libPath+'ui-bootstrap-tpls', 
        //'bootstrap':globalConfig.libPath+'bootstrap',
        //'mymodule':globalConfig.libPath+'mymodule',
        //'messenger-theme':globalConfig.libPath+'messenger-theme-future',
        'angularAMD':globalConfig.libPath + "angularAMD",
		"uiRouterExtras":globalConfig.libPath + "ct-ui-router-extras",
		"ngload":globalConfig.libPath + "ngload",
		"moment":globalConfig.libPath + "moment",
	},
	shim:{
		'angular':{
			exports:'angular'
		},
		'angular-animate':{
			deps:['angular'],
			exports:'angular'
		},
		'angular-route':{
			deps:['angular'],
			exports:'angular'
		},
		'angular-bootstrap':{
			deps:['angular','moment'],
			exports:'angular'
		},
		'ng-dialog':{
		    deps: ['angular', 'css!' + globalConfig.libPath + 'ngDialog.min', 'css!' + globalConfig.libPath + 'ngDialog-theme-default'],
			exports:'angular'
		},
		'angular-toastr':{
		    deps: ['angular', 'angular-toastr.tpls', 'css!' + globalConfig.libPath + 'angular-toastr'],
			exports:'angular'
		},
		'angular-toastr.tpls':{
			deps:['angular'],
			exports:'angular'
		},
		'angular-loading-bar':{
		    deps: ['angular', 'css!' + globalConfig.libPath + 'loading-bar'],
			exports:'angular'
		},
		// 'bootstrap':{
		// 	deps:['jquery','angular-bootstrap','css!/js/libs/bootstrap'],
		// 	exports:'jquery'
		// },
		'moment':{ 
            exports:'moment'
        }, 
        'jquery':{
            exports:'$'
        },
        'pagination':{
            deps: ['jquery', 'css!' + window.globalConfig.comLib + 'pagination/pagination'],
            exports: '$'
        },
		/*'messenger':{
            deps:['jquery','css!/js/libs/messenger','css!/js/libs/messenger-theme-air'],
            exports:'Jquery'
        },
        'messenger-theme':{
            deps:['messenger'],
            exports:'Jquery'
        },*/
        "angularAMD":{
			deps:["angular"],
			exports:"angular"
		},
		"ngload":{
			deps:["angularAMD"],
			exports:"angular"
		},
		"uiRouterExtras":{
			deps:["angular-route"]
		}
	},
	map:{
		'*':{
			'css':globalConfig.libPath+'css.js'
		}
	},
	urlArgs:""
});
/*require(['app'],function(app){
	angular.bootstrap(document, ['app']);
})*/
require(['app','angularAMD'],function(app,angularAMD){
	angularAMD.bootstrap(app);
})