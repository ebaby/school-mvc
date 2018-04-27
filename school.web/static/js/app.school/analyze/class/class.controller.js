define(['require', 'angular', 'analyze/analyze.service', 'directives/com-directives'], function (require, ng) {
	var module = ng.module('app.analyze');
	module.controller('ClassCtrl', ['$scope', '$state', '$timeout', 'analyzeSrv','$rootScope', function ($scope, $state, $timeout, analyzeSrv, $rootScope) {
	    //$scope.title = '学情分析';
        
	    $scope.vm = {
	        pageindex: 1,
	        pagesize: 7,
	        allpage:0,
	        currentclassid: $state.params.classid == '' ? 0 : $state.params.classid,
	        tabindex: -1,
	    }

	    $scope.selectClass = _selectClass;
	    $scope.goToStudent = _goToStudent;
	    $scope.goToPerson = _goToPerson;
	    $scope.goToKnown = _goToKnown;
	    $scope.prevHomeWork = _prevHomeWork;
	    $scope.nextHomeWork = _nextHomeWork;
	    $scope.goToHeightWrong = _goToHeightWrong;
	    $scope.checkTab = _checkTab;
	    $scope.removeHTMLTag = _removeHTMLTag;

	    $scope.echartOptions = {
	        loadData: loadData,
            id:1
	    }
	   
	    function initialize() {

	        _getTeacherClasslist();
	    }


	    function _checkTab(tabIndex,node) {
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

	    function _selectClass(classinfo, classindex) {
	        $scope.vm.classindex = classindex;
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
	                    if (!$scope.vm.classlist || $scope.vm.classlist.length == 0) {
	                        $scope.vm.classlist = result.data[0].classlist;
	                    }

	                    $scope.vm.currentclassid = result.data[0].classid;
	                    _getClassXueQingFenXi();
	                    _getClassHomeWorkList();
	                    _getTeacherClassCharpterList();
	                    $scope.vm.tabindex = -1;
	                } else {
	                    $scope.vm.classlist = [];
	                    $scope.vm.classInfoItems = [];
	                }
	            }
	        });


	    }

	    //获取班级学情分析
	    function _getClassXueQingFenXi() {
	        var params = {	            
	            classid:parseInt( $scope.vm.currentclassid)
	        }
	        analyzeSrv.getClassXueQingFenXi(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.classInfoItems = result.data[0];


	            }
	        });
	    }

	    //获取班级学情分析平均分总体趋势
	    function _getClassHomeWorkList() {
	        var params = {
	            classid: parseInt($scope.vm.currentclassid),
	            page: $scope.vm.pageindex,
	            num: $scope.vm.pagesize

	        };
	        analyzeSrv.getClassHomeWorkList(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.homeworklist = result.data[0].homeworklist;
	                $scope.vm.allpage = result.data[0].allpage;

	                var xdata = new Array();
	                var ydata = new Array();

	                $scope.vm.hwtotalcount = result.data[0].homeworklist.length;

	                angular.forEach($scope.vm.homeworklist, function (o, index) {	                    
	                        xdata.push(o.publishtime.split(' ')[0]);
	                        ydata.push(o.averagesorce);
	                });

	                if ($scope.vm.homeworklist.length < 7) {
	                    for (var i = 0; i < (7 - $scope.vm.homeworklist.length); i++) {
	                        xdata.push('');
	                        ydata.push(0);
	                    }
	                }

	                setLinecharts($scope.vm.ec, xdata, ydata);

	            }
	        });
	    }

	    function _goToStudent() {

	        $state.go('app.analyze.class.student', { classid: $scope.vm.currentclassid });
	    }

	    function _goToPerson(student) {

	        $state.go('app.analyze.person', { upid: student.upid });
	        //window.location.href = '/static/layout.html#/analyze/person/' + student.upid;
	    }

	    function loadData(ec) {
	        $scope.vm.ec = ec;
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
	                    var ti = $scope.vm.homeworklist[params[0].dataIndex];
	                    var str = "";
	                    if (!ti) {
	                        str = '暂无数据';
	                    } else {
	                        str = ti.publishtime.split(' ')[0] + "<br/>" + ti.lhname + "<br/>平均分数：" + ti.averagesorce;
	                    }
	                    return str;
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

	    function _goToKnown(charpter,known) {
	        $rootScope.known = known;
	        $state.go('app.analyze.class.known', { zsdid: known.zsdid, classid: $scope.vm.currentclassid, charpterid: charpter.charpterid });
	    }

	    function _prevHomeWork() {
	        $scope.vm.pageindex--;
	        _getClassHomeWorkList();
	    }

	    function _nextHomeWork() {

	        $scope.vm.pageindex++;
	        _getClassHomeWorkList();
	    }

	    //教师所教班级作业相关章列表 
	    function _getTeacherClassCharpterList() {
	        var params = {
	            classid: parseInt($scope.vm.currentclassid)

	        };
	        analyzeSrv.getTeacherClassCharpterList(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.charpterlist = result.data[0].charpterlist;

	            }
	        });
	    }

	    //跳转获取班级学情分析章节对应高频错题的列表
	    function _goToHeightWrong(charpter) {
	        
	        $state.go('app.analyze.class.heightwrong', { classid: $scope.vm.currentclassid, charpterid: charpter.charpterid });
	    }

        //过滤html
	    function _removeHTMLTag(str) {
	        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
	        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	        str = str.replace(/ /ig, '');//去掉 
	        return $.trim(str);
	    }



	}]);
	module.controller('ClassstudentCtrl', ['$scope', '$state', 'analyzeSrv', function ($scope, $state, analyzeSrv) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        currentclassid: $state.params.classid
	    }

	    initialize();
	    function initialize() {

	        _getClassXueQingFenXiSorceLevel();
	    }



	    //获取班级学情分析
	    function _getClassXueQingFenXiSorceLevel() {
	        var params = {
	            classid: $scope.vm.currentclassid
	        }
	        analyzeSrv.getClassXueQingFenXiSorceLevel(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.sorcelevel = result.data[0].sorcelevel;

	            }
	        });
	    }



	}]);
	module.controller('ClassknownCtrl', ['$scope', '$state', 'analyzeSrv', '$sce', function ($scope, $state, analyzeSrv, $sce) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        zsdid: $state.params.zsdid,
	        classid: $state.params.classid,
	        charpterid: $state.params.charpterid,
	    }

	    $scope.toHtml = _toHtml;

	    initialize();
	    function initialize() {

	        _getHomeWorkClassAnalsysZsdQuestionList();
	    }



	    //获取班级学情分析知识点对应题的列表
	    function _getHomeWorkClassAnalsysZsdQuestionList() {
	        var params = {
	            zsdid: $scope.vm.zsdid,
	            classid: $scope.vm.classid,
	            charpterlist: [$scope.vm.charpterid]
	        }
	        analyzeSrv.getHomeWorkClassAnalsysZsdQuestionList(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.questionlist = result.data[0].questionlist;

	            }
	        });
	    }

	    function _toHtml(html) {
	        return $sce.trustAsHtml(html);
	    }


	}]);
	module.controller('HeightWrongCtrl', ['$scope', '$state', 'analyzeSrv', '$sce', function ($scope, $state, analyzeSrv, $sce) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        classid: $state.params.classid,
	        charpterid: $state.params.charpterid,
	        pageindex: 1,
	        pagesize: 10
	        
	    }

	    $scope.toHtml = _toHtml;
	    $scope.selectWrong = _selectWrong;

	    initialize();
	    function initialize() {
	        _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();
	    }

	    $scope.gplistOptions = {
	        goNextpage: _goNextpageGP,
	        allpage: 0
	    }

	    function _goNextpageGP(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();
	        //alert(pageindex);
	    }

	    //教师所教班级作业相关章列表 
	    function _getTeacherClassCharpterList() {
	        var params = {
	            classid: parseInt($scope.vm.classid)

	        };
	        analyzeSrv.getTeacherClassCharpterList(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.charpterlist = result.data[0].charpterlist;

	                angular.forEach($scope.vm.charpterlist, function (obj,index) {
	                    if ($scope.vm.charpterid == obj.charpterid) {
	                        $scope.vm.charptermodel = obj;
	                    }
	                });

	                 _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();

	            }
	        });
	    }

	    //获取班级学情分析章节对应高频错题的列表
	    function _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList() {
	        var params = {
	            classid: $scope.vm.classid,
	            charpterlist: [ parseInt( $scope.vm.charpterid)],
	            page: $scope.vm.pageindex,
	            num: $scope.vm.pagesize

	        };
	        analyzeSrv.getHomeWorkClassAnalsysCharpterIdUsuallyWrongList(params, '').then(function (result) {
	            if (result.status === 200) {
	                //$scope.vm.questionlist = result.data[0].questionlist;
	                $scope.charpterwrong = result.data[0];
	                $scope.charpterwrong.wrongdata = [];
	                $scope.vm.boxstatus = false;
	                $scope.gplistOptions.allpage = result.data[0].allpage;

	                var charpters = [];
	                angular.forEach($scope.charpterwrong.questionlist, function (o, i) {
	                    //var temp = { charpterid: o.charpterid, charptername: '' };
	                    if (charpters.indexOf(o.charpterid) == -1) {
	                        charpters.push(o.charpterid);
	                    }
	                });


	                angular.forEach(charpters, function (ch, index) {
	                    var obj = {
	                        charpterid: ch,
	                        wronglist: []
	                    }
	                    angular.forEach(result.data[0].questionlist, function (cq, index) {
	                        if (obj.charpterid == cq.charpterid) {
	                            var wrong = {
	                                timuxushu: cq.timuxushu,
	                                wrongnum: cq.wrongnum,
	                                wrongrate: cq.wrongrate,
	                                xuanxiang: cq.xuanxiang
	                            }
	                            obj.charptername = cq.charptername;

	                            obj.wronglist.push(wrong);
	                        }
	                    })
	                    $scope.charpterwrong.wrongdata.push(obj)
	                });
	            }
	        });

	    }

	    //选择高频错题
	    function _selectWrong() {
	        $scope.vm.charpterid = $scope.vm.charptermodel.charpterid;

	        _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();
	    }


	    function _toHtml(html) {
	        return $sce.trustAsHtml(html);
	    }


	}]);
});