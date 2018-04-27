define([],function(){
	var basePath = {
	    homework: globalConfig.appPath + 'menumgr/'
	}
	return {
		defaultRoutePath:'/',
		lazyCfg:{
		    'stateName': 'app.menumgr',
		    'urlPrefix': '/menumgr',
            'type':'ngload',
            'src': basePath.homework + 'app-menumgr.module.js'
		},
		routers:{
		    'app.menumgr': {
		        url: '/menumgr',
				dependencies:[
					//basePath.homework + 'customer.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'menu/menulist.html',
						//controller:'AnalyzeCtrl'
					}
				}
			},
		    'app.menumgr.menu': {
		        url: '/menulist',
				dependencies:[
					basePath.homework + 'menu/menu.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'menu/menulist.html',
					    controller: 'MenuListCtrl'
					}
				}
			},
		    //'app.usermgr.customer.custlist': {
		    //    url: '/custlist',
			//	dependencies:[
			//		basePath.homework + 'customer/customer.controller.js'
			//	],
			//	views:{
			//		'content@app':{
			//		    templateUrl: basePath.homework + 'customer/custlist.html',
			//		    controller: 'CustListCtrl'
			//		}
			//	}
			//},
		    'app.menumgr.menu.addmenu': {
		        url: '/addmenu/:mid',
				dependencies:[
					basePath.homework + 'menu/menu.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'menu/addmenu.html',
						controller:'AddMenuCtrl'
					}
				}
			}

		}
	}
})