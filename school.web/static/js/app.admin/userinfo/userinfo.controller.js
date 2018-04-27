define(['require','angular','directives/com-directives','userinfo/userinfo.service'],function(require,ng){
	var module = ng.module('app.userinfo');
	module.controller('UserInfoCtrl', ['$scope', '$state', 'userinfoSrv', '$rootScope', 'ngDialog', function ($scope, $state, userinfoSrv, $rootScope, ngDialog) {
		$scope.title = '个人信息';
		$scope.vm = {
			tabindex:0
		}
		var states = ['app.userinfo.baseinfo', 'app.userinfo.buylog', 'app.userinfo.printlog'];
		$scope.selectTab = _selectTab;
		function _selectTab(tabIndex){
			$scope.vm.tabindex = tabIndex;
			$state.go(states[tabIndex]);

			if (tabIndex == 4) {
			    $rootScope.creditstatus = true;

			} else {
			    $rootScope.creditstatus = false;
			}
		}


	    //查看积分规则
		$rootScope.creditstatus = false;
		$scope.creditDialog = _creditDialog;


		initialize();
		function initialize(){
			//console.log("userinfo:"+$rootScope.teacherinfo);
			initRouter();
			//_getTeacherInfo();
		}
		function initRouter(){
			var currentRouter = $state.current.name;
			if(currentRouter === 'app.userinfo'){
				$scope.selectTab(0);
			}
			angular.forEach(states, function (state, index) {
			    if (currentRouter === state) {
			        $scope.selectTab(index);
			    }
			});

			if (currentRouter == 'app.userinfo.credit') {
			    $rootScope.creditstatus = true;

			} else {
			    $rootScope.creditstatus = false;
			}
		}

		function _creditDialog() {

		    ngDialog.open({
		        template: 'js/app/userinfo/credit/creditdialog.html',
		        className: 'ngdialog-theme-default',
		        width: 700,
		        //height: 400,
		        //showClose: false,
		        scope: $scope
		    });
		}


		//获取教师信息
		// function _getTeacherInfo(){
		// 	var params = {
				
		// 	};
  //     		userinfoSrv.getTeacherInfo(params,'').then(function(result){
	    //     			if(result.status===200){
  //     				var data=result.data[0];
  //     				$scope.vm.base = data;
  //     				//$scope.vm.base = angular.copy($scope.base);
  //     				//console.log($scope.base.province);

  //     			}else{
  //     				toastr.error(result.msg, '');
  //     			}
        		
  //       		//console.log(result.data)
  //     		});

		// }


	}]);
});