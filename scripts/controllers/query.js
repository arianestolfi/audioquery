app.controller('queryController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {


var query = $scope.query;



$scope.query = 'gun';

var req = {
 method: 'GET',
 url: 'http://www.freesound.org/apiv2/search/text/?token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI&query=' + query + '&fields=id,name,previews,tags',
 headers: {
   'Content-Type': 'application/json'
 }
 
};

 $.ajax(req).
      then(function(response) {
        // when the response is available
        //console.log(response);
        $scope.items = response.results;
        $scope.results = [];

      $scope.$apply(function () {
          for (elem in $scope.items) {
                $scope.results.push($scope.items[elem]);
            }
        //console.log($scope.results);
        //console.log($scope.results[0].previews['preview-lq-mp3']);
        return $scope.results;        
      });
      }, function(response) {
        // error.
        
        //ok
      }, function(response) {
        // error.

      });










}]);