var app = angular.module('app', []);

app.controller('controller', ['$scope', function($scope) {
  $scope.hello = 'what world?';
}]);
