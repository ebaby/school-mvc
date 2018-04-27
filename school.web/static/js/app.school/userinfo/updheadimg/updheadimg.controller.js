define(['require', 'angular', 'directives/com-directives', 'userinfo/userinfo.service'], function (require, ng) {
	var module = ng.module('app.userinfo');
	
	module.controller('UpdHeadImgCtrl', ['$scope', '$rootScope', 'userinfoSrv', 'toastr', function ($scope, $rootScope, userinfoSrv, toastr) {
	    //$scope.title = '修改头像';

	    $scope.vm = {
            

	    }
	    $scope.imgOptions = {
	        uploadImg: _uploadImg
	    }
	    function _uploadImg(imgdata) {
	        //alert(imgdata);	        
	        var params = {
	            pic: imgdata

	        }
	        userinfoSrv.setTeacherPic(params,'').then(function (result) {
	            if (result.status === 200) {
	                $rootScope.teacherinfo.headpic = result.data[0].picurl;
	                toastr.success('修改成功', '');
	            }
	            else {
	                toastr.error(result.msg, '');
	            }
	        });
	    }
	    var rootHandle = $rootScope.$watchCollection('teacherinfo', function (newvalue, oldvalue) {
	        if (newvalue) {
	            $scope.vm = $rootScope.teacherinfo;
	            rootHandle();
	        }

	    })

	}]);
});