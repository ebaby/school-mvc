define(['require', 'angular', 'sethomework/sethomework.service', 'directives/com-directives'], function (require, ng) {
    var module = ng.module('app.sethomework');
    module.controller('HomeworkLogCtrl', ['$scope', '$state', 'setHomeWorkSrv', 'ngDialog', 'toastr', '$rootScope', function ($scope, $state, setHomeWorkSrv, ngDialog, toastr, $rootScope) {
	    //$scope.title = '布置作业记录';

	    $scope.vm = {
	        pageindex: 0,
	        pagesize: 10,
            allpage:0
	    }

	    $scope.hwloglistOptions = {
	        goNextpage: _goNextpage,
	        allpage: 0
	    }
	    $scope.deleteHomeWork = _deleteHomeWork;
	    $scope.deleteHwDialog = _deleteHwDialog;
	    $scope.goToStatistics = _goToStatistics;
	    $scope.goToUnStudents = _goToUnStudents;
	    $scope.goToSAnalyze = _goToSAnalyze;
	    $scope.goToStudents = _goToStudents;


	    $scope.pageOptions = {
	        scrollLoaddata: _getCheckList
	    }
	    $scope.dateoption = {
	        zydatetiem: "",
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
	        $scope.dateoption.zydatetiem = hw.subendtime;
	        $scope.vm.currenthw = hw;
	        hw.editable = !hw.editable;

	    }

	    initialize();
	    function initialize() {

	        _getCheckList();
	    }

	    function _goNextpage(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getCheckList();
	        //alert(pageindex);
	    }

	    function _getCheckList() {
	        if ($state.current.name != "app.sethomework.sethwlog") return;
	        $scope.vm.pageindex = $scope.vm.pageindex + 1;
	        var params = {
	            page: $scope.vm.pageindex,
	            type: 2,
	            num: $scope.vm.pagesize
	        }
	        if ($scope.vm.allpage != 0 && $scope.vm.pageindex > $scope.vm.allpage) {
	            $scope.vm.pageindex = $scope.vm.allpage;
	            return;
	        }
	        setHomeWorkSrv.getCheckList(params, '').then(function (result) {
	            if (result.status === 200) {

	                if (!$scope.vm.pigailist) {
	                    $scope.vm.pigailist = [];
	                }
	                angular.forEach(result.data[0].pigailist, function (dp, index) {
	                    $scope.vm.pigailist.push(dp);
	                })

	                //$scope.vm.classidlist = result.data[0].classidlist;
	                //if ($scope.vm.allpage == 0) {
	                //    $scope.vm.allpage = result.data[0].allpage;
	                //}
	                //if (!$scope.vm.hwlogItems) {
	                //    $scope.vm.hwlogItems = [];
	                //}
	                //angular.forEach(result.data[0].pigailist, function (dp, index) {
	                //    $scope.vm.hwlogItems.push(dp);
	                //})
	                //$scope.hwloglistOptions.allpage = result.data[0].allpage;
	                //$scope.vm.hwlogItems = result.data[0].pigailist;
	            }
	        });
	    }

        //取消布置
	    function _deleteHwDialog(home) {
	        $scope.vm.homework = home;
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
	        setHomeWorkSrv.deleteHomeWork(params, '').then(function (result) {
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
	        setHomeWorkSrv.updateSubendTime(params, '').then(function (result) {
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


	}])
});