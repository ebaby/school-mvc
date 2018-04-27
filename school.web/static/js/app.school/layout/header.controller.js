define(['require','angular','layout/header.service'],function(require,ng){
	var module = ng.module('app.layout');
	module.controller('HeaderCtrl', ['$scope', '$state', 'headerSrv', '$rootScope', 'toastr', 'ngDialog', '$timeout', function ($scope, $state, headerSrv, $rootScope, toastr, ngDialog, $timeout) {
		$scope.vm = {
			tabindex:-1,
			childindex: 0,
			pageindex:1,
			pagesize: 6,
			allpage: 0
		}
		$scope.commentDialog = _commentDialog;
		$scope.closeDialog = _closeDialog;
		$scope.goToCredit = _goToCredit;
		var states = [{
		    "statename": "app",
		    "key": 0,
		    "childs": [
                //{
                //    "statename": "app.novice",
                //    "key": 0,
                //    "childs": []
                //},{
                //    "statename": "app.help",
                //    "key": 1,
                //    "childs": []
                //}
		    ]
		}, {
		    "statename": "app.checkhomework",
		    "key": 1,
		    "childs": [{
		        "statename": "app.checkhomework.unalreadyhw",
		        "key": 0,
		        "childs": [
                    {
                        "statename": "app.checkhomework.unalreadyhw.unstudent",
                        "key": 0,
                        "childs": []
                    },
                    {
                        "statename": "app.checkhomework.unalreadyhw.undetail",
                        "key": 1,
                        "childs": []
                    }
		        ]
		    }, {
		        "statename": "app.checkhomework.alreadyhw",
		        "key": 1,
		        "childs": []
		    }, {
		        "statename": "app.checkhomework.setholidayhw",
		        "key": 2,
		        "childs": []
		    }]
		}, {
		    "statename": "app.sethomework",
		    "key": 2,
		    "childs": [{
		        "statename": "app.sethomework.sethw",
		        "key": 0,
		        "childs": []
		    }, {
		        "statename": "app.sethomework.sethwlog",
		        "key": 1,
		        "childs": []
		    }
            , {
		        "statename": "app.sethomework.finsh",
		        "key": 2,
		        "childs": []
		    }
            //, {
		    //    "statename": "app.sethomework.statistics",
		    //    "key": 3,
		    //    "childs": []
            //}
		    ]
		}, {
		    "statename": "app.analyze",
		    "key": 3,
		    "childs": [
                {
                    "statename": "app.analyze.period",
                    "key": 0,
                    "childs": []
                }, {
                    "statename": "app.analyze.class",
                    "key": 1,
                    "childs": []
                }, {
                    "statename": "app.analyze.print",
                    "key": 2,
                    "childs": []
                }
		    ]
		}, {
		    "statename": "app.classmanage",
		    "key": 4,
		    "childs": [{
		        "statename": "app.classmanage.manage",
		        "key": 0,
		        "childs": []
		    }, {
		        "statename": "app.classmanage.create",
		        "key": 1,
		        "childs": []
		    }]
		}
		];
        
		//$rootScope.uinfo = {name:"123"};  
		$rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {

            //alert(fromState.name + "===" + toState.name);
            $("body, html").animate({ scrollTop: 0 }, 0);
            if (toState.name == "app.checkhomework.unalreadyhw.undetail" || toState.name == "app.checkhomework.alreadyhw.result" || toState.name == "app.checkhomework.alreadyhw.detail") {
                $("#sidebar").css("display", "none");
            } else {
                $("#sidebar").css("display", "block");
            }

            ngDialog.closeAll();
            _getTeacherInfo(true);
            var indexobj = getTabindex(toState.name);
            if (indexobj) {
                _selectTab(indexobj.tabindex, indexobj.childindex, true);
            }
            //console.log(toState);
        });


		//$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		//    $timeout(function () {
		//        $("#aboutfoot").hide();
		//    }, 1000);
		    
		//       fullScreen(toState);
        //})
		$rootScope.selectTab = _selectTab;
		$scope.setBaseinfo = _setBaseinfo;
		$scope.teacherLoginOut = _teacherLoginOut;
		$scope.setTeachersMessageRecordRead = _setTeachersMessageRecordRead;

		initialize();
		function initialize(){
			//var initindex = getTabindex();
			//if(typeof(initindex.tabindex)!=='undefined'){
			//	$scope.selectTab(initindex.tabindex,initindex.childindex);
			//}
		    
			_getTeacherInfo();
			_getTeachersMessageRecordList();

		}
		function _closeDialog() {
		    ngDialog.closeAll();
		}
		function _commentDialog() {
		    ngDialog.open({
		        template: 'js/app.tch/layout/messagedialog.html',
		        className: 'ngdialog-theme-default',
		        width: 800,
		        height: 200,
		        //plain: true,
		        scope: $scope
		    });
		}
        //批改作业时全屏
		function fullScreen(tostate) {
		    if (tostate.name == 'app.checkhomework.unalreadyhw.undetail' || tostate.name == 'app.checkhomework.alreadyhw.detail' || tostate.name == 'app.checkhomework.alreadyhw.result') {
		        $scope.vm.headershow = true;
		        
		    } else {
		        $scope.vm.headershow = false;
		    }
		}
		
		function _checkLogin() {
		    var params = {
		        parameters: {
		            userguidance: ['0601', '0301'],
		            wechat: {
		                code: '',
		                openid: ''
		            }
		        }

		    };
		    headerSrv.checkLogin(params, '').then(function (result) {
		        if (result.status === 200) {
		            var flag = false;
		            angular.forEach(result.data[0].returnparameters.userguidance, function (o, i) {
		                if (o.checkstatus == 2) {
		                    flag = true;
		                }
		            });

		            if (flag) {//老手
		                _getCheckList();
		            } else {//新手
		                $state.go('app.novice');
		            }

		        }
		    });
		}


		function _selectTab(tabIndex,childIndex, nogo){
		    //console.log('========');
		    if (typeof (tabIndex) === 'undefined') {
		        tabIndex = 0;
		    }
			$scope.vm.tabindex = tabIndex;
			childIndex ? childIndex = childIndex : childIndex = 0;
			$scope.vm.childindex = childIndex;
			var router ;
			if (typeof (childIndex) !== 'undefined') {
			    if (states[tabIndex] != undefined) {
			        if (states[tabIndex].childs.length > 0) {
			            router = states[tabIndex].childs[childIndex].statename;
			        } else {
			            router = states[tabIndex].statename;

			        }
			    }
			}else{
				router=states[tabIndex].statename;
			}
			if (!nogo) {
			    $state.go(router);
			}
			
		}
		function getTabindex(tostatename){
			var _tabindex,_childindex;
			var currentRouter = $state.current.name;
			if (currentRouter == 'app.novice') {
			    currentRouter = 'app';
			}
			if (tostatename) {
			    currentRouter = tostatename;
			}
			var routerArr = currentRouter.split(".");
			if (routerArr.length > 3) {
			    currentRouter = routerArr[0] + "." + routerArr[1] + "." + routerArr[2];
			}
			angular.forEach(states,function(state,tabindex){
				if(currentRouter === state.statename){
					_tabindex = tabindex;
					_childindex = 0;
				}
				if(state.childs.length>0){
					angular.forEach(state.childs,function(child,childindex){
						if(currentRouter === child.statename){
							_tabindex = tabindex;
							_childindex = childindex;
						}
					})
				}
			})
			return {
				tabindex:_tabindex,
				childindex:_childindex
			}
		}
		function _setBaseinfo(notab){
		    $scope.vm.tabindex = notab;
		    $state.go('app.userinfo', {}, {reload:true});
		    //$state.reload('app.userinfo');
		}
		function _goToCredit() {
		    $scope.vm.tabindex = -2;
		    $state.go('app.userinfo.credit', {}, { reload: true });

		}

		//获取教师信息
		function _getTeacherInfo(statechange) {
			var params = {
				
			};
      		 headerSrv.getTeacherInfo(params,'').then(function(result){
      		     if (result.status === 200 && !statechange) {
      				var data=result.data[0];
      				$rootScope.teacherinfo = data;
      				$rootScope.teacherinfo.sex = $.trim($rootScope.teacherinfo.sex);
      				//$scope.vm.base = data;
      				//$scope.vm.base = angular.copy($scope.base);
      				//console.log($rootScope.teacherinfo);

      		     } else if (result.status===512) {
      		         window.location.href = "/static/index.html";
      			}
        		
        		//console.log(result.data)
      		});

		}

	    //注销
		function _teacherLoginOut() {
		    var params = {

		    };
		    headerSrv.teacherLoginOut(params, '').then(function (result) {
		        if (result.status === 200 ) {
		            window.location.href = "/static/index.html";

		        } 
		    });
		}

	    $scope.listOptions = {
	        goNextpage: _goNextpage,
	        allpage:0
	    }

	    function _goNextpage(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getTeachersMessageRecordList();
	    }

	    //获取教师消息记录
		function _getTeachersMessageRecordList() {
		    //$scope.vm.pageindex = $scope.vm.pageindex + 1;
		    var params = {
		        page: $scope.vm.pageindex,
		        num: $scope.vm.pagesize

		    };
		    //if ($scope.vm.allpage != 0 && $scope.vm.pageindex > $scope.vm.allpage) {
		    //    $scope.vm.pageindex = $scope.vm.allpage;
		    //    return;
		    //}
		    headerSrv.getTeachersMessageRecordList(params, '').then(function (result) {
		        if (result.status === 200) {
		            $scope.listOptions.allpage = result.data[0].allpage;
		            $scope.vm.teachermessagelist = result.data[0].teachermessagelist;

		            //if (!$scope.vm.teachermessagelist) {
		            //    $scope.vm.teachermessagelist = [];
		            //}
		            //angular.forEach(result.data[0].teachermessagelist, function (dp, index) {
		            //    $scope.vm.teachermessagelist.push(dp);
		            //})

		        }
		    });
		}

	    //设置教师消息记录已阅读
		function _setTeachersMessageRecordRead(teacher) {
		    if (teacher.readstatus == 0) {
		        var params = {
		            midlist: [parseInt(teacher.mid)]
		        };
		        headerSrv.setTeachersMessageRecordRead(params, '').then(function (result) {
		            if (result.status === 200) {

		                teacher.readstatus = 1;
		                toastr.success('消息已阅', '');
		            }
		        });
		    } else {
		        toastr.warning('消息已阅', '');
		    }
		}


		
	}])
});