app.controller('pagController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {

  var req = {
 method: 'GET',
 url: 'http://www.freesound.org/apiv2/search/text/?token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI&query=water',
 headers: {
   'Content-Type': 'application/json'
 }
 
};

    
    $http.get(req).
      then(function(response) {
        // when the response is available
        
      }, function(response) {
        // error.
        
        //ok
        return $scope.ca_objects;
      }, function(response) {
        // error.
        
      });

    //número de elementos no loop    
    
        //valores padrão
    
    
    
    
        //var filteredArray = filterFilter($scope.ca_objects, {collections:'codigo01'});
    

    //var exemplar = $filter(collections:'codigo01')($scope.ca_objects);
    //$scope.exemplar = 'asa';

        //console.log($scope.ca_objects);


    
    
$scope.$watch('revista', function() {
        $scope.exemplar = $filter('filter')($scope.ca_objects, { collections:$scope.revista });
       
        if ($scope.exemplar) {
        $scope.numpagpar =  $scope.exemplar.length;
       }
   });
        
    //console.log($scope.showEvent.length);
      


    var queryString = $location.path();


    //se url tem alguma coisa

    
    if (queryString) {
        
    }
    
    
    //fim da checagem da url
    
    




    $scope.getNumber = function (num) {
        return new Array(num);
    }

    

    //checa proporção da página
    $scope.altura = $window.innerHeight;
    $scope.largura = $window.innerWidth;
    $scope.proporcao = $scope.largura / $scope.altura;
    if ($scope.proporcao > 1.5) {
        $scope.dupla = true;
    } else {
        $scope.dupla = false;
    };
    // resize diminuir 
    $(window).resize(function () {
        $scope.altura = $window.innerHeight;
        $scope.largura = $window.innerWidth;
        $scope.proporcao = $scope.largura / $scope.altura;
        if ($scope.proporcao > 1.5) {
            $scope.dupla = true;
        } else {
            $scope.dupla = false;
        };
        $scope.$apply()
    });
    






}]);