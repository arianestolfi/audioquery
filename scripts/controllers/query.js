app.controller('queryController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {


var query = $scope.query;


//$scope.query = 'gun';



$scope.$watch('query', function() {

  $scope.makequery('http://www.freesound.org/apiv2/search/text/?query=' + $scope.query + '&fields=id,name,previews,tags,images,duration&page_size=80');
        
    });

 

$scope.makequery = function(urlbase) {


var req = {
 method: 'GET',
 url: urlbase + '&token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI',
 headers: {
   'Content-Type': 'application/json'
 }
 
};

  $.ajax(req).
      then(function(response) {
        // when the response is available
        console.log(response);

      $scope.$apply(function () {
          $scope.response = response;
          $scope.results = response.results;
      });
      }, function(response) {
        // error.
        
        //ok
      }, function(response) {
        // error.

      });

}




$scope.play = function(itemsrc, itemid) {

//create audio element  


var curadress = $location.path();

var adress = curadress + ","+ itemid;

//change url
$location.path(adress, false);

var sound      = document.createElement('audio');
sound.id       = 'aud' + itemid;
sound.controls = 'controls';
//sound.loop = 'loop';
sound.src      = itemsrc;
sound.type     = 'audio/mpeg';
//put element on playlist
$('#playlist').prepend(sound);
sound.play();
//remove element from query

//create element on playlist


}








}]);