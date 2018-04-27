define(['require', 'angular', 'usermgr/usermgr.service'], function (require, ng) {
    var module = ng.module('app.usermgr');
    module.controller('CustListCtrl', ['$scope', '$state', 'userMgrSrv', 'toastr', 'ngDialog', function ($scope, $state, userMgrSrv, toastr, ngDialog) {
        //$scope.title = '';

        $scope.vm = {
            pageindex: 0,
            pagesize: 10,

            //classlist: []

        }

        initialize();
        function initialize() {
            _getUserList();
        }

        $scope.addCustomer = _addCustomer;
        $scope.getUserList = _getUserList;

        function _addCustomer(user) {

            $state.go('app.usermgr.customer.addcust', {uid:user==undefined?0:user.id});

            //ngDialog.open({
            //    template: globalConfig.appPath + 'usermgr/customer/addcust.html',
            //    className: 'ngdialog-theme-default',
            //    width: 800,
            //    height: 500,
            //    //plain: true,
            //    scope: $scope
            //});

        }

        function _getUserList() {
            var params = {
                pageindex: $scope.vm.pageindex,
                pagesize: $scope.vm.pagesize,

            };
            userMgrSrv.getUserList(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.userlist = result.data.rows;
                }
            });
        }


    }]);
    module.controller('AddCustCtrl', ['$scope','$state', 'userMgrSrv', function ($scope,$state, userMgrSrv) {
        //$scope.title = '';

        $scope.vm = {
            uid: $state.params.uid,
            visibled:true,
            //classlist: []

        }

        initialize();
        function initialize() {
            if ($scope.vm.uid) {
                _getUser();
                $.vm.visibled = false;
            }
        }

        $scope.saveUser = _saveUser;


        function _getUser() {
            var params = {
                uid: $scope.vm.uid,

            };
            userMgrSrv.getUser(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.user = result.data;
                }
            });
        }

        function _saveUser() {
            var params = {
                //user: {
                    uid: $scope.vm.uid,
                    account:$scope.vm.account,
                    password: $scope.vm.password,
                    mobile: $scope.vm.mobile == undefined ? '' : $scope.vm.mobile,
                    email: $scope.vm.email == undefined ? '' : $scope.vm.email,
                    realname: $scope.vm.realname == undefined ? '' : $scope.vm.realname,

                //},

            };
            userMgrSrv.saveUser(params).then(function (result) {
                if (result.code === 0) {

                    $state.go('app.usermgr.customer');
                }
            });
        }

    }]);


});