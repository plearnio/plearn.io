var myApp = angular.module('myApp', ['ngSanitize','ngAnimate']);

myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    $scope.skip = 0;
    $scope.class = 'works';
    $scope.workShow = {
        name : 'Neural',
        skill : [ 'Crawling bot', 'MEAN Stack', 'Investment'],
        status : 'active',
        url : 'http://plearn.io/neural',
        pic : 'dummy.png',
        subPic : 'dummy.png',
        subName_th : 'แพลตฟอร์มเพื่อการเรียนรู้การลงทุนในตลาดหลักทรัพย์',
        subName_eng : 'Learning platform for invesment',
        description_th : ['Neural คือแพลตฟอร์มที่ช่วยให้นักลงทุนสามารถเริ่มต้นลงทุนได้เร็วที่สุด และเป็นเครื่องมือที่ใช้เรียนรู้แบบครบวงจร หรือพูดง่ายๆคือ สามารถใช้เครื่องมือนี้ในการเรียนรู้โดยไม่จำเป็นต้องพึ่งพาช่องทางอื่น','ในช่วงมัธยมปลาย ผมมีโอกาสได้รู้จักเรื่องการลงทุนในตลาดหลักทรัพย์จากคนใกล้ตัว มันทำให้ผมรู้สึกว่าหากสามารถใช้ความรู้ด้านคอมพิวเตอร์ซึ่งเป็นสิ่งที่ชอบมาช่วยเสริม จะทำให้การลงทุนเป็นเรื่องง่ายยิ่งขึ้น และเมื่อโตขึ้นก็เริ่มหาความรู้ที่จะใช้จนสามารถสร้างโปรแกรมที่ต้องการขึ้นมาได้ ปัจจุบัน Neural อยู่ในช่วงกำลังพัฒนา และกำลังแข่งเพื่อเข้าสู้รอบ 1 ใน 100 (รอบ 3) ของโครงการ Digital Startup (Angle in the city) ซึ่งจัดโดย SIPA อีกทั้งยังเป็นโปรเจคที่อยู่ใน Hatch โครงการบ่มเพาะของทางมหาวิทยาลัย', 'ภาษาหลักๆที่ใช้คือ Javascript (Mean Stack) โดยเก็บข้อมูลจาก setsmart.com ผ่าน npm cheerio กับ Nodejs และนำมาเก็บเข้าฐานข้อมูล MongoDB และนำมาแสดงผลบนหน้าเว็บในรูปแบบต่างๆ'],
        description_eng : ' - ',
        year : 2016,

    };
    refresh = function(sk){
	    $http.get('/work_list/'+sk).success(function(response){
            $scope.loading = true;
            $scope.len = response.length;
            $scope.workList = response;
            if(response.length!=4){
                $scope.skip += response.length;
                $scope.number = response.length;
            }else{
                $scope.skip += response.length-1;
                $scope.number = response.length-1;
            }
            $scope.class = 'works in-view';
            $scope.work = "";﻿
	    });
	};

    $scope.getNumber = function(num) {
        return new Array(num);   
    }

    $scope.setModal = function(id) {
        $http.get('/work/'+id).success(function(response){
            $scope.workShow = response;
        });  
    }

    $scope.commas = function commas(items) {
        if(items!= null){
            return items.join(", ");
        }else{
            return false;
        }
    }

    $scope.newline = function newline(items) {
        return items.join("<br><br>");
    }

	refresh();
    
    $scope.goBack = function(){
        $scope.class = 'works';
        if($scope.len!=4){
            $scope.skip-=(3+$scope.len);  
        }else{
            $scope.skip-=6;
        }
        refresh($scope.skip);
    }

    $scope.goNext = function(){
        $scope.class = 'works';
        refresh($scope.skip);
    }

    $scope.addContact = function(){
    	console.log($scope.contact);
    	if($scope.contact._id){
    		$scope.warning = 
    			'<div class="alert alert-warning">'+
    			'<strong>Warning!</strong> Cant add old user.'+
  				'</div>';﻿
 
    		refresh();
    	}else{
	    	$http.post('/contactlist', $scope.contact).success(function(response){
	    		console.log(response);
	    		$scope.warning = 
    			'<div class="alert alert-success">'+
    			'<strong>Success!</strong> Data added.'+
  				'</div>';﻿
	    		refresh();
	    	});
	    }
    };

    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/contactlist/'+id).success(function(response){
    		$scope.warning = 
    			'<div class="alert alert-success">'+
    			'<strong>Success!</strong> Data removed.'+
  				'</div>';﻿
    		refresh();
    	});
    }

    $scope.edit = function(id){
    	console.log(id);
    	$http.get('/contactlist/'+id).success(function(response){
    		$scope.contact = response;
    	});
    }

    $scope.update = function(){
    	if($scope.contact._id){
	    	console.log($scope.contact._id);
	    	$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
	    		$scope.warning = 
    			'<div class="alert alert-success">'+
    			'<strong>Success!</strong> Data updated.'+
  				'</div>';﻿
	    		refresh();
	    	})
	    }else{
	    	$scope.warning = 
    			'<div class="alert alert-warning">'+
    			'<strong>Warning!</strong> Cant update new user.'+
  				'</div>';﻿
 
    		refresh();
	    }
    }
}])
.directive('loading', function(){
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
            link: function (scope, element, attr) {
                  scope.$watch('loading', function (val) {
                      if (val)
                          $(element).show();
                      else
                          $(element).hide();
                  });
            }
        }
    });