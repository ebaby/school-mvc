define(['require','angular','directives/com-directives','layout/main.service'],function(require,ng){
	var module = ng.module('app.layout');
	module.controller('MainCtrl', ['$scope', '$state', 'mainSrv', 'ngDialog', 'toastr', '$rootScope', function ($scope, $state, mainSrv, ngDialog, toastr, $rootScope) {
		$scope.vm = {
		    colorItems: ["#2FC3E1", "#3598dc", "#ff7a5a"],
		    pageindex: 0,
		    pagesize: 3,
            allpage:0,
		    homework: {}
		}

		$scope.deleteHomeWork = _deleteHomeWork;
		$scope.deleteHwDialog = _deleteHwDialog;
		$scope.goToStatistics = _goToStatistics;
		$scope.goToSAnalyze = _goToSAnalyze;
		$scope.goToUnStudents = _goToUnStudents;
		$scope.goToStudents = _goToStudents;

		initialize();
		
		$scope.pageOptions = {
		    scrollLoaddata: _getCheckList
		}

		function initialize(){
			//_getCheckList();
		    _checkLogin();
		}

		$scope.dateoption = {
          zydatetiem:"",
	      setDatetime:_setDatetime
	    }
	    $scope.editDatetime = _editDatetime;
	    function _setDatetime(dt){
	        //alert(dt);
	        //var time = "\/Date(" + (new Date(dt.replace(/-/g, "/"))).getTime() + ")\/"
	        _updateSubendTime(dt);
	      $scope.vm.currenthw.editable = false;
	    }
    	

    	function _editDatetime(hw){
    		if($scope.vm.currenthw){
    			$scope.vm.currenthw.editable = false;
    		}
    		$scope.dateoption.zydatetiem = hw.subendtime;
    		$scope.vm.currenthw = hw;
    		hw.editable=!hw.editable;

    	}

    	$scope.nextPage = _nextPage;

		//获取班级作业统计情况
    	function _getCheckList() {
    	    $scope.vm.pageindex = $scope.vm.pageindex + 1;
		    var params = {
		        page: $scope.vm.pageindex,
		        type: 2,
		        num: $scope.vm.pagesize

		    };
		    if ($scope.vm.allpage!=0 && $scope.vm.pageindex > $scope.vm.allpage) {
		        $scope.vm.pageindex = $scope.vm.allpage;
		        return;
		    }
      		mainSrv.getCheckList(params,'').then(function(result){
      		    if (result.status === 200) {

      		        $scope.vm.classidlist = result.data[0].classidlist;
      		        if ($scope.vm.allpage==0) {
      		            $scope.vm.allpage = result.data[0].allpage;
      		        }
      		        $scope.vm.classidlist = result.data[0].classidlist;
      		        if (!$scope.vm.pigailist) {
      		            $scope.vm.pigailist = [];
      		        }
      		        angular.forEach(result.data[0].pigailist, function (dp, index) {
      		            $scope.vm.pigailist.push(dp);
      		        });
      				//if ($scope.vm.classidlist.length ==1) {
      				//    $scope.vm.classindex = 12;
      				//} else if ($scope.vm.classidlist.length ==2) {

      				//    $scope.vm.classindex = 6;
      				//}  else if ($scope.vm.classidlist.length ==3) {

      				//    $scope.vm.classindex = 4;
      				//} else {
      				//    $scope.vm.classindex = 12 / $scope.vm.classidlist.length;
      				//    if ($scope.vm.classindex < 4) {
      				//        $scope.vm.classindex = 4;
      				//    }
      				//}
      				angular.forEach($scope.vm.classidlist,function(i,j){
						//angular.forEach($scope.vm.colorItems,function(k,l){

						//    if(j==l){
							
						//	    i.bgcolor=k;
						//	    return false;
						//    }

      				    //});

      				    if (j >= $scope.vm.colorItems.length) {
      				        i.bgcolor = $scope.vm.colorItems[j % $scope.vm.colorItems.length];
      				    } else {
      				        i.bgcolor = $scope.vm.colorItems[j];
      				    }
      				    

      				});
					//console.log($scope.vm.classidlist);
      		    } else {
      		        $scope.vm.pageindex = $scope.vm.pageindex - 1;
      				toastr.error(result.msg, '');
      			}
        		
        		//console.log(result.data)
      		});
		}

		function _nextPage() {
		    //$scope.vm.pageindex += 1;
		    //_getCheckList();
		}

        //取消布置
		function _deleteHwDialog(home) {
		    $scope.vm.homework=home;
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">' +
                        '<p>是否要取消布置</span></p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="deleteHomeWork()">确定</button>' +
                        '</div>' +
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });
		}

	    //
		function _deleteHomeWork() {
		    var params = {
		        tchwlogid: $scope.vm.homework.tchwlogid

		    };
		    mainSrv.deleteHomeWork(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('取消成功', '');
		            $scope.vm.homework.disable = !$scope.vm.homework.disable;
		            ngDialog.closeAll();
		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

	    //设置提交截止时间 
		function _updateSubendTime(time) {
		    var params = {
		        tchwlogid: $scope.vm.currenthw.tchwlogid,
		        time: "\/Date(" + (new Date(time.replace(/-/g, "/"))).getTime() + ")\/"

		    };
		    mainSrv.updateSubendTime(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('设置成功', '');

		            $scope.vm.currenthw.subendtime = time;
		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

	    //跳转到作业统计
		function _goToStatistics(home) {
		    $rootScope.statisticshw = home;
		    $state.go('app.sethomework.statistics', { tchwlogid: home.tchwlogid });
		}

	    //跳转学情分析
		function _goToSAnalyze(hw) {
		    $state.go('app.analyze.period.detail', { tchwlogid: hw.tchwlogid });
		}
	    //去批改作业
		function _goToUnStudents(hw) {
		    $rootScope.tchwinfo = hw;
		    $state.go('app.checkhomework.unalreadyhw.unstudent', { tchwlogid: hw.tchwlogid });
		}
	    //重新批改作业
		function _goToStudents(hw) {
		    
		    $state.go('app.checkhomework.alreadyhw.student', { tchwlogid: hw.tchwlogid });
		}

	    //需要验证是否登录的页面需要执行该方法
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
		    mainSrv.checkLogin(params, '').then(function (result) {
		        if (result.status === 200) {
		            var flag = true;
		            angular.forEach(result.data[0].returnparameters.userguidance, function (o, i) {
		                if (o.checkstatus == 1) {
		                    flag = false;
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
		
		
	}])
});