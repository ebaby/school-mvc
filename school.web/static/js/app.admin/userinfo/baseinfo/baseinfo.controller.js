define(['require','angular','directives/com-directives','userinfo/userinfo.service'],function(require,ng){
	var module = ng.module('app.userinfo');
	
	module.controller('BaseInfoCtrl', ['$scope', 'userinfoSrv', 'toastr', '$rootScope', '$timeout', '$interval', function ($scope, userinfoSrv, toastr, $rootScope, $timeout, $interval) {
	    $scope.title = '基本信息';

	    $scope.vm = {
	        token: window.localStorage.token,
		    tabindex: 0,
		    smsindex: 0,
		    smstime:60
	    }
	    $scope.imgOptions = {
	        setTabindex: _setTabindex
	    }
		initialize();
		function initialize(){
		    
		}
		
		$scope.selectTab = _selectTab;
		$scope.studentUserInfoSave = _studentUserInfoSave;
		$scope.studentUserInfoUpdatePwd = _studentUserInfoUpdatePwd;
		$scope.phoneStar = _phoneStar;
		$scope.getNoteCode = _getNoteCode;
		$scope.updateUserMobile = _updateUserMobile;

		function _selectTab(tabIndex) {
		    $scope.vm.tabindex = tabIndex;
            //清空上次数据
		    if (tabIndex == 0 || tabIndex == 2) {
		        $scope.vm.submitted = null;
		        $scope.vm.oldpwd = null;
		        $scope.vm.newpwd = null;
		        $scope.vm.pwdconfirm = null;
		    }

		}
		function _setTabindex(tabindex) {
		    $scope.$apply(function () {
		        $scope.vm.tabindex = tabindex;
		    });
		}
		var rootHandle = $rootScope.$watchCollection('userinfo', function (newvalue, oldvalue) {
		    if (newvalue) {
		        $scope.vm.userinfo =  angular.copy($rootScope.userinfo);
		        $scope.vm.userinfo.starphone = _phoneStar($scope.vm.userinfo.phone);

		        rootHandle();
		    }

		})

		var rootHandle1 = $rootScope.$watchCollection('classinfo', function (newvalue, oldvalue) {
		    if (newvalue) {
		        $scope.vm.classinfo = $rootScope.classinfo;

		        rootHandle1();
		    }

		})

		

		//保存学生信息
		function _studentUserInfoSave() {
		    //console.log($scope.vm.base);
		    
		    var params = {
		        token: $scope.vm.token,
		        headpicurl: $scope.vm.userinfo.pic,
		        realName: $scope.vm.userinfo.realname,
		        sex: $scope.vm.userinfo.sex,
		        //birthday: $scope.vm.userinfo.birthday,
		        //upid: $scope.vm.userinfo.upid
		    };
		    userinfoSrv.studentUserInfoSave(params).then(function (result) {
		        if (typeof (result) === 'string') {
		            result = angular.fromJson(result);
		        }
        		if(result.code===200){        			
        		    $rootScope.userinfo.realname = $scope.vm.userinfo.realname;
        		    $rootScope.userinfo.sex = $scope.vm.userinfo.sex;

        		    $scope.vm.userinfo.pic = $('#headpic').attr('src');
        		    $rootScope.userinfo.pic = $scope.vm.userinfo.pic;


        			
        			toastr.success('修改成功', '');
				}
        		else{
        			toastr.error(result.msg, '');

        		}
      		});

		}

		//修改密码
		function _studentUserInfoUpdatePwd(isValid) {
		    $scope.vm.submitted = true;
            //判断两次输入是否一致
		    if ($scope.vm.newpwd != $scope.vm.pwdconfirm) { return false;}

		    if (isValid) {
		        var params = {
		            token: $scope.vm.token,
		            oldpwd: $scope.vm.oldpwd,
		            newpwd: $scope.vm.newpwd,
		        };
		        userinfoSrv.studentUserInfoUpdatePwd(params).then(function (result) {
		            if (typeof (result) === 'string') {
		                result = angular.fromJson(result);
		            }
		            if (result.code === 200) {

		                $scope.vm.oldpwd = '';
		                $scope.vm.newpwd = '';
		                $scope.vm.pwdconfirm = '';
		                $scope.vm.tabindex = 0;

		                toastr.success('修改成功', '');
		            }
		            else {
		                toastr.error(result.msg, '');

		            }
		        });
		    }

		}
		//修改手机
		function _updateUserMobile(isValid) {
		    $scope.vm.submitted = true;
		    if (isValid) {
		        var params = {
		            token: $scope.vm.token,
		            mobile: $scope.vm.newmobile,
		            valiestr: $scope.vm.valiestr,
		            loginpwd: $scope.vm.loginpwd,
		        };
		        userinfoSrv.updateUserMobile(params).then(function (result) {
		            if (typeof (result) === 'string') {
		                result = angular.fromJson(result);
		            }
		            if (result.code === 200) {

		                $scope.vm.tabindex = 0;
		                toastr.success('修改成功', '');
		            }
		            else {
		                toastr.error(result.msg, '');

		            }
		        });
		    }

		}

		
		function _phoneStar(phone) {
		    return phone.substring(0, 3) + "****" + phone.substring(8, 11);
		}

		function _getNoteCode() {
		    //api/Account/getmobliecode
		    var params = {
		        token: $scope.vm.token,
		        phone: $scope.vm.newmobile,
		    };
		    userinfoSrv.getMoblieCode(params).then(function (result) {
		        if (typeof (result) === 'string') {
		            result = angular.fromJson(result);
		        }
		        if (result.code === 200) {

		            $scope.vm.smsindex = !$scope.vm.smsindex;
		            var t = 60;
		            var timePromise = $interval(function () {
		                if (t > 0) {

		                    $scope.vm.smstime = t;
		                    t--;
		                    //console.log($scope.vm.smstime);
		                } else {
		                    $interval.cancel(timePromise);
		                    $scope.vm.smsindex = !$scope.vm.smsindex;
		                }
		            }, 1000, 100);

		        }
		        else {
		            toastr.error(result.msg, '');

		        }
		    });

		}


	}]);
});