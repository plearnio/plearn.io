(function(angular) {
  'use strict';
angular.module('bindHtmlExample', ['ngSanitize'])
  .controller('ExampleController', ['$scope', function($scope) {
        $scope.data = [0,1,0,1,0];
        $scope.myHTML =
       'I am an <code>HTML</code>string with ' +
       '<a href="#">links!</a> and other <em>stuff</em><div ng-repeat="item in data track by $index" ng-bind-html="item"></div>';

       $scope.add = function(){
           $scope.data.push(5);
           console.log($scope.data);
       }
  }])
  .directive('compile', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
               // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
        );
    };
}]);
})(window.angular);

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/