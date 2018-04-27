define([],function(){
	var basePath = {
	    homework: globalConfig.appPath + 'usermgr/'
	}
	return {
		defaultRoutePath:'/',
		lazyCfg:{
		    'stateName': 'app.usermgr',
		    'urlPrefix': '/usermgr',
            'type':'ngload',
            'src': basePath.homework + 'app-usermgr.module.js'
		},
		routers:{
		    'app.usermgr': {
		        url: '/usermgr',
				dependencies:[
					//basePath.homework + 'customer.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'customer/custlist.html',
						//controller:'AnalyzeCtrl'
					}
				}
			},
		    'app.usermgr.customer': {
		        url: '/custlist',
				dependencies:[
					basePath.homework + 'customer/customer.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'customer/custlist.html',
					    controller: 'CustListCtrl'
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
		    'app.usermgr.customer.addcust': {
		        url: '/addcust/:uid',
				dependencies:[
					basePath.homework + 'customer/customer.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'customer/addcust.html',
						controller:'AddCustCtrl'
					}
				}
			}

		}
	}
})