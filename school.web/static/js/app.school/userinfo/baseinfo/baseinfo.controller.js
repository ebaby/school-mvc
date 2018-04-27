define(['require','angular','directives/com-directives','userinfo/userinfo.service'],function(require,ng){
	var module = ng.module('app.userinfo');
	
	module.controller('BaseInfoCtrl', ['$scope','userinfoSrv','toastr','$rootScope','$timeout', function($scope,userinfoSrv,toastr,$rootScope,$timeout){
		$scope.title = '基本信息';
		$scope.base = {
		   
		}
		$scope.vm = {
		   
		}
		// $scope.teach = {
		// 	province: '',
  //   		city: '',
  //   		countryname:'',
		// 	teacheridentity:1,
		// 	address:'',

		// }
		$scope.vm={
			teachertypes:[{id:1,name:"公立教师"},{id:2,name:"培训机构教师"},{id:3,name:"个人"}],
			xdlist: [{ id: 1, name: "小学" }]
		}

		initialize();
		function initialize(){		   
			
		}
        

		//获取市
		$scope.getCity=_getCity;
		//获取区县
		$scope.getCounty=_getCounty;
		//获取学校列表
		$scope.getSchool = _getSchool;
		//保存教师基本信息
		$scope.saveBaseInfo=_saveBaseInfo;
		//保存教师任教信息
		$scope.saveTeachInfo=_saveTeachInfo;

		var rootHandle = $rootScope.$watchCollection('teacherinfo', function (newvalue, oldvalue) {
		    if (newvalue) {
		        $scope.base = $rootScope.teacherinfo;
		        $scope.vm.base = angular.copy($scope.base);
                
		        $scope.vm.base.xkinfo = $scope.base.xklist[0].xkid;

		        angular.forEach($scope.vm.teachertypes, function (o,i) {
		            if (o.id == $scope.base.teacheridentity) {
		                $scope.vm.base.identityinfo = $scope.base.teacheridentity;
		                return false;
		            }
		        });
		        _getProvince();
		        rootHandle();
		    }
		    
		})
		
		//获取省
		function _getProvince(){
			var params = {

			};

      		userinfoSrv.getProvince(params,'').then(function(result){
      		    $scope.vm.provinceItem = result.data[0].provincelist;
      		    angular.forEach($scope.vm.provinceItem, function (p, index) {
      		        if (p.province == $scope.base.province) {
      		            $scope.vm.base.proinfo = $scope.vm.provinceItem[index];
      		            _getCity();
      		            return;
      		        }
      		    })
      		   
      		    //console.log($scope.vm.provinceItem)
      		});
		}

		
		//获取市
		function _getCity(){
			//console.log($scope.vm.province);
		    if ($scope.vm.base.proinfo) {
				var params = {
				    province: $scope.vm.base.proinfo.province
				};
				userinfoSrv.getCity(params, '').then(function (result) {
				    $scope.vm.schoolItem = [];
				    $scope.vm.countyItem = [];
	      		    $scope.vm.cityItem = result.data[0].citylist;
	      		    angular.forEach($scope.vm.cityItem, function (c, index) {
	      		        if (c.city == $scope.base.city) {
	      		            $scope.vm.base.cityinfo = $scope.vm.cityItem[index];
	      		            _getCounty();
	      		            return false;
	      		        }
	      		    })
	      		});
			}else{
				$scope.vm.cityItem = [];
			}
		}

		//获取区县
		function _getCounty(){
		    if ($scope.vm.base.proinfo && $scope.vm.base.cityinfo) {
				var params = {
				    province: $scope.vm.base.proinfo.province,
				    city: $scope.vm.base.cityinfo.city
				};
				userinfoSrv.getCounty(params, '').then(function (result) {
				    $scope.vm.schoolItem = [];
	        		$scope.vm.countyItem = result.data[0].countylist;
	        		angular.forEach($scope.vm.countyItem, function (c, index) {
	        		    if (c.countyname == $scope.base.countyname) {
	        		        $scope.vm.base.countyinfo = $scope.vm.countyItem[index];
	        		        _getSchool();
	        		        return false;
	        		    }
	        		})
	      		});
	      	}else{
	      		$scope.vm.countyItem = [];
	      	}
		}

		//获取学校列表
		function _getSchool(){
		    if ($scope.vm.base.proinfo && $scope.vm.base.cityinfo && $scope.vm.base.countyinfo) {
				var params = {
				    province: $scope.vm.base.proinfo.province,
				    city: $scope.vm.base.cityinfo.city,
				    countyname: $scope.vm.base.countyinfo.countyname,
				    xdid:'1'
				};
				userinfoSrv.getSchool(params, '').then(function (result) {
				    if (result.status === 200 && result.data.length > 0) {
				        $scope.vm.schoolItem = result.data[0].school;
                        
				        angular.forEach($scope.vm.schoolItem, function (s, index) {
				            if (s.schoolid == $scope.base.schoolid) {
				                $scope.vm.base.schoolinfo = $scope.vm.schoolItem[index];
				                
				                return false;
				            }
				        })
				        
				    } else { $scope.vm.schoolItem = []; }
	      		});
	      	}else{

	      		$scope.vm.schoolItem = [];
	      	}

		}

		//保存教师基本信息
		function _saveBaseInfo(){
		    //console.log($scope.vm.base);

		    var params = {
		        turename:$scope.vm.base.turename,
		        sex:$scope.vm.base.sex,
		        email: $scope.vm.base.email
		    };
			//$rootScope.teacherinfo.headpic='http://g.hiphotos.baidu.com/imgad/pic/item/a8773912b31bb051be533b24317adab44aede043.jpg';
			//console.log($rootScope.teacherinfo);

      		userinfoSrv.saveBaseInfo(params,'').then(function(result){
        		if(result.status===200){        			
        			$rootScope.turename = $scope.vm.base.turename;
        			$rootScope.sex = $scope.vm.base.sex;
        			$rootScope.email = $scope.vm.base.email;

        			$scope.base.turename = $scope.vm.base.turename;
        			$scope.base.sex = $scope.vm.base.sex;
        			$scope.base.email = $scope.vm.base.email;

        			$scope.baseInfoVisible = !$scope.baseInfoVisible;
        			$scope.baseInfoEditVisible = !$scope.baseInfoEditVisible;

        			toastr.success('修改成功', '');
				}
        		else{
        			toastr.error(result.msg, '');

        		}
      		});

		}

		//保存教师任教信息
		function _saveTeachInfo(){

		    var params = {
		        province: $scope.vm.base.proinfo.province,
		        city: $scope.vm.base.cityinfo.city,
		        county: $scope.vm.base.countyinfo.county,
		        countyname: $scope.vm.base.countyinfo.countyname,
		        xks: [$scope.vm.base.xkinfo],
		        schoolid: $scope.vm.base.schoolinfo.schoolid,
		        schoolname: $scope.vm.base.schoolinfo.schoolname,
		        teacheridentity: $scope.vm.base.identityinfo,
		        address: $scope.vm.base.address
		    };
			
      		userinfoSrv.saveTeachInfo(params,'').then(function(result){
      		    if (result.status === 200) {
      		        //$scope.vm.base = angular.copy($scope.base);


      		        $rootScope.province = $scope.vm.base.proinfo.province;
      		        $rootScope.city = $scope.vm.base.cityinfo.city;
      		        $rootScope.county = $scope.vm.base.countyinfo.county;
      		        $rootScope.countyname = $scope.vm.base.countyinfo.countyname;
      		        //$rootScope.xks = $scope.vm.base.xklist;
      		        $rootScope.schoolid = $scope.vm.base.schoolinfo.schoolid;
      		        $rootScope.schoolname = $scope.vm.base.schoolinfo.schoolname;
        			$rootScope.teacheridentity = $scope.vm.base.identityinfo;
        			$rootScope.address = $scope.vm.base.address;

        			$scope.base.province = $scope.vm.base.proinfo.province;
        			$scope.base.city = $scope.vm.base.cityinfo.city;
        			$scope.base.county = $scope.vm.base.countyinfo.county;
        			$scope.base.countyname = $scope.vm.base.countyinfo.countyname;
        			$scope.base.xks = $scope.vm.base.xklist;
        			$scope.base.schoolid = $scope.vm.base.schoolid;
        			$scope.base.schoolname = $scope.vm.base.schoolname;
        			$scope.base.teacheridentity = $scope.vm.base.identityinfo;
        			$scope.base.address = $scope.vm.base.address;

        			$scope.teachInfoVisible = !$scope.teachInfoVisible;
        			$scope.teachInfoEditVisible = !$scope.teachInfoEditVisible;        			
        			
        			toastr.success('修改成功', '');
        		}
        		else{
        			toastr.error(result.msg, '');
        		}
        	
      		});

		}


		//隐藏显示基本信息及编辑
		$scope.baseInfoVisible = true;
		$scope.baseInfoEditVisible = true;
		$scope.baseInfoToggle = _baseInfoToggle;
		function _baseInfoToggle(){
			
			$scope.baseInfoVisible=!$scope.baseInfoVisible;
			$scope.baseInfoEditVisible = !$scope.baseInfoEditVisible;

			//if ($scope.baseInfoEditVisible === false) {
			$scope.vm.base.turename = angular.copy($scope.base.turename);
			$scope.vm.base.sex = angular.copy($scope.base.sex);
			$scope.vm.base.email = angular.copy($scope.base.email);
			//}
		
		};

		//隐藏显示任教信息及编辑
		$scope.teachInfoVisible = true;
		$scope.teachInfoEditVisible = true;
		$scope.teachInfoToggle = _teachInfoToggle;
		function _teachInfoToggle(){
			
			$scope.teachInfoVisible=!$scope.teachInfoVisible;
			$scope.teachInfoEditVisible = !$scope.teachInfoEditVisible;

			//if ($scope.teachInfoEditVisible === false) {
			$scope.vm.base.province = angular.copy($scope.base.province);
			$scope.vm.base.city = angular.copy($scope.base.city);
			$scope.vm.base.countyname = angular.copy($scope.base.countyname);
			$scope.vm.base.xkname = angular.copy($scope.base.xkname);
			$scope.vm.base.schoolname = angular.copy($scope.base.schoolname);
			$scope.vm.base.address = angular.copy($scope.base.address);
			//}
		};



	}]);
});