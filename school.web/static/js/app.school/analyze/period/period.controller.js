define(['require', 'angular', 'analyze/analyze.service', 'directives/com-directives'], function (require, ng) {
	var module = ng.module('app.analyze');
	module.controller('PeriodCtrl', ['$scope', '$state', 'analyzeSrv', '$rootScope', 'toastr', function ($scope, $state, analyzeSrv, $rootScope, toastr) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        pageindex: 0,
	        pagesize: 10,
            allpage:0,
	        tabindex: 0,
	        currentclassid: 0
	        //classlist: []

	    }
	    $scope.kslistOptions = {
	        goNextpage: _goNextpage,
	        allpage: 0
	    }
	    $scope.selectClass = _selectClass;
	    $scope.loadMore = _loadMore;
	    $scope.goToDetail = _goToDetail;
	    $scope.goToStatistics = _goToStatistics;
	    $scope.pageOptions = {
	        scrollLoaddata: _getXueQingFenZuoYeIndexPage
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

	        _getTeacherClasslist();
	    }
	    function _goNextpage(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getXueQingFenZuoYeIndexPage();
	        //alert(pageindex);
	    }
	    function _selectClass(classinfo) {
	        $scope.vm.pigailist = null;
	        $scope.vm.pageindex = 0;
	        $scope.vm.allpage = 0;
	        $scope.vm.currentclassid = classinfo.classid;
	        _getTeacherClasslist();
	        //_getXueQingFenZuoYeIndexPage();
	    }


	    //获取班级列表
	    function _getTeacherClasslist() {
	        var params = {
	            classid: $scope.vm.currentclassid
	        }
	        analyzeSrv.getTeacherClasslist(params, '').then(function (result) {
	            if (result.status === 200) {
	                if (result.data.length > 0) {
	                    $scope.vm.classInfoItems = result.data[0];
	                    if (!$scope.vm.classlist || $scope.vm.classlist.length==0) {
	                        $scope.vm.classlist = result.data[0].classlist;
	                    }

	                    $scope.vm.currentclassid = result.data[0].classid;
	                    _getXueQingFenZuoYeIndexPage();

	                } else {
	                    $scope.vm.classlist = [];
	                    $scope.vm.classInfoItems = [];
	                }
	            }
	        });


	    }

	    //获取班级学情分析
	    function _getXueQingFenZuoYeIndexPage() {
	        $scope.vm.pageindex = $scope.vm.pageindex + 1;
	        var params = {
	            page: $scope.vm.pageindex,
	            num: $scope.vm.pagesize,
	            classid: $scope.vm.currentclassid
	        }
	        if ($scope.vm.allpage != 0 && $scope.vm.pageindex > $scope.vm.allpage) {
	            $scope.vm.pageindex = $scope.vm.allpage;
	            return;
	        }
	        analyzeSrv.getXueQingFenZuoYeIndexPage(params, '').then(function (result) {
	            if (result.status === 200) {
	                //$scope.vm.allpage = result.data[0].allpage;
	                //$scope.vm.pigailist = result.data[0].pigailist;
	                if ($scope.vm.allpage == 0) {
	                    $scope.vm.allpage = result.data[0].allpage;
	                }
	                //$scope.vm.classidlist = result.data[0].classidlist;
	                if (!$scope.vm.pigailist) {
	                    $scope.vm.pigailist = [];
	                }
	                angular.forEach(result.data[0].pigailist, function (dp, index) {
	                    $scope.vm.pigailist.push(dp);
	                })
	            }
	        });
	    }

	    //
	    function _loadMore() {

	    }

	    //跳转详情
	    function _goToDetail(hw) {
	        $scope.vm.currenthw = hw;
	        $state.go('app.analyze.period.detail', { tchwlogid: hw.tchwlogid });
	    }

	    //设置提交截止时间 
	    function _updateSubendTime(time) {
	        var params = {
	            tchwlogid: $scope.vm.currenthw.tchwlogid,
	            time: "\/Date(" + (new Date(time.replace(/-/g, "/"))).getTime() + ")\/"

	        };
	        analyzeSrv.updateSubendTime(params, '').then(function (result) {
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

	        $state.go('app.sethomework.statistics', { tchwlogid: home.tchwlogid });
	    }



	}]);
    //detail
	module.controller("PerioddetailCtrl", ['$scope', '$state', '$timeout', 'analyzeSrv', 'ngDialog', 'toastr', '$rootScope', function ($scope, $state, $timeout, analyzeSrv, ngDialog, toastr, $rootScope) {

	    $scope.vm = {
	        tchwlogid: $state.params.tchwlogid,
	        allchecked: false,
	        ischecked: false,
	        studentlist: []
	    }

	    $scope.goToKnown = _goToKnown;
	    $scope.goToStudent = _goToStudent;
	    $scope.goToWrong = _goToWrong;

	    $scope.echartOptions = {
	        loadData: loadData
	    }

	    $scope.allChecked = _allChecked;
	    $scope.promptedRedoWrongQuestion = _promptedRedoWrongQuestion;
	    $scope.promptedRedoDialog = _promptedRedoDialog;
	    $scope.selectStudent = _selectStudent;
	    $scope.prevHomeWork = _prevHomeWork;
	    $scope.nextHomeWork = _nextHomeWork;
	    $scope.convertRate = _convertRate;


	    function initialize() {

	        _xueQingFenXi();
	    }

	    //获取学情分析作业
	    function _xueQingFenXi() {
	        var params = {
	            tchwlogid: $scope.vm.tchwlogid
	        }
	        analyzeSrv.xueQingFenXi(params, '').then(function (result) {
	            if (result.status === 200) {
	                $scope.vm.hwInfoItems = result.data[0];
	                $rootScope.hwInfo = result.data[0];
	                $scope.vm.allpage = result.data[0].allpage;

	                var xdata = new Array();
	                var ydata = new Array();
	                angular.forEach($scope.vm.hwInfoItems.tilist, function (o, index) {
	                    xdata.push(o.qnum);
	                    ydata.push((parseInt(o.wrongnum) + parseInt(o.bandui)) / parseInt(o.answernum) * 100);
	                });

	                setLinecharts($scope.vm.ec, xdata, ydata);
	            }
	        });


	    }


	    function _goToKnown(known) {
	        $rootScope.known = known;
	        $state.go('app.analyze.period.known', { zsdid: known.zsdid, tchwlogid: $scope.vm.tchwlogid, tgl: known.tgl });
	    }

	    function _goToStudent() {
	        $rootScope.hwinfo = $scope.vm.hwInfoItems;
	        $state.go('app.analyze.period.student', { tchwlogid: $scope.vm.tchwlogid });
	    }

	    function _goToWrong(wrong) {
	        $rootScope.wronginfo = wrong;
	        $state.go('app.analyze.period.wrong', { upid: wrong.upid,tchwlogid:$scope.vm.tchwlogid });
	    }

	    function loadData(ec) {
	        $scope.vm.ec = ec;
	        //console.log(ec);
	        initialize();

	    }

	    function setLinecharts(ec, xdata, ydata) {
	        option = {
	            //title: {
	            //    text: '某地区蒸发量和降水量',
	            //    subtext: '纯属虚构'
	            //},
	            tooltip: {
	                trigger: 'axis',
	                textStyle: {
	                    decoration: 'none',
	                    fontFamily: 'Verdana, sans-serif',
	                    fontSize: 15
	                },
	                formatter: function (params) {
	                    var ti = $scope.vm.hwInfoItems.tilist[params[0].dataIndex];
	                    return "答对人数：" + ti.rightanswernum + "<br/>答错人数：" + ti.wrongnum + "<br/>半对人数：" + ti.bandui + '<br />错误率：' + (((parseInt(ti.wrongnum)+parseInt(ti.bandui)) / (parseInt(ti.rightanswernum) + parseInt(ti.wrongnum) + parseInt(ti.bandui))) * 100).toFixed(0) + '%';
	                }
	            },
	            //legend: {
	            //    data: ['蒸发量', '降水量']
	            //},
	            toolbox: {
	                //show: true,
	                feature: {
	                    mark: { show: true },
	                    dataView: { show: true, readOnly: false },
	                    magicType: { show: true, type: ['line', 'bar'] },
	                    restore: { show: true },
	                    saveAsImage: { show: true }
	                }
	            },
	            calculable: true,
	            xAxis: [
                    {
                        type: 'category',
                        data: xdata
                    }
	            ],
	            yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }
	            ],
	            series: [
                    {
                        name: '答对人数',
                        type: 'bar',
                        data: ydata
                        //markPoint: {
                        //    data: [
                        //        { type: 'max', name: '最大值' },
                        //        { type: 'min', name: '最小值' }
                        //    ]
                        //},
                        //markLine: {
                        //    data: [
                        //        { type: 'average', name: '平均值' }
                        //    ]
                        //}
                    }
	            ]
	        };

	        $timeout(function () {
	            var domMain = document.getElementById("hwbar");
	            //var labelfromatter = labelFromatter(option.color);
	            //var _option = huanOption(labelfromatter, option);
	            if (domMain) {
	                var myChart = ec.init(domMain);
	                myChart.setOption(option, true);

	                window.onresize = function () {
	                    myChart.resize();

	                };

	            }
	        }, 200);
	    }

	    function _allChecked() {

	        //$scope.vm.allchecked = !flag;
	        //if ($scope.vm.hwInfoItems.cuotifenxi.length > 0) {

	        //    angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (obj, index) {
	        //        obj.checked = $scope.vm.allchecked;
	        //    });


	        //}
	        $scope.vm.allchecked = !$scope.vm.allchecked;
	        angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (obj, index) {
	            if (obj.isalert != 1) {
	                obj.checked = $scope.vm.allchecked;
	            }
	            if ($scope.vm.allchecked) {
	                $scope.vm.selectnum = _getCuotifenxiLen();
	            } else {
	                $scope.vm.selectnum = 0;
	            }
	        });

	    }
        //获取错题分析长度，不包括已提醒的
	    function _getCuotifenxiLen() {
	        var len = 0;
	        angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (obj, index) {
	            if (obj.isalert != 1) {
	                len = len + 1;
	            }
	        });
	        return len;
	    }
	    //选中学生
	    function _selectStudent(cuotifenxi) {

	        cuotifenxi.checked = !cuotifenxi.checked;
	        $scope.vm.selectnum = 0;
	        //var n = 0;
	        angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (obj, index) {
	            if (obj.checked && obj.isalert != 1) {
	                $scope.vm.selectnum = $scope.vm.selectnum + 1;
	            }
	        });
	        if ($scope.vm.selectnum == _getCuotifenxiLen()) {
	            $scope.vm.allchecked = true;
	        } else {
	            $scope.vm.allchecked = false;
	        }

	        //if ($scope.vm.studentlist.length > 0) {


	        //    if (ischecked) {
	        //        $scope.vm.studentlist.push(cuotifenxi.upid);
	        //    } else {
	        //        angular.forEach($scope.vm.studentlist, function (obj, index) {
	        //            if (cuotifenxi.upid === obj.upid) {
	        //                $scope.vm.studentlist.splice(index, 1);
	        //                return;
	        //            }
	        //        });

	        //    }
	        //} else {
	        //    $scope.vm.studentlist.push(cuotifenxi.upid);
	        //}
	        //$scope.vm.ischecked = !ischecked;

	        console.log($scope.vm.studentlist.length);
	    }

	    function _promptedRedoDialog() {
	        var b = false;
	        angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (ct, index) {
	            if (ct.checked && ct.isalert != 1) {
	                b = true;
	            }

	        })
	        if (!b) {
	            toastr.warning("请选择学生", '');
	            return;
	        }
	        var nestedConfirmDialog = ngDialog.openConfirm({
	            template:
                        '<div style="padding:1em;">' +
                        '<p>是否要提示学生交重做错题</p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="promptedRedoWrongQuestion()">确定</button>' +
                        '</div>' +
                        '</div>',
	            plain: true,
	            width: 400,
	            scope: $scope,
	            className: 'ngdialog-theme-default',
	        });
	    }

	    //提示学生交重做错题
	    function _promptedRedoWrongQuestion() {
	        var params = {
	            tchwlogid: $scope.vm.tchwlogid,
	            classhourname: $scope.vm.hwInfoItems.classname,
	            studentlist: []

	        }
	        angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (ct, index) {
	            if (ct.checked) {
	                var ctobj = {
	                    upid: ct.upid
	                }
	                params.studentlist.push(ctobj);
	            }

	        });
	        analyzeSrv.promptedRedoWrongQuestion(params, '').then(function (result) {
	            if (result.status === 200) {
	                ngDialog.closeAll();
	                toastr.success('提醒成功', '');

	                angular.forEach($scope.vm.hwInfoItems.cuotifenxi, function (ct, index) {
	                    if (ct.checked) {
	                        $scope.vm.allchecked = false;
	                        $scope.vm.selectnum = 0;
	                        ct.isalert = 1;
	                    }

	                });

	            } else {
	                toastr.error(result.msg, '');
	            }
	        });
	    }


	    function _prevHomeWork() {
	        $scope.vm.pageindex--;
	        _xueQingFenXi();
	    }

	    function _nextHomeWork() {

	        $scope.vm.pageindex++;
	        _xueQingFenXi();
	    }

	    function _convertRate(newvalue) {
	        var num = new Number(newvalue);
	        return num == 0 ? 0 : num.toFixed(0);
	    }

	}])
    
	module.controller('PeriodstudentCtrl', ['$scope', '$state', 'analyzeSrv', '$rootScope', function ($scope, $state, analyzeSrv, $rootScope) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        tchwlogid: $state.params.tchwlogid

	    }

	    initialize();
	    function initialize() {

	        _xueQingFenXiSorceLevel();
	    }

	    $scope.levelConvert = _levelConvert;

	    //获取课时学情分析学生列表 
	    function _xueQingFenXiSorceLevel() {
	        var params = {
	            tchwlogid: $scope.vm.tchwlogid
	        }
	        analyzeSrv.xueQingFenXiSorceLevel(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.sorcelevel = result.data[0].sorcelevel;

	            }
	        });
	    }

	    function _levelConvert(name) {
	        var n = '';
	        switch (name) {
	            case '优秀':
	                n = '90-100分数段人数';
	                break;
	            case '良好':
	                n = '80-89分数段人数';
	                break;
	            case '一般':
	                n = '60-69分数段人数';
	                break;
	            case '不及格':
	                n = '59分数段人数';
	                break;
	            default:
	                break;
	        }
	        return n;
	    }


	}]);
	module.controller('WrongCtrl', ['$scope', '$state', 'analyzeSrv', '$rootScope', 'toastr', '$sce', function ($scope, $state, analyzeSrv, $rootScope, toastr, $sce) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        pageindex: 1,
	        pagesize: 10,
	        tchwlogid: $state.params.tchwlogid,
	        upid: $state.params.upid,
            currentindex:0
	    }

	    $scope.dianZanXueSheng = _dianZanXueSheng;
	    $scope.subPiGaiWrongTi = _subPiGaiWrongTi;
	    $scope.toHtml = _toHtml;
	    
	    initialize();
	    function initialize() {

	        _getListPiGaiWrongTi();
	    }


	    //获取待批改错题
	    function _getListPiGaiWrongTi() {
	        var params = {
	            tchwlogid:$scope.vm.tchwlogid,
	            page:$scope.vm.pageindex,
	            num: $scope.vm.pagesize,
	            upid: $scope.vm.upid
	        }
	        analyzeSrv.getListPiGaiWrongTi(params, '').then(function (result) {
	            if (result.status === 200) {
	                $scope.vm.ctzanstatus = result.data[0].ctzanstatus;
	                $scope.vm.pigaiwronglist = result.data[0].pigaiwronglist;
	                   
	            }
	        });


	    }

	    //错题教师点赞 
	    function _dianZanXueSheng() {
	        var params = {
	            upid: $scope.vm.upid
	        }
	        analyzeSrv.dianZanXueSheng(params, '').then(function (result) {
	            if (result.status === 200) {

	                toastr.success('点赞成功', '');
	                //$scope.vm.currentindex = 1;
	                $scope.vm.ctzanstatus = 1;
	            } else {
	                toastr.error(result.msg,'');
	            }
	        });


	    }

	    //提交判题
	    function _subPiGaiWrongTi(wrong,flag) {
	        var params = {
	            wtid: wrong.wtid,
	            upid: $scope.vm.upid,
	            wrongtisublogid: wrong.wrongtisublogid,
	            answerstatus: flag,
	            iscontinue: 1


	        };
	        analyzeSrv.subPiGaiWrongTi(params, '').then(function (result) {
	            if (result.status === 200) {

	                toastr.success('判题成功', '');
	                wrong.wrongtistatus = flag;
	                wrong.pigaistatus = 2;
	                
	            } else {
	                toastr.error(result.msg, '');
	            }
	        });

	    }

	    function _toHtml(html) {
	        return $sce.trustAsHtml(html.replace('"','\\"'));
	    }

	}]);
	module.controller('KnownCtrl', ['$scope', '$state', '$sce', 'analyzeSrv', function ($scope, $state, $sce, analyzeSrv) {
	    //$scope.title = '学情分析';
        
	    $scope.vm = {
	        tchwlogid: $state.params.tchwlogid,
	        zsdid: $state.params.zsdid
	    }

	    $scope.toHtml = _toHtml;
	    
	    initialize();
	    function initialize() {

	        _getHomeWorkAnalsysZsdQuestionList();
	    }


	    //获取课时学情分析知识点对应题的列表
	    function _getHomeWorkAnalsysZsdQuestionList() {
	        var params = {
	            tchwlogid: $scope.vm.tchwlogid,
	            zsdid: $scope.vm.zsdid
	        }
	        analyzeSrv.getHomeWorkAnalsysZsdQuestionList(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.questionlist = result.data[0].questionlist;

	            }
	        });
	    }

	    function _toHtml(html) {
	        return $sce.trustAsHtml(html);
	    }

	    


	}]);

});