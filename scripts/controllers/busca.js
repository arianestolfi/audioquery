app.controller('buscaController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {


    $http.get('scripts/services/items2.json').
        then(function (response) {
        // when the response is available

        $scope.items = response.data;
        $scope.ca_objects = [];
        for (elem in $scope.items) {
            $scope.ca_objects.push($scope.items[elem]);
        }
        $scope.numpagpar = $scope.ca_objects.length;
        //console.log($scope.ca_objects);

        /*if ($routeParams.itemId > 0) {
          $scope.prevItem = Number($routeParams.itemId)-1;
        } else {
          $scope.prevItem = $scope.artists.length-1;
        }

        if ($routeParams.itemId < $scope.artists.length-1) {
          $scope.nextItem = Number($routeParams.itemId)+1;
        } else {
          $scope.nextItem = 0;
        }   */


        //ok
    }, function (response) {
        // error.
    });

    $scope.getNumber = function (num) {
        return new Array(num);
    }
    
}]);
