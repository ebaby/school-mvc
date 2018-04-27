define([],function(){
	var basePath = {
		homework:globalConfig.appPath+'analyze/'
	}
	return {
		defaultRoutePath:'/',
		lazyCfg:{
			'stateName':'app.analyze',
            'urlPrefix':'/analyze',
            'type':'ngload',
            'src':basePath.homework+'app-analyze.module.js'
		},
		routers:{
			'app.analyze':{
				url:'/analyze',
				dependencies:[
					//basePath.homework + 'analyze.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'period/index.html',
						//controller:'AnalyzeCtrl'
					}
				}
			},
			'app.analyze.period': {
			    url: '/period',
				dependencies:[
					basePath.homework + 'period/period.controller.js'
				],
				views: {
				    'content@app': {
				        templateUrl: basePath.homework + 'period/index.html',
				        controller: 'PeriodCtrl'
				    }
				}
			},
			'app.analyze.period.detail': {
			    url: '/detail/:tchwlogid',
				dependencies:[
					basePath.homework + 'period/period.controller.js'
				],
				views: {
				    'content@app': {
				        templateUrl: basePath.homework + 'period/detail.html',
				        controller: 'PerioddetailCtrl'
				    }
				}
			},
			'app.analyze.period.student': {
			    url: '/student/:tchwlogid',
				dependencies:[
					basePath.homework + 'period/period.controller.js'
				],
				views: {
				    'content@app': {
				        templateUrl: basePath.homework + 'period/student.html',
				        controller: 'PeriodstudentCtrl'
				    }
				}
			},
			'app.analyze.period.wrong': {
			    url: '/wrong/:upid/:tchwlogid',
				dependencies:[
					basePath.homework + 'period/period.controller.js'
				],
				views: {
				    'content@app': {
				        templateUrl: basePath.homework + 'period/wrong.html',
				        controller: 'WrongCtrl'
				    }
				}
			},
			'app.analyze.period.known': {
			    url: '/known/:zsdid/:tchwlogid',
				dependencies:[
					basePath.homework + 'period/period.controller.js'
				],
				views: {
				    'content@app': {
				        templateUrl: basePath.homework + 'period/known.html',
				        controller: 'KnownCtrl'
				    }
				}
			},
			'app.analyze.class':{
			    url: '/class/:classid',
				dependencies:[
					basePath.homework + 'class/class.controller.js'
				],
				views:{
					'content@app':{
						templateUrl:basePath.homework+'class/class.html',
						controller:'ClassCtrl'
					}
				}
			},
			'app.analyze.class.student': {
			    url: '/student/:classid',
				dependencies:[
					basePath.homework + 'class/class.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'class/student.html',
					    controller: 'ClassstudentCtrl'
					}
				}
			},
			'app.analyze.class.known': {
			    url: '/known/:zsdid/:classid/:charpterid',
				dependencies:[
					basePath.homework + 'class/class.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'class/known.html',
					    controller: 'ClassknownCtrl'
					}
				}
			},
			'app.analyze.class.heightwrong': {
			    url: '/heightwrong/:classid/:charpterid',
				dependencies:[
					basePath.homework + 'class/class.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'class/heightwrong.html',
					    controller: 'HeightWrongCtrl'
					}
				}
			},
			'app.analyze.print': {
			    url: '/print',
				dependencies:[
					basePath.homework + 'print/print.controller.js'
				],
				views:{
					'content@app':{
					    templateUrl: basePath.homework + 'print/print.html',
					    controller: 'PrintCtrl'
					}
				}
			},
			'app.analyze.person':{
				url:'/person/:upid',
				dependencies:[
					basePath.homework + 'person/person.controller.js'
				],
				views:{
					'content@app':{
						templateUrl:basePath.homework+'person/person.html',
						controller:'PersonCtrl'
					}
				}
			}

		}
	}
})