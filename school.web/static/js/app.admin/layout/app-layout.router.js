define([], function () {
    var basePath = {
        layout: globalConfig.appPath + 'layout/'
    }
    return {
        defaultRoutePath: '/',
        /*lazyCfg:{
			'stateName':'app',
            'urlPrefix':'/',
            'type':'ngload',
            'src':basePath.layout+'app-layout.module.js'
		},*/
        routers: {
            'app': {
                url: '',
                dependencies: [
					basePath.layout + 'main.controller.js',
					basePath.layout + 'header.controller.js',
					basePath.layout + 'menubar.controller.js',
					basePath.layout + 'sidebar.controller.js',
                ],
                views: {
                    'header': {
                        templateUrl: basePath.layout + 'header.html',
                        controller: 'HeaderCtrl'
                    },
                    'sidebar': {
                        templateUrl: basePath.layout + 'sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    'menubar': {
                        templateUrl: basePath.layout + 'menubar.html',
                        controller: 'MenuBarCtrl'
                    },
                    '': {
                        templateUrl: basePath.layout + 'home.html',
                        //controller: 'HomeCtrl'
                    },
                    'content@app': {
                        templateUrl: basePath.layout + 'main.html',
                        controller: 'MainCtrl'
                    }
                }
            },
        }
    }
})