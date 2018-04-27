define(['require', 'angular', 'analyze/analyze.service', 'directives/com-directives'], function (require, ng) {
	var module = ng.module('app.analyze');
	module.controller('PrintCtrl', ['$scope', '$state', 'analyzeSrv', '$sce', '$rootScope', 'toastr', function ($scope, $state, analyzeSrv, $sce, $rootScope, toastr) {
	    //$scope.title = '学情分析';

	    $scope.vm = {
	        //classid: $state.params.classid,
	        //charpterid: $state.params.charpterid,
	        pageindex: 1,
	        pagesize: 10,
	        tabindex: 0,
	        allchecked: false,
	        currentclassid: 0,
	        gradename: "",
	        classname: "",
	    }

	    $scope.toHtml = _toHtml;
	    $scope.selectWrong = _selectWrong;
	    $scope.openBox = _openBox;
	    $scope.openStudent = _openStudent;
	    //$scope.clearBox = _clearBox;
	    $scope.getCharpters = _getCharpters;
	    $scope.allChecked = _allChecked;
	    $scope.selectStudents = _selectStudents;
	    $scope.checkStudent = _checkStudent;
	    $scope.selectTab = _selectTab;
	    $scope.selectClass = _selectClass;
	    $scope.multiStudent = _multiStudent;
	    $scope.getClassCharpterIdUserList = _getClassCharpterIdUserList;
	    $scope.checkStudentWrong = _checkStudentWrong;
	    $scope.downloadStudentWrong = _downloadStudentWrong;
	    $scope.downloadClassWrong = _downloadClassWrong;
	    $scope.print = _print;

	    initialize();
	    function initialize() {
	        _getTeacherClasslist();
	    }

	    $scope.gxlistOptions = {
	        goNextpage: _goNextpageGX,
	        allpage: 0
	    }

	    $scope.gplistOptions = {
	        goNextpage: _goNextpageGP,
	        allpage: 0
	    }

	    function _goNextpageGX(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getClassUserAllWrongList();
	        //alert(pageindex);
	    }

	    function _goNextpageGP(pageindex) {
	        $scope.vm.pageindex = pageindex;
	        _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();
	        //alert(pageindex);
	    }

	    function _toHtml(html) {
	        return $sce.trustAsHtml(html);
	    }


	    function _selectClass(classinfo) {
	        //$scope.vm.pigailist = null;
	        $scope.vm.pageindex = 1;
	        //$scope.vm.allpage = 0;
	        $scope.vm.allchecked = false;
	        $scope.vm.boxstatus = false;
	        $scope.vm.currentclassid = classinfo.classid;
	        $scope.vm.gradename = classinfo.gradename;
	        $scope.vm.classname = classinfo.classname;
	        _getTeacherClasslist();

	        if ($scope.charpterwron&&$scope.charpterwrong.wrongdata && $scope.charpterwrong.wrongdata.length > 0) {
	            $scope.charpterwrong.wrongdata = [];
	            $scope.charpterwrong = [];
	            $scope.gplistOptions.allpage = 0;
	        }
	        $('title').html(classinfo.gradename + classinfo.classname);
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
	                    $scope.vm.gradename = result.data[0].gradename;
	                    $scope.vm.classname = result.data[0].classname;
	                    _getTeacherClassCharpterList();

	                    if ($scope.stucharpterwrong)
	                    {
	                        $scope.stucharpterwrong.wrongdata = []
	                    }
	                    if ($scope.vm.selectedArray)
	                    {
	                        $scope.vm.selectedArray = []
	                    }
	                    if ($scope.vm.charpterwrong)
	                    {
	                        $scope.vm.charpterwrong = []
	                    }

	                    $('title').html($scope.vm.classlist[0].gradename + $scope.vm.classlist[0].classname);
                       

	                } else {
	                    $scope.vm.classlist = [];
	                    $scope.vm.classInfoItems = [];
	                }
	            }
	        });


	    }


	    function _selectTab(tabIndex) {
	        $scope.vm.tabindex = tabIndex;
	        $scope.vm.boxstatus = false;
	        $scope.vm.allchecked = false;
	        $scope.vm.boxstatus = false;
	        //switch (tabIndex) {
	        //    case 0:
	        //        _getTeacherClassCharpterList();
	        //        break;
	        //    case 1:
	        //        _getTeacherClassCharpterList();
	        //        break;
	        //    default:
	        //        break;
	        //}
	        _getTeacherClasslist();
	    }


	    //教师所教班级作业相关章列表 
	    function _getTeacherClassCharpterList() {
	        var params = {
	            classid: parseInt($scope.vm.currentclassid)

	        };
	        analyzeSrv.getTeacherClassCharpterList(params, '').then(function (result) {
	            if (result.status === 200) {

	                $scope.vm.charpterlist = result.data[0].charpterlist;

	                //angular.forEach($scope.vm.charpterlist, function (obj, index) {
	                //    if ($scope.vm.charpterid == obj.charpterid) {
	                //        $scope.vm.charptermodel = obj;
	                //    }
	                //});

	                $scope.vm.charptermodel = $scope.vm.charpterlist[0];

	                //_allChecked();
	                //_getClassCharpterIdUserList();

	                //if ($scope.vm.upidlist && $scope.vm.upidlist.length > 0) {
	                //    $scope.vm.upidlist[0].checked = true;
	                //    $scope.vm.multiStudentArray = [$scope.vm.upidlist[0]];
	                //    _selectStudents();
	                //    $scope.vm.selectedArray = [$scope.vm.upidlist[0]];
	                //    $scope.vm.currentstudent=[$scope.vm.upidlist[0]];
	                //    _checkStudentWrong($scope.vm.upidlist[0])
	                //}

	                //_getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();

	            }
	        });
	    }

	    //获取班级学情分析章节对应高频错题的列表
	    function _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList() {
	        var arry = new Array();
	        angular.forEach($scope.vm.charpterArray, function (obj, index) {
	            arry.push(obj.charpterid);
	        });
	        var params = {
	            classid: $scope.vm.currentclassid,
	            charpterlist: arry,
	            page: $scope.vm.pageindex,
	            num: $scope.vm.pagesize

	        };
	        analyzeSrv.getHomeWorkClassAnalsysCharpterIdUsuallyWrongList(params, '').then(function (result) {
	            if (result.status === 200) {
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
	        if ($scope.vm.charpterArray.length > 0) {

	            _getHomeWorkClassAnalsysCharpterIdUsuallyWrongList();
	            $scope.vm.boxstatus = false;
	        } else {
	            toastr.warning('请选择章节', '');
	        }
	    }

	    function _toHtml(html) {
	        return $sce.trustAsHtml(html);
	    }


	    //打开弹出层列表
	    function _openBox($event) {
	        $scope.vm.boxstatus = !$scope.vm.boxstatus;
	        //$('.choose-class').fadeIn('fast');

	        $event.stopPropagation();
	    }
	    function _openStudent($event) {
	        if ($scope.vm.upidlist && $scope.vm.upidlist.length > 0) {
	            $scope.vm.boxsttudent = !$scope.vm.boxsttudent;
	            //$('.choose-class').fadeIn('fast');

	            $event.stopPropagation();
	        }
	    }

	    //关闭弹出层列表
	    var tid;
	    function _clearBox() {
	        tid = setTimeout(function () {
	            $scope.vm.boxstatus = false;
	        }, 125);

	    }

	    $scope.vm.charpterArray = [];
	    function _getCharpters(charpter, checked) {

	        if ($scope.vm.charpterArray.length > 0) {
	            if (checked) {
	                $scope.vm.charpterArray.push(charpter);


	            } else {
	                angular.forEach($scope.vm.charpterArray, function (obj, index) {
	                    if (charpter.charpterid === obj.charpterid) {
	                        $scope.vm.charpterArray.splice(index, 1);
	                        return;
	                    }
	                });

	            }

	        } else {

	            $scope.vm.charpterArray.push(charpter)
	        }
	        charpter.checked = checked;

	        //console.log($scope.vm.charpterArray.length)
	    }

	    //全选
	    function _allChecked() {

	        $scope.vm.allchecked = !$scope.vm.allchecked;
	        angular.forEach($scope.vm.charpterlist, function (obj, index) {

	            obj.checked = $scope.vm.allchecked;

	        });

	        if ($scope.vm.allchecked) {
	            $scope.vm.charpterArray = [];
	            angular.forEach($scope.vm.charpterlist, function (obj, index) {

	                $scope.vm.charpterArray.push(obj);

	            });
	        } else {
	            $scope.vm.charpterArray = [];
	        }

	    }

	    //获取班级个性化错题选择章节获取学生列表
        function _getClassCharpterIdUserList() {
	        if ($scope.vm.charpterArray.length > 0) {
	            var arry = new Array();
	            angular.forEach($scope.vm.charpterArray, function (obj, index) {
	                arry.push(obj.charpterid);
	            });
	            var params = {
	                classid: $scope.vm.currentclassid,
	                charpterlist: arry

	            };
	            analyzeSrv.getClassCharpterIdUserList(params, '').then(function (result) {
	                if (result.status === 200) {
	                    $scope.vm.upidlist = result.data[0].upidlist;
	                    $scope.vm.boxstatus = false;
	                }
	            });

	        } else {
	            toastr.warning('请选择章节', '');
	        }
	    }

	    //获取班级学生个性化错题列表
        function _getClassUserAllWrongList() {
	        if ($scope.vm.charpterArray.length > 0) {
	            if ($scope.vm.currentstudent.length > 0) {
	                var charpters = new Array();
	                angular.forEach($scope.vm.charpterArray, function (obj, index) {
	                    charpters.push(obj.charpterid);
	                });

	                var students = new Array();
	                angular.forEach($scope.vm.currentstudent, function (obj, index) {
	                    students.push(obj.upid);
	                });
	                var params = {
	                    classid: $scope.vm.currentclassid,
	                    charpterlist: charpters,
	                    upidlist: students,
	                    page: $scope.vm.pageindex,
	                    num: $scope.vm.pagesize

	                };
	                analyzeSrv.getClassUserAllWrongList(params, '').then(function (result) {
	                    if (result.status === 200) {
	                        //$scope.vm.studentquestionlist = result.data[0].questionlist;
	                        $scope.stucharpterwrong = result.data[0];
	                        $scope.stucharpterwrong.wrongdata = [];
	                        $scope.gxlistOptions.allpage = result.data[0].allpage;

	                        var charpters = [];
	                        angular.forEach(result.data[0].questionlist, function (o, i) {
	                            //var temp = { charpterid: o.charpterid, charptername: '' };
	                            if (charpters.indexOf(o.charpterid) == -1) {
	                                charpters.push(o.charpterid);
	                            }
	                        });

	                        //allpages = result.data[0].allpage;
	                        angular.forEach(charpters, function (ch, index) {
	                            var obj = {
	                                charpterid: ch,
	                                wronglist: []
	                            }
	                            angular.forEach(result.data[0].questionlist, function (cq, index) {
	                                if (obj.charpterid == cq.charpterid) {
	                                    var wrong = {
	                                        timuxushu: cq.timuxushu,
	                                        xuanxiang: cq.xuanxiang
	                                    }
	                                    obj.charptername = cq.charptername;

	                                    obj.wronglist.push(wrong);
	                                }
	                            })
	                            $scope.stucharpterwrong.wrongdata.push(obj)
	                        });
	                    }
	                });
	            } else {
	                toastr.warning('请选择学生', '');
	            }

	        } else {
	            toastr.warning('请选择章节', '');
	        }
	    }

	    $scope.vm.studentArray = [];
	    //选择高频错题学生
	    function _checkStudent(user) {
	        if ($scope.vm.studentArray.length > 0) {
	            if (user.checked) {
	                angular.forEach($scope.vm.studentArray, function (obj, index) {
	                    if (user.upid === obj.upid) {
	                        $scope.vm.studentArray.splice(index, 1);
	                        return;
	                    }
	                });


	            } else {
	                $scope.vm.studentArray.push(user);

	            }

	        } else {

	            $scope.vm.studentArray.push(user)
	        }
	        user.checked = !user.checked;
	    }

	    $scope.vm.multiStudentArray = [];
	    //个性化错题选择学生列表中的学生
	    function _multiStudent(student) {
	        if ($scope.vm.multiStudentArray.length > 0) {
	            if (student.checked) {
	                angular.forEach($scope.vm.multiStudentArray, function (s, index) {
	                    if (s == student) {
	                        $scope.vm.multiStudentArray.splice(index, 1);
	                        return;
	                    }
	                });
	                student.checked = !student.checked;
	            }
	            else {
	                $scope.vm.multiStudentArray.push(student);
	                student.checked = true;
	            }
	        }
	        else {
	            $scope.vm.multiStudentArray.push(student);
	            student.checked = !student.checked;
	        }
	    }

	    $scope.vm.selectedArray = [];
	    //选取学生
	    function _selectStudents() {
	        var arry = new Array();
	        angular.forEach($scope.vm.multiStudentArray, function (o, i) {
	            if (o.checked) {
	                o.checked = false;
	                arry.push(o);
	            }
	        });
	        $scope.vm.selectedArray = arry;
	        $scope.vm.boxsttudent = false;

	        //默认第一个学生
	        if(arry.length>0){
	            _checkStudentWrong(arry[0]);
	        }

	    }

	    $scope.vm.currentstudent = [];
	    //选择单个学生
	    function _checkStudentWrong(student) {
	        angular.forEach($scope.vm.selectedArray, function (vs,index) {
	            if (student.upid != vs.upid) {
	                vs.pchecked = false;
	            }
	            student.pchecked = true;
	        })
	        if (student.pchecked) {
	            $scope.vm.currentstudent = [];
	            $scope.vm.currentstudent.push(student);
	            _getClassUserAllWrongList();
	        } else {
	            $scope.stucharpterwrong.wrongdata = [];
	        }
	        //student.pchecked = !student.pchecked;
	    }

	    function _downloadStudentWrong() {
	        if ($scope.vm.charpterArray.length > 0) {
	            if ($scope.vm.currentstudent.length > 0) {
	                var charpters = new Array();
	                angular.forEach($scope.vm.charpterArray, function (obj, index) {
	                    charpters.push(obj.charpterid);
	                });
	                var students = new Array();
	                angular.forEach($scope.vm.currentstudent, function (obj, index) {
	                    students.push(obj.upid);
	                });
	                window.open("/webapi/downloadstu?classid=" + $scope.vm.currentclassid + "&chapterlist=" + charpters + "&upidlist=" + students);
	            }
	            else {
	                toastr.warning('请选择学生', '');
	            }

	        } else {
	            toastr.warning('请选择章节', '');
	        }
	    }

	    function _downloadClassWrong() {
	        if ($scope.vm.charpterArray.length > 0) {
	            var charpters = new Array();
	            angular.forEach($scope.vm.charpterArray, function (obj, index) {
	                charpters.push(obj.charpterid);
	            });
	            window.open("/webapi/downloadclass?classid=" + $scope.vm.currentclassid + "&gn=" + $scope.vm.gradename + "&cn=" + $scope.vm.classname + "&chapterlist=" + charpters);
	        }else {
	            toastr.warning('请选择章节', '');
	        }
	    }

	    function _print(id) {

	        switch (id) {
	            case 'gxprint':
	                if ($scope.stucharpterwrong.wrongdata && $scope.stucharpterwrong.wrongdata.length > 0) { } else { return false;}
	                break;
	            case 'gpprint':
	                if ($scope.charpterwrong.wrongdata && $scope.charpterwrong.wrongdata.length > 0) { } else { return false; }
	                break;
	            default:
	                break;
	        }

	        $('#' + id).jqprint();
	    }

	}]);
});