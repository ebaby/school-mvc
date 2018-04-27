define(['require', 'angular', 'directives/com-directives', 'userinfo/userinfo.service'], function (require, ng) {
	var module = ng.module('app.userinfo');
	
	module.controller('BuyLogCtrl', ['$scope', 'userinfoSrv', 'toastr', '$rootScope', 'ngDialog', function ($scope, userinfoSrv, toastr, $rootScope, ngDialog) {
		//$scope.title = '积分累积';

	    $scope.vm = {
	        token: window.localStorage.token,
		    pageindex: 1,
		    pagesize: 10,
            currentdatetime:new Date().getTime()

		}

		var rootHandle = $rootScope.$watchCollection('userinfo', function (newvalue, oldvalue) {
		    if (newvalue) {
		        $scope.vm.userinfo = $rootScope.userinfo;

		        _liveCourseList();
		        rootHandle();
		    }

		});

		$scope.getTime = _getTime;
		$scope.getBeginTime = _getBeginTime;
		$scope.getEndTime = _getEndTime;
		$scope.playvedio = _playvedio;

		initialize();
		function initialize() {
		    
		   
		}

	    //直播课程
		function _liveCourseList() {

		    var params = {
		        upid: $scope.vm.userinfo.upid,
		        pageIndex: $scope.vm.pageindex,
		        pageSize: $scope.vm.pagesize,
		        token: $scope.vm.token
		    };
		    userinfoSrv.liveCourseList(params).then(function (result) {
		        if (typeof (result) === 'string') {
		            result = angular.fromJson(result);
		        }
		        if (result.code === 200) {
		            $scope.vm.livecourselist = result.data[0].livecourselist;

		        }

		        
		    });
		}

		function _getTime(time) {
		    return new Date(time).getTime();
		}

		function _getBeginTime(time) {
		    //return moment(time, 'YYYY-MM-DD HH:mm'); 
		    var date = new Date(time);
		    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

		}
		function _getEndTime(time) {
		    //return moment(time, 'HH:mm');
		    var date = new Date(time);
		    return date.getHours() + ':' + date.getMinutes();

		}

		function _playvedio(course) {
		    window.localStorage.telecastrecurl = course.telecastrecurl;
		    window.open('/static/livevideo.html');
		}

	}]);
});