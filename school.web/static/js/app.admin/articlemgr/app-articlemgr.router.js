define([],function(){
	var basePath = {
	    homework: globalConfig.appPath + 'articlemgr/'
	}
	return {
		defaultRoutePath:'/',
		lazyCfg:{
		    'stateName': 'app.articlemgr',
		    'urlPrefix': '/articlemgr',
            'type':'ngload',
            'src': basePath.homework + 'app-articlemgr.module.js'
		},
		routers:{
		    'app.articlemgr': {
		        url: '/articlemgr',
				dependencies:[
					//basePath.homework + 'customer.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'article/articlelist.html',
						//controller:'AnalyzeCtrl'
					}
				}
			},
		    'app.articlemgr.article': {
		        url: '/articlelist',
				dependencies:[
					basePath.homework + 'article/article.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'article/articlelist.html',
					    controller: 'ArticleListCtrl'
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
		    'app.articlemgr.article.addarticle': {
		        url: '/addarticle/:aid',
				dependencies:[
					basePath.homework + 'article/article.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'article/addarticle.html',
					    controller: 'AddArticleCtrl'
					}
				}
			}

		}
	}
})