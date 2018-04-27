define(['require', 'angular', 'classmanage/classmanage.service', 'directives/com-directives', 'userinfo/userinfo.service'], function (require, ng) {
    var module = ng.module('app.classmanage');
    module.controller('CreateCtrl', ['$scope', '$state', '$timeout', '$templateRequest', '$templateCache', 'classmanageSrv', 'ngDialog', 'toastr', 'toastrConfig', 'userinfoSrv', function ($scope, $state, $timeout, $templateRequest, $templateCache, classmanageSrv, ngDialog, toastr, toastrConfig, userinfoSrv) {
        $scope.title = '创建班级';
        var openedToasts = [];
        //公用属性存放
        $scope.vm = {
            msgstatus: 0,
            errormsg: '',
            succmsg: '',
            xkid: '2',
            des:''
        }


        initialize();
        function initialize() {
            $scope.vm.classes = _createClasslist();
            //_getProvince();
            _getGrades();
        }

        //$scope.vm.xkid = '2';

        //获取市
        $scope.getCity = _getCity;
        //获取区县
        $scope.getCounty = _getCounty;
        //获取学校列表
        $scope.getSchool = _getSchool;
        //
        $scope.createClass = _createClass;
        //
        $scope.getJCBblist = _getJCBblist;
        $scope.keyDown = _keyDown;
        $scope.selectClass = _selectClass;
        //$scope.classDialog = _classDialog;
        $scope.openBox = _openBox;
        //$scope.clearBox = _clearBox;

        //获取省
        function _getProvince() {
            var params = {

            };

            userinfoSrv.getProvince(params, '').then(function (result) {
                $scope.vm.provinceItem = result.data[0].provincelist;
                angular.forEach($scope.vm.provinceItem, function (p, index) {
                    if (p.province == $scope.vm.province) {
                        $scope.vm.base.proinfo = $scope.vm.provinceItem[index];
                        _getCity();
                        return;
                    }
                })

                //console.log($scope.vm.provinceItem)
            });
        }


        //获取市
        function _getCity() {
            //console.log($scope.vm.province);
            if ($scope.vm.proinfo) {
                var params = {
                    province: $scope.vm.proinfo.province
                };
                userinfoSrv.getCity(params, '').then(function (result) {
                    $scope.vm.schoolItem = [];
                    $scope.vm.countyItem = [];
                    $scope.vm.cityItem = result.data[0].citylist;
                    angular.forEach($scope.vm.cityItem, function (c, index) {
                        if (c.city == $scope.vm.city) {
                            $scope.vm.cityinfo = $scope.vm.cityItem[index];
                            _getCounty();
                            return false;
                        }
                    })
                });
            } else {
                $scope.vm.cityItem = [];
            }
        }

        //获取区县
        function _getCounty() {
            if ($scope.vm.proinfo && $scope.vm.cityinfo) {
                var params = {
                    province: $scope.vm.proinfo.province,
                    city: $scope.vm.cityinfo.city
                };
                userinfoSrv.getCounty(params, '').then(function (result) {
                    $scope.vm.schoolItem = [];
                    $scope.vm.countyItem = result.data[0].countylist;
                    angular.forEach($scope.vm.countyItem, function (c, index) {
                        if (c.countyname == $scope.vm.countyname) {
                            $scope.vm.countyinfo = $scope.vm.countyItem[index];
                            _getSchool();
                            return false;
                        }
                    })
                });
            } else {
                $scope.vm.countyItem = [];
            }
        }

        //获取学校列表
        function _getSchool() {
            if ($scope.vm.proinfo && $scope.vm.cityinfo && $scope.vm.countyinfo) {
                var params = {
                    province: $scope.vm.proinfo.province,
                    city: $scope.vm.cityinfo.city,
                    countyname: $scope.vm.countyinfo.countyname,
                    xdid: '1'
                };
                userinfoSrv.getSchool(params, '').then(function (result) {
                    if (result.status === 200 && result.data.length > 0) {
                        $scope.vm.schoolItem = result.data[0].school;

                        angular.forEach($scope.vm.schoolItem, function (s, index) {
                            if (s.schoolid == $scope.vm.schoolid) {
                                $scope.vm.schoolinfo = $scope.vm.schoolItem[index];

                                return false;
                            }
                        })

                    } else { $scope.vm.schoolItem = []; }
                });
            } else {

                $scope.vm.schoolItem = [];
            }

        }

        //创建班级
        function _createClass(isValid) {
            $scope.vm.submitted = true;
            if (isValid) {
                var params = {
                    gradeid: $scope.vm.gradeinfo.gradeid,
                    greadename: $scope.vm.gradeinfo.gradename,
                    classname: $scope.vm.classname,
                    des: $scope.vm.des,
                    bbid: $scope.vm.bookinfo.bbid,
                    bbname: $scope.vm.bookinfo.bbname,
                    xkid: $scope.vm.xkid

                }
                classmanageSrv.createClass(params, '').then(function (result) {
                    if (result.status === 200) {
                        //toastr.success('创建成功', '');
                        $scope.vm.msgstatus = 2;
                        $scope.vm.succmsg = '创建成功';

                        _setUserGuidance();

                        $state.go('app.classmanage.manage');
                    } else {
                        //toastr.error(result.msg,'');
                        $scope.vm.msgstatus = 1;
                        $scope.vm.errormsg = result.msg;
                    }
                });
            }

        }

        function _getGrades() {
            var params = {

            }
            classmanageSrv.getGrades(params, '').then(function (result) {
                if (result.status === 200) {
                    if (result.data.length > 0) {
                        $scope.vm.gradeItem = result.data[0].gradelist;
                    }
                } else {
                    toastr.error(result.msg, '');
                }
            });
        }

        function _getJCBblist() {
            if ($scope.vm.gradeinfo != null) {
                $scope.vm.msgstatus = 0;

                var params = {
                    gradeid: $scope.vm.gradeinfo.gradeid,
                    xkid: $scope.vm.xkid

                }
                classmanageSrv.getJCBblist(params, '').then(function (result) {
                    if (result.status === 200) {
                        if (result.data.length > 0) {
                            $scope.vm.bookItem = result.data[0].jcbblist;
                        }
                    } else {
                        toastr.error(result.msg, '');
                    }
                });

            }
        }

        function _createClasslist() {
            var classes = [];
            for (var i = 0; i < 20; i++) {
                var g = {
                    name:(i+1)+'班'
                }
                classes.push(g);
            }
            return classes;
        }

        function _keyDown($event) {
            $scope.vm.msgstatus = 0;
        }

        //选择班级
        function _selectClass(name, $event) {
            //if ($scope.vm.classinfo != undefined) {
            //    $scope.vm.msgstatus = 0;
            //}
            //clearTimeout(tid);
            $scope.vm.classname = name;
            $('.choose-class').hide();
            $event.stopPropagation();
        }

        //设置指导页已经查看 -- 创建班级
        function _setUserGuidance() {
            var params = {
                userguidance: ['0601']

            }
            classmanageSrv.setUserGuidance(params, '').then(function (result) {
                if (result.status === 200) {
                    

                } else {
                    toastr.error(result.msg, '');
                }
            });
        }

        //打开弹出层列表
        function _openBox($event) {
            //$scope.vm.boxstatus = true;
            $('.choose-class').show();
            
            $event.stopPropagation();
        }

        //关闭弹出层列表
        var tid;
        function _clearBox() {
            tid = setTimeout(function () {
                $scope.vm.boxstatus = false;
            }, 125);
            
        }


        //function _classDialog() {
        //    ngDialog.open({
        //        template: 'js/app/classmanage/create/classdialog.html',
        //        className: 'ngdialog-theme-default',
        //        width: 800,
        //        height: 400,
        //        //showClose: false,
        //        scope: $scope
        //    });

        //}
        
    }])
});