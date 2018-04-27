define(['require', 'angular', 'directives/com-directives'], function (require, ng) {
	var module = ng.module('app.layout');
	module.controller('SidebarCtrl', ['$scope', '$state', function ($scope, $state) {
		$scope.vm = {
		    tabindex: 0,
		    childindex:0
		}

		
		
		$scope.selectTab = _selectTab;

		initialize();
		function initialize(){
			
					
		}


		function _selectTab(tabIndex, childIndex) {
		    if ($scope.vm.tabindex == tabIndex) {
		        $scope.vm.tabindex = tabIndex;
		        $scope.vm.childindex = childIndex;
		        if (childIndex == undefined) {
		            $scope.vm.checked = !$scope.vm.checked;
		        }
		    } else {
		        $scope.vm.tabindex = tabIndex;
		        $scope.vm.childindex = childIndex;
		        $scope.vm.checked = false;
		    }

		}
		
	}])
});