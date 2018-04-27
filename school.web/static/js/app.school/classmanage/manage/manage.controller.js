define(['require','angular','classmanage/classmanage.service','directives/com-directives'],function(require,ng){
	var module = ng.module('app.classmanage');
	module.controller('ManageCtrl', ['$scope', '$state', '$timeout', '$templateRequest', '$templateCache', 'classmanageSrv', 'ngDialog', 'toastr', 'toastrConfig', '$sce', function ($scope, $state, $timeout, $templateRequest, $templateCache, classmanageSrv, ngDialog, toastr, toastrConfig, $sce) {
				
	    $scope.vm = {
	        tabindex: 0,
	        currentclassid: 0,
	        picindex: 0,
	        booknum: 0,
	        classlist: [],

	        msgstatus: 0,
	        errormsg: '',
	        succmsg: '',
	        pageindex: 1,
	        pagesize: 10,

	        promote:true,

	    }
	    $scope.piclist = [
            'http://img1.yqj.cn/w/images/jsd/zy/bjtb1.jpg',
            'http://img1.yqj.cn/w/images/jsd/zy/bjtb2.jpg',
            'http://img1.yqj.cn/w/images/jsd/zy/bjtb3.jpg',
            'http://img1.yqj.cn/w/images/jsd/zy/bjtb4.jpg',
            'http://img1.yqj.cn/w/images/jsd/zy/bjtb5.jpg'
	    ];

	    $scope.numReg = /^[0-9]+$/;

	    $scope.vm.tempArray = [];
    
	    $scope.selectTab = _selectTab;
	    $scope.selectPic = _selectPic;
	    $scope.selectClass = _selectClass;
	    $scope.updateClassinfo = _updateClassinfo;
	    $scope.deleteDialog = _deleteDialog;
	    $scope.deleteClass = _deleteClass;
	    $scope.unlockDialog = _unlockDialog;
	    $scope.unlockTheclass = _unlockTheclass;
	    $scope.bookDialog = _bookDialog;
	    //$scope.unlockTheclass = _unlockTheclass;
	    $scope.searchClassBook = _searchClassBook;
	    $scope.getJCBblist = _getJCBblist;
	    $scope.addBookDialog = _addBookDialog;
	    $scope.teacherAttenDialog = _teacherAttenDialog;
	    $scope.teacherAttenStudent = _teacherAttenStudent;
	    $scope.deleteClassStudentDialog = _deleteClassStudentDialog;
	    $scope.deleteClassStudent = _deleteClassStudent;
	    $scope.selectClassBook = _selectClassBook;
	    $scope.selectSearchBook = _selectSearchBook;
	    $scope.deleteClassBookDialog = _deleteClassBookDialog;
	    $scope.deleteClassBook = _deleteClassBook;
	    $scope.cancleDeleteBook = _cancleDeleteBook;
	    $scope.goToPerson = _goToPerson;
	    $scope.goToClass = _goToClass;
	    $scope.getJCBbDialog = _getJCBbDialog;
	    $scope.selectBookInfo = _selectBookInfo;
	    $scope.keyDown = _keyDown;
	    $scope.goToJoinStudent = _goToJoinStudent;
	    $scope.upGrade = _upGrade;

	    function _selectTab(tabIndex) {
	        $scope.vm.tabindex = tabIndex;
	        switch (tabIndex) {
	            case 0:
	                _getTeacherClassStudentList();
	                break;
	            case 1:
	                _getClassInfo();
	                break;
	            case 2:
	                _getClassBooks();
	                break;
	            default:
	                break;
	        }
	    }

	    function _selectPic(picindex) {
	        $scope.vm.picindex = picindex;
	    }
	    

	    function _setClass() {

	    }

		//$scope.classlist = {

		//}
		
		initialize();
		function initialize(){
		    
		    _selectPic($scope.vm.picindex);
		    _getTeacherClasslist();
            
		}

        //获取班级列表
		function _getTeacherClasslist() {
		    var params = {
		        classid: $scope.vm.currentclassid
		    }
		    classmanageSrv.getTeacherClasslist(params, '').then(function (result) {
		        if (result.status === 200) {
		            if (result.data.length > 0) {
		                $scope.vm.classInfoItems = result.data[0];
		                if ($scope.vm.allpage == 0) {
		                    $scope.vm.allpage = result.data[0].allpage;
		                }
		                if (!$scope.vm.pigailist) {
		                    $scope.vm.pigailist = [];
		                }
		                angular.forEach(result.data[0].pigailist, function (dp, index) {
		                    $scope.vm.pigailist.push(dp);
		                })
		                if (!$scope.vm.classlist || $scope.vm.classlist.length==0) {
		                    $scope.vm.classlist = result.data[0].classlist;
		                }

		                $scope.vm.currentclassid = result.data[0].classid;
		                _getClassBooks();

		                _selectTab($scope.vm.tabindex);
		            } else {
		                $scope.vm.classInfoItems = [];
		                $scope.vm.classlist = [];
		            }
		        }
		    });


		}

        //选择班级
		function _selectClass(classinfo) {
		    $scope.vm.currentclassid = classinfo.classid;
		    _getTeacherClasslist();
		    //_selectTab($scope.vm.tabindex);
		}

        //获取班级信息
		function _getClassInfo() {
		    var params = {
		        classid: $scope.vm.currentclassid
		    }
		    classmanageSrv.getClassInfo(params, '').then(function (result) {
		        if (result.status === 200) {
		            if (result.data.length > 0) {
		                
		                $scope.vm.currentClassInfo = result.data[0];

		                var gradeid = result.data[0].gradeid;
		                var xkid = 2;
		                _getJCBblist(gradeid, xkid);
		                angular.forEach($scope.piclist, function (url,index) {
		                    if (url === $scope.vm.classInfoItems.headpic) {
		                        $scope.vm.picindex = index;
		                    }
		                });
                        //获取年级
		                _getGrades();	                

		                
		            }
		        }
		    });
		}

	    //获取教材版本
		function _getJCBblist(gradeid, xkid) {

		    var params = {
		        gradeid: gradeid,
		        xkid: xkid

		    }
		    classmanageSrv.getJCBblist(params, '').then(function (result) {
		        if (result.status === 200) {
		            if (result.data.length > 0) {
		                $scope.vm.bookItem = result.data[0].jcbblist;

		                //init bookinfo
		                angular.forEach($scope.vm.bookItem, function (b, index) {
		                    if (b.bbid == $scope.vm.currentClassInfo.bbid) {
		                        $scope.vm.bookinfo = b;
		                        
		                        return false;
		                    }
		                })
		                //$scope.vm.bookinfo = { bbid: $scope.vm.currentClassInfo.bbid, bbname: $scope.vm.currentClassInfo.bbname }

		            }
		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

        //修改班级
		function _updateClassinfo(isValid) {
		    //if ($scope.vm.gradeinfo == '' || $scope.vm.gradeinfo == undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请选择年级';
		    //    return false;
		    //} else if ($scope.vm.currentClassInfo.classname == '' || $scope.vm.currentClassInfo == undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请输入班级名称';
		    //    return false;
		    //} else if ($scope.vm.currentClassInfo.maxusercount == '' || $scope.vm.currentClassInfo == undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请输入班级人数';
		    //    return false;
		    //} else if ($scope.vm.bookinfo == undefined) {
		    //    $scope.vm.msgstatus = 1;
		    //    $scope.vm.errormsg = '请选择教材版本';
		    //    return false;
		    //}
		    //else {

		    if (isValid) {
		        $scope.vm.submitted = true;
		        var params = {
		            classid: $scope.vm.currentclassid,
		            classname: $scope.vm.currentClassInfo.classname,
		            gradeid: $scope.vm.gradeinfo.gradeid,
		            greadename: $scope.vm.gradeinfo.gradename,
		            des: $scope.vm.currentClassInfo.des,
		            bbid: $scope.vm.bookinfo.bbid,
		            bbname: $scope.vm.bookinfo.bbname,
		            maxusercount: $scope.vm.currentClassInfo.maxusercount,
		            headpic: $scope.piclist[$scope.vm.picindex],
		            allowstudentadd: 1


		        }
		        classmanageSrv.updateClassinfo(params, '').then(function (result) {
		            if (result.status === 200) {
		                toastr.success('修改成功', '');

		                //$scope.vm.msgstatus = 2;
		                //$scope.vm.succmsg = '修改成功';
		                _getTeacherClasslist();

		                angular.forEach($scope.vm.classlist, function (obj, index) {
		                    if (obj.classid == $scope.vm.currentclassid) {
		                        $scope.vm.classlist[index].classname = $scope.vm.currentClassInfo.classname;
		                        $scope.vm.classlist[index].gradename = $scope.vm.gradeinfo.gradename;
		                        return false;
		                    }
		                });
		                $scope.vm.promote = !$scope.vm.promote;

		            } else {
		                toastr.error(result.msg, '');
		            }
		        });
		    }
		    //}

		}

        //删除班级
		function _deleteDialog() {
		    var classname = $scope.vm.classInfoItems.classname;
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">' +
                        '<p>是否要删除<span style="color:#3598dc;font-size:18px;">' + $scope.vm.classInfoItems.gradename + $scope.vm.classInfoItems.classname + '</span></p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="deleteClass()">确定</button>' +
                        '</div>'+
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });
		}
		function _deleteClass() {
		    var params = {
		        classid: $scope.vm.currentclassid,

		    }
		    classmanageSrv.deleteClass(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('删除成功', '');
		            $scope.vm.classlist = [];
                    //重新读取班级列表和学生列表
		            $scope.vm.currentclassid = 0;
		            _getTeacherClasslist();
		            _selectTab($scope.vm.tabindex);
		            ngDialog.closeAll();
		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}
	    //获取班级教辅 
		function _getClassBooks() {
		    var params = {
		        classid: $scope.vm.currentclassid,
		    }
		    classmanageSrv.getClassBooks(params, '').then(function (result) {
		        if (result.status === 200) {
		            $scope.vm.bookItems = result.data[0].booklist;

		            $scope.vm.booknum = result.data[0].booklist.length;
		        }
		        
		    });
		}

		function _unlockDialog() {
		    var msg;
		    if ($scope.vm.classInfoItems.allowstudentadd == 1) {
		        msg = '是否锁定班级，锁定之后学生不允许加入';
		    } else {
		        msg = '是否解锁班级，解锁之后可以继续加入学生';
		    }
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">' +
                        '<p>' + msg + '</p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="unlockTheclass()">确定</button>' +
                        '</div>'+
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });
		}
	    //锁定/解锁班级
		function _unlockTheclass() {
		    var params = {
		        classid: $scope.vm.currentclassid,
		        type: $scope.vm.classInfoItems.allowstudentadd == 1 ? 2 : 1
		    }
		    classmanageSrv.unlockTheclass(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('修改成功', '');
		            $scope.vm.currentclassid = 0;
		            _getTeacherClasslist();
		            ngDialog.closeAll();

		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

		function _bookDialog() {
		    
		    ngDialog.open({
		        template: 'js/app.tch/classmanage/manage/bookdialog.html',
		        className: 'ngdialog-theme-default',
		        width: 800,
                height:400,
                //showClose: false,
		        scope: $scope
		    });

		    //
		    $scope.vm.xkid = '2';
		    _getGrades();
		    _getAllBooks(0,0,0);

		}

	    //获取教师所教班级学生列表
		function _getTeacherClassStudentList() {
		    var params = {
		        classid: $scope.vm.currentclassid,
		    }
		    classmanageSrv.getTeacherClassStudentlist(params, '').then(function (result) {
		        if (result.status === 200) {
		            $scope.vm.studentItems = result.data[0].studentlist;
		        }
		    });

		}

        //获取年级
		function _getGrades() {
		    var params = {

		    }
		    classmanageSrv.getGrades(params, '').then(function (result) {
		        if (result.status === 200) {
		            if (result.data.length > 0) {
		                $scope.vm.gradeItem = result.data[0].gradelist;


		                if ($scope.vm.tabindex == 1) {
		                    angular.forEach($scope.vm.gradeItem, function (obj, index) {
		                        if (obj.gradeid === $scope.vm.currentClassInfo.gradeid) {
		                            $scope.vm.gradeinfo = obj;
		                        }
		                    });
		                }
		            }
		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

		function _searchClassBook() {
		    //if ($scope.vm.gradeinfo!= null && $scope.vm.bookinfo != null) {
		        
		    _getAllBooks($scope.vm.gradeinfo==undefined?0:$scope.vm.gradeinfo.gradeid
                ,$scope.vm.bookinfo==undefined?0: $scope.vm.bookinfo.bbid
                , $scope.vm.xkid);
		    //}
		}
		function _getAllBooks(gradeid, bbid, xkid) {

		    var params = {
		        gradeid: gradeid,//$scope.vm.gradeinfo.gradeid,
		        bbid: bbid,//$scope.vm.bookinfo.bbid,
		        xkid: xkid//$scope.vm.xkid

		    }
		    classmanageSrv.getAllBooks(params, '').then(function (result) {
		        if (result.status === 200) {
		            if (result.data.length > 0) {
		                $scope.vm.searchBookItem = result.data[0].hwbidlist;
		            }
		        } else {
		            toastr.error(result.msg, '');
		        }
		    });

		}


		function _getJCBbDialog() {
		    if ($scope.vm.gradeinfo && $scope.vm.xkid) {
		        var params = {
		            gradeid: $scope.vm.gradeinfo.gradeid,
		            xkid: $scope.vm.xkid

		        }
		        classmanageSrv.getJCBblist(params, '').then(function (result) {
		            if (result.status === 200) {
		                if (result.data.length > 0) {
		                    $scope.vm.bookItem = result.data[0].jcbblist;

		                    _searchClassBook();
		                } else {
		                    $scope.vm.searchBookItem = [];
		                }
		            } else {
		                toastr.error(result.msg, '');
		            }
		        });
		    }
		    if (!$scope.vm.bookinfo) { $scope.vm.searchBookItem = []; }
		}

	    //加入班级教辅 addClassBook
		function _addBookDialog() {
		    if ($scope.vm.tempArray.length > 0) {

		        var hwbidlist = new Array();
		        angular.forEach($scope.vm.tempArray, function (book, index) {
		            hwbidlist.push(parseInt(book.hwbid));
		        });

		        var params = {
		            classid: $scope.vm.currentclassid,
		            hwbidlist: hwbidlist

		        }
		        classmanageSrv.addClassBook(params, '').then(function (result) {
		            if (result.status === 200) {
		                toastr.success('添加成功', '');

		                angular.forEach($scope.vm.tempArray, function (book, index) {
		                    $scope.vm.bookItems.push(book);
		                });
		                _getClassBooks();
		                $scope.vm.tempArray = [];
		                $scope.vm.searchBookItem = [];
		                ngDialog.closeAll();

		            } else {
		                toastr.error(result.msg, '');
		            }
		        });



		        
		        
		    } else {
		        var nestedConfirmDialog = ngDialog.openConfirm({
		            template:
                            '<div style="padding:1em;">' +
                            '<p>请选择一本教辅。</p>' +
                            '<div class="ngdialog-buttons">' +
                                '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">确定</button>' +
                            '</div>' +
                            '</div>',
		            plain: true,
		            width: 400,
		            scope: $scope,
		            className: 'ngdialog-theme-default',
		        });
		    }
		}

		function _teacherAttenDialog(student) {
		    $scope.vm.currrentstudent = student;
		    var msg;
		    if (student.isguanzhu == '0') {
		        msg = '是否关注学生';
		    } else {
		        msg = '是否取消关注学生';
		    }
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">'+
                        '<p>' + msg + '</p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="teacherAttenStudent()">确定</button>' +
                        '</div>'+
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });
		}
        //关注/取消关注学生
		function _teacherAttenStudent() {
		    var params = {
		        upid: $scope.vm.currrentstudent.upid,
		        isguanzhu: $scope.vm.currrentstudent.isguanzhu == '0' ? '1' : '0'

		    }
		    classmanageSrv.teacherAttenStudent(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('修改成功', '');
		            angular.forEach($scope.vm.studentItems, function (s,index) {
		                if (s.upid == $scope.vm.currrentstudent.upid) {
		                    s.isguanzhu = $scope.vm.currrentstudent.isguanzhu == '0' ? '1' : '0';
		                    return false;
		                }
		            });
		            ngDialog.closeAll();

		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

		function _deleteClassStudentDialog(student) {
		    $scope.vm.currrentstudent = student;
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">' +
                        '<p>是否移除该班级的学生？</p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="deleteClassStudent()">确定</button>' +
                        '</div>' +
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });
		}

	    //移除学生
		function _deleteClassStudent() {
		    var params = {
		        upid: $scope.vm.currrentstudent.upid,
		        classid: $scope.vm.currentclassid

		    }
		    classmanageSrv.deleteClassStudent(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('移除成功', '');
		            $scope.vm.currrentstudent.disable = !$scope.vm.currrentstudent.disable;
		            $scope.vm.classInfoItems.joinusercount--;
		            ngDialog.closeAll();

		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

	    //选择班级教辅
		function _selectClassBook(book, $event) {

		    $event.stopPropagation();
		    book.checked = !book.checked;
		}

		function _deleteClassBookDialog(book, $event) {
		    $event.stopPropagation();
		    $scope.vm.currrentbook = book;
		    var msg = '是否移除' + book.greadename + book.xkname + book.njjdname + book.bbname;
		    var nestedConfirmDialog = ngDialog.openConfirm({
		        template:
                        '<div style="padding:1em;">' +
                        '<p>'+msg+'</p>' +
                        '<div class="ngdialog-buttons">' +
		                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="cancleDeleteBook()">取消</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="deleteClassBook()">确定</button>' +
                        '</div>' +
                        '</div>',
		        plain: true,
		        width: 400,
		        scope: $scope,
		        className: 'ngdialog-theme-default',
		    });
		   
		}
	    //取消移除班级教辅
		function _cancleDeleteBook() {
		    ngDialog.closeAll();
		    $scope.vm.currrentbook.checked = !$scope.vm.currrentbook.checked;
		    //console.log($scope.vm.currrentbook);    
		}

	    //移除班级教辅
		function _deleteClassBook() {
		    var params = {
		        classid: $scope.vm.currentclassid,
		        hwbid: $scope.vm.currrentbook.hwbid

		    }
		    classmanageSrv.deleteClassBook(params, '').then(function (result) {
		        if (result.status === 200) {
		            toastr.success('移除成功', '');
		            _getClassBooks();
		            ngDialog.closeAll();

		        } else {
		            toastr.error(result.msg, '');
		        }
		    });
		}

	    //选择搜索教辅
		function _selectSearchBook(book) {

		    if ($scope.vm.tempArray.length > 0) {
		        if (book.checked) {
		            angular.forEach($scope.vm.tempArray, function (b,index) {
		                if (b == book)
		                {
		                    $scope.vm.tempArray.splice(index, 1);
		                    return;
		                }
		            });
		            book.checked = !book.checked;
		        }
		        else {
		            $scope.vm.tempArray.push(book);
		            book.checked = true;
		        }
		    }
		    else {
		        $scope.vm.tempArray.push(book);
		        book.checked = !book.checked;
		    }

		}

	    //跳转个人学情分析
		function _goToPerson(student) {
		    $state.go('app.analyze.person', { upid: student.upid });
		}
	    //跳转班级学情分析
		function _goToClass() {
		    $state.go('app.analyze.class', { classid: $scope.vm.currentclassid });
		}

		function _selectBookInfo() {
		    if ($scope.vm.bookinfo != null) {
		        $scope.vm.msgstatus = 0;
		    }
		}

		function _keyDown($event) {
		    $scope.vm.msgstatus = 0;
		}

	    //跳转如何加入学生页面
		function _goToJoinStudent() {
		    $state.go('http://www.yqj.cn/Teacher/bj/JoinClassWay?classid='+$scope.vm.currentclassid+'', {  });
		}
        
	    //升级班级
		function _upGrade() {
		    var date = new Date();
		    var currentMonth = date.getMonth() + 1;
		    var currentDate = date.getDate();

		    if (currentMonth == 8 && currentDate == 25) {
		        $scope.vm.promote = !$scope.vm.promote;
		    } else {

		        var nestedConfirmDialog = ngDialog.openConfirm({
		            template:
                            '<div style="padding:1em;">' +
                            '<p>升班时间为每年8月25日，现在不是升班时间，不能升级！</p>' +
                            '<div class="ngdialog-buttons">' +
                                '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">确定</button>' +
                            '</div>' +
                            '</div>',
		            plain: true,
		            width: 400,
		            scope: $scope,
		            className: 'ngdialog-theme-default',
		        });
		    }
		    
		}

	}])
});