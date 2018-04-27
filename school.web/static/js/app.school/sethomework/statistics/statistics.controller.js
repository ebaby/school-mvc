define(['require', 'angular', 'sethomework/sethomework.service', 'directives/com-directives'], function (require, ng) {
    var module = ng.module('app.sethomework');
    module.controller('StatisticsCtrl', ['$scope', '$state', 'setHomeWorkSrv', 'ngDialog', 'toastr', '$rootScope', function ($scope, $state, setHomeWorkSrv, ngDialog, toastr, $rootScope) {
	    //$scope.title = '布置作业记录';

        $scope.vm = {
            tchwlogid:$state.params.tchwlogid,
	        pageindex: 1,
            pagesize:10
	    }

	    $scope.hwloglistOptions = {
	        goNextpage: _goNextpage,
	        allpage: 0
	    }

	    $scope.dateoption = {
	        setDatetime: _setDatetime
	    }
	    $scope.editDatetime = _editDatetime;
	    function _setDatetime(dt) {
	        //alert(dt);
	        //var time = "\/Date(" + (new Date(dt.replace(/-/g, "/"))).getTime() + ")\/"
	        _updateSubendTime(dt);
	        $scope.vm.currenthw.editable = false;
	    }


	    function _editDatetime(hw) {
	        if ($scope.vm.currenthw) {
	            $scope.vm.currenthw.editable = false;
	        }

	        $scope.vm.currenthw = hw;
	        hw.editable = !hw.editable;

	    }

	    initialize();
	    function initialize() {

	        _getHomeStatistics();
	    }

	    function _goNextpage(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getYiBuZhiZuoYeList();
	        //alert(pageindex);
	    }

        //作业统计 
	    function _getHomeStatistics() {
	        var params = {
	            tchwlogid: $scope.vm.tchwlogid,
	            page: $scope.vm.pageindex,
	            num: $scope.vm.pagesize

	        };
	        setHomeWorkSrv.getHomeStatistics(params, '').then(function (result) {
	            if (result.status === 200) {
	                //toastr.success('设置成功', '');
	                $scope.vm.upidlist = result.data[0].upidlist;
	            } else {
	                //toastr.error(result.msg, '');
	            }
	        });
	    }


	}])
});