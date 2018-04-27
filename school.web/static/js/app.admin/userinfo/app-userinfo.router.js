define([],function(){
	var basePath = {
		userinfo:globalConfig.appPath+'userinfo/'
	}
	return {
		defaultRoutePath:'/',
		lazyCfg:{
			'stateName':'app.userinfo',
            'urlPrefix':'/userinfo',
            'type':'ngload',
            'src':basePath.userinfo+'app-userinfo.module.js'
		},
		routers:{
			'app.userinfo':{
				url:'/userinfo',
				dependencies:[
					basePath.userinfo + 'userinfo.controller.js'
				],
				views:{
					'content@app':{
						templateUrl:basePath.userinfo+'userinfo.html',
						controller:'UserInfoCtrl'
					}
				}
			},
			'app.userinfo.baseinfo':{
				url:'/baseinfo',
				dependencies:[
					basePath.userinfo + 'baseinfo/baseinfo.controller.js'
				],
				views:{
					'userinfo@app.userinfo':{
						templateUrl:basePath.userinfo+'baseinfo/baseinfo.html',
						controller:'BaseInfoCtrl'
					}
				}
			},
			'app.userinfo.buylog':{
				url:'/buylog',
				dependencies:[
					basePath.userinfo + 'buylog/buylog.controller.js'
				],
				views:{
					'userinfo@app.userinfo':{
						templateUrl:basePath.userinfo+'buylog/buylog.html',
						controller:'BuyLogCtrl'
					}
				}
			},
			'app.userinfo.printlog':{
				url:'/printlog',
				dependencies:[
					basePath.userinfo + 'printlog/printlog.controller.js'
				],
				views:{
					'userinfo@app.userinfo':{
						templateUrl:basePath.userinfo+'printlog/printlog.html',
						controller:'PrintLogCtrl'
					}
				}
			}
		}
	}
})