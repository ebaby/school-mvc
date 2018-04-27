define(['require', 'angular', 'menumgr/menumgr.service'], function (require, ng) {
    var module = ng.module('app.menumgr');
    module.controller('MenuListCtrl', ['$scope', '$state', 'menuMgrSrv', 'toastr', 'ngDialog', function ($scope, $state, menuMgrSrv, toastr, ngDialog) {
        //$scope.title = '';

        $scope.vm = {
            pageindex: 0,
            pagesize: 10,

        }

        initialize();
        function initialize() {
            _getMenuList();
        }

        $scope.goToAddMenu = _goToAddMenu;
        $scope.getMenuList = _getMenuList;

        function _goToAddMenu(menu) {

            $state.go('app.menumgr.menu.addmenu', { mid: menu == undefined ? 0 : menu.id });
            
        }

        function _getMenuList() {
            var params = {
                pageindex: $scope.vm.pageindex,
                pagesize: $scope.vm.pagesize,

            };
            menuMgrSrv.getMenuList(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.menulist = result.data.rows;
                }
            });
        }


    }]);
    module.controller('AddMenuCtrl', ['$scope', '$state', 'menuMgrSrv', function ($scope, $state, menuMgrSrv) {
        //$scope.title = '';

        $scope.vm = {
            mid: parseInt($state.params.mid),
            //visibled:true,
            //classlist: []

        }

        initialize();
        function initialize() {
            _getParentMenus();

            if ($scope.vm.mid) {
                _getMenu();
                //$.vm.visibled = false;
            }
        }

        $scope.saveMenu = _saveMenu;


        function _getMenu() {
            var params = {
                mid: $scope.vm.mid,

            };
            menuMgrSrv.getMenu(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.menu = result.data;
                }
            });
        }
        function _getParentMenus() {
            var params = {
                
            };
            menuMgrSrv.getParentMenus(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.parentmenu = result.data;
                }
            });
        }

        function _saveMenu() {
            var params = {
                //user: {
                    id: $scope.vm.menu.mid,
                    name: $scope.vm.menu.name,
                    parentid:$scope.vm.pmenuinfo==undefined?0: $scope.vm.pmenuinfo.id,
                    orderid: $scope.vm.menu.orderid,
                    urlpath: $scope.vm.menu.urlpath,
                    //isvisible: $scope.vm.isvisible == undefined ? '' : $scope.vm.isvisible,
                    //isenabled: $scope.vm.isenabled == undefined ? '' : $scope.vm.isenabled,

                //},

            };
            menuMgrSrv.saveMenu(params).then(function (result) {
                if (result.code === 0) {

                    $state.go('app.menumgr.menu');
                }
            });
        }

    }]);


});