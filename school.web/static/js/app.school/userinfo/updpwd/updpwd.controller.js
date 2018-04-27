define(['require','angular','directives/com-directives','userinfo/userinfo.service'],function(require,ng){
	var module = ng.module('app.userinfo');
	
	module.controller('UpdPasswordCtrl', ['$scope', 'userinfoSrv', 'toastr', '$rootScope', function ($scope, userinfoSrv, toastr, $rootScope) {
		//$scope.title = '修改密码';

	    $scope.vm = {
	        msgstatus: 0,
	        //errormsg: '',
	        //succmsg:''
	        pwdold: '',
	        pwd: '',
	        pwdconfirm: '',
	        verificationcode: '',
	        verifycode: '',
	    }

	    $scope.refresh = _refresh;

		var rootHandle = $rootScope.$watchCollection('teacherinfo', function (newvalue, oldvalue) {
		    if (newvalue) {
		        $scope.vm = $rootScope.teacherinfo;
		        _refresh();

		        rootHandle();
		    }

		});
		$scope.pwdReg = /^[A-Za-z0-9]+$/;

		$scope.keyDown = _keyDown;

		$scope.updPwd =_updPwd;
		function _updPwd(isValid) {
		    //console.log($scope.vm.mobilephone);

		    //if ($scope.vm.pwdold == ''||$scope.vm.pwdold ==undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请输入旧密码';
		    //    return false;
		    //}
		    //else if ($scope.vm.pwd == '' || $scope.vm.pwd == undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请输入新密码';
		    //    return false;
		    //}
		    //else if ($scope.vm.pwd.length >= 6 && $scope.vm.pwd.length <= 12) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '密码长度在6-12位';
		    //    return false;
		    //}
		    //else if ($scope.vm.pwdconfirm == '' || $scope.vm.pwdconfirm == undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请确认密码';
		    //    return false;
		    //}
		    //else if ($scope.vm.pwd != $scope.vm.pwdconfirm) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '两次输入密码不一致';
		    //    return false;
		    //}
		    //else if ($scope.vm.verificationcode ==''|| $scope.vm.verificationcode==undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请输入图片验证码';
		    //    return false;
		    //}
		    //else {


		    if (isValid) {
		        var params = {
		            phone: $scope.vm.mobilephone,
		            pwdold: $scope.vm.pwdold,
		            pwd: $scope.vm.pwd,
		            verificationcode: $scope.vm.verificationcode

		        }//setteacherpassword  
		        userinfoSrv.setTeacherPassword(params, '').then(function (result) {
		            if (result.status === 200) {
		                toastr.success('修改成功', '');
		                //$scope.vm.msgstatus = 2;
		                //$scope.vm.succmsg = '修改成功';
		            } else {
		                toastr.error(result.msg, '');
		                //$scope.vm.msgstatus = 1;
		                //$scope.vm.errormsg = result.msg;
		            }
		        });
		    }

		    //}
			
		}

		function _keyDown($event) {
		    $scope.vm.msgstatus = 0;
		}

		function _refresh() {
		    $scope.vm.verifycode = '/webapi/verifycode?v=' + new Date().getTime();
		}


	}]);
});