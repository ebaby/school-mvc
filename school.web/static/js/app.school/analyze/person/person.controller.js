define(['require', 'angular', 'analyze/analyze.service', 'directives/com-directives'], function (require, ng) {
	var module = ng.module('app.analyze');
	module.controller('PersonCtrl', ['$scope', '$state', '$timeout', 'analyzeSrv', function ($scope, $state, $timeout, analyzeSrv) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        upid: $state.params.upid,
	        pageindex: 1,
	        pagesize:7,
	        allpage:0
	    }


	    $scope.prevHomeWork = _prevHomeWork;
	    $scope.nextHomeWork = _nextHomeWork;
	    $scope.checkTab = _checkTab;
	    
	    $scope.echartOptions = {
	        loadData: loadData
	    }

	    initialize();
	    function initialize() {

	       
	        _getStusentAnalysis();
	    }

	    function _checkTab(tabIndex, node) {
	        if ($scope.vm.tabindex == tabIndex) {
	            $scope.vm.tabindex = tabIndex;
	            $scope.vm.checked = !$scope.vm.checked;
	            node.checked = !node.checked;
	        } else {
	            $scope.vm.tabindex = tabIndex;
	            $scope.vm.checked = false;
	            node.checked = true;
	        }

	    }
        
	    //获取班级学情分析
	    function _getStusentAnalysis() {
	        var params = {
	            upid: $scope.vm.upid

	        }
	        analyzeSrv.getStusentAnalysis(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.personItems = result.data[0];

	               

	            }
	        });
	    }

	    //获取个人学情分析历史作业
	    function _getStusentAnalysisHistroy() {
	        var params = {
	            upid: $scope.vm.upid,
	            page: $scope.vm.pageindex,
	            num: $scope.vm.pagesize

	        };
	        analyzeSrv.getStusentAnalysisHistroy(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.homeworkilist = result.data[0].homeworklist;
	                $scope.vm.allpage = result.data[0].allpage;

	                var xdata = new Array();
	                var ydata = new Array();
	                angular.forEach($scope.vm.homeworkilist, function (o, index) {
	                    xdata.push(o.publishtime);
	                    ydata.push(o.score);
	                });

	                setLinecharts($scope.vm.ec, xdata, ydata);

	            }
	        });
	    }

	    function loadData(ec) {
	        $scope.vm.ec = ec;
	        //console.log(ec);
	        _getStusentAnalysisHistroy();

	    }

	    function _scoreDesc(n) {
	        var name = ''
	        if (n < 60)
	        { name = '不及格'; }
	        else if (n >= 60 && n < 80) {
	            name = '一般';
	        } else if (n >= 80 && n < 90) {
	            name = '良好';
	        } else if (n >= 90 && n <= 100) {
	            name = '优秀';
	        }

	        return name;
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
	                    var ti = $scope.vm.homeworkilist[params[0].dataIndex];
	                    return ti.publishtime.split(' ')[0] + "<br/>分数：" + ti.score+'<br />' + _scoreDesc(ti.score);
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
                        type: 'value'//,
                        //axisLabel: {
                        //    formatter: '{value} %'
                        //}
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


	    function _prevHomeWork() {
	        $scope.vm.pageindex--;
	        _getStusentAnalysisHistroy();
	    }

	    function _nextHomeWork() {

	        $scope.vm.pageindex++;
	        _getStusentAnalysisHistroy();
	    }

	}]);
});