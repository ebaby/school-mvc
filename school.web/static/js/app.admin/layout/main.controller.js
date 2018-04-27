define(['require','angular','directives/com-directives','layout/main.service'],function(require,ng){
	var module = ng.module('app.layout');
	module.controller('MainCtrl', ['$scope', '$state', 'mainSrv', 'ngDialog', 'toastr', '$rootScope', function ($scope, $state, mainSrv, ngDialog, toastr, $rootScope) {
		$scope.vm = {
		    colorItems: ["#2FC3E1", "#3598dc", "#ff7a5a"],
		    pageindex: 0,
		    pagesize: 3,
            allpage:0,
		    homework: {}
		}

		$scope.adduser = _adduser;

		initialize();
		
		
		function initialize(){
			//_getCheckList();
		    //_checkLogin();
		}

		
	    
		function _adduser() {
		    var params = {
		        id: 4,
                name:'james'

		    };

		    //$.post('testdata/adduser',params, function (result) {
		    //    alert(result)
		    //});


		    mainSrv.addUser(params).then(function (result) {
		        alert('q:'+result);
		        //console.log(result.code)
		    });
		    
		}
		
		
	}])
});