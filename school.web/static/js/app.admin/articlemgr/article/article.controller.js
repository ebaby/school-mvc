define(['require', 'angular', 'articlemgr/articlemgr.service'], function (require, ng) {
    var module = ng.module('app.articlemgr');
    module.controller('ArticleListCtrl', ['$scope', '$state', 'articleMgrSrv', 'toastr', 'ngDialog', function ($scope, $state, articleMgrSrv, toastr, ngDialog) {
        //$scope.title = '';

        $scope.vm = {
            pageindex: 0,
            pagesize: 10,

            //classlist: []

        }

        initialize();
        function initialize() {
            _getArticleList();
        }

        $scope.addArticle = _addArticle;
        $scope.getArticleList = _getArticleList;

        function _addArticle(article) {

            $state.go('app.articlemgr.article.addarticle', { aid: article == undefined ? 0 : article.id });

            //ngDialog.open({
            //    template: globalConfig.appPath + 'usermgr/customer/addcust.html',
            //    className: 'ngdialog-theme-default',
            //    width: 800,
            //    height: 500,
            //    //plain: true,
            //    scope: $scope
            //});

        }

        function _getArticleList() {
            var params = {
                pageindex: $scope.vm.pageindex,
                pagesize: $scope.vm.pagesize,

            };
            articleMgrSrv.getArticleList(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.articlelist = result.data.rows;
                }
            });
        }


    }]);
    module.controller('AddArticleCtrl', ['$scope', '$state', 'articleMgrSrv', function ($scope, $state, articleMgrSrv) {
        //$scope.title = '';

        $scope.vm = {
            aid: parseInt($state.params.aid),
            visibled: true,
            //classlist: []

        }

        initialize();
        function initialize() {
            _getParentMenus();

            if ($scope.vm.aid) {
                _getArticle();
            }
        }

        $scope.saveArticle = _saveArticle;


        function _getArticle() {
            var params = {
                aid: $scope.vm.aid,

            };
            articleMgrSrv.getArticle(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.article = result.data;
                }
            });
        }

        function _saveArticle() {
            var params = {
                //user: {
                    aid: $scope.vm.aid,
                    menuid: $scope.vm.pmenuinfo.id,
                    name: $scope.article.name,
                    content: $scope.article.content,

                //},

            };
            articleMgrSrv.saveArticle(params).then(function (result) {
                if (result.code === 0) {

                    $state.go('app.articlemgr.article');
                }
            });
        }


        function _getParentMenus() {
            var params = {

            };
            articleMgrSrv.getParentMenus(params).then(function (result) {
                if (result.code === 0) {

                    $scope.vm.parentmenu = result.data;
                }
            });
        }


    }]);


});