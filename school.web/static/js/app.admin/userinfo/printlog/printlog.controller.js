define(['require','angular','directives/com-directives','userinfo/userinfo.service'],function(require,ng){
	var module = ng.module('app.userinfo');
	
	module.controller('PrintLogCtrl', ['$scope', 'userinfoSrv', 'toastr', '$rootScope', 'ngDialog', function ($scope, userinfoSrv, toastr, $rootScope, ngDialog) {
		//$scope.title = '修改密码';

	    $scope.vm = {
	        token: window.localStorage.token,
	        pageindex: 1,
	        pagesize: 10
		}

		//var rootHandle = $rootScope.$watchCollection('userinfo', function (newvalue, oldvalue) {
		//    if (newvalue) {
		//        $scope.vm.userinfo = $rootScope.userinfo;

		//        _getPrintRecordList();
		//        rootHandle();
		//    }

	    //});

		$scope.deletePrintRecordDialog = _deletePrintRecordDialog;
		$scope.deletePrintRecord = _deletePrintRecord;

		initialize();
		function initialize() {

		   _getPrintRecordList();
		}

	    //获取用户打印记录
		function _getPrintRecordList() {

		    var params = {
		        token: $scope.vm.token,
		        pageindex: $scope.vm.pageindex,
		        pagesize: $scope.vm.pagesize
		    };
		    userinfoSrv.getPrintRecordList(params).then(function (result) {
		        if (typeof (result) === 'string') {
		            result = angular.fromJson(result);
		        }
		        if (result.code === 200) {

		            

		            
		            angular.forEach(result.data[0], function (o,i) {
		                o.timu = [];
		                angular.forEach(o.content.split(';'), function (oo, ii) {
		                    o.timu.push({name:oo});
		                });
		                
		            });
		            $scope.vm.printrecordlist = result.data[0];
		            
		        }
		    });
		}

	    //删除用户打印记录
		function _deletePrintRecordDialog(print, $event) {
		    $event.stopPropagation();
		    $scope.vm.currrentprint = print;
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">' +
                        '<p>是否删除该用户的打印记录?</p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="deletePrintRecord()">确定</button>' +
                        '</div>' +
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });

		}

	    //删除用户打印记录
		function _deletePrintRecord() {

		    var params = {
		        id: $scope.vm.currrentprint.id,
		        token: $scope.vm.token

		    };
		    userinfoSrv.deletePrintRecord(params).then(function (result) {
		        if (typeof (result) === 'string') {
		            result = angular.fromJson(result);
		        }
		        if (result.code === 200) {

		            $scope.vm.currrentprint.disable = !$scope.vm.currrentprint.disable;
		            toastr.success('删除成功', '');
		            ngDialog.closeAll();

		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}


	}]);
});