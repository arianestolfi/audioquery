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

//verifying url for pre-selected samples
    
var queryString = $location.path();

if (queryString) {
  var sounds = queryString.split("=");
  var sounds = sounds[1];
  var sounds = sounds.split(",");
  $scope.sounds = sounds;
  console.log(sounds);
} 



$scope.play = function(itemsrc, itemid) {

//verify adress
var curadress = $location.path();
if (curadress) {
  var partsadress = curadress.split("=");
  var adress = partsadress[0] + "=" + itemid + ',' + partsadress[1];
} else {
  var adress = 'sounds=' + itemid;
}

//change url
$location.path(adress, false);


//create audio element  
var sound      = document.createElement('audio');
sound.id       = 'aud' + itemid;
sound.controls = 'controls';
//sound.loop = 'loop';
sound.src      = itemsrc;
sound.type     = 'audio/mpeg';
//put element on playlist
$('#audios').prepend(sound);
sound.play();

}








}]);