app.controller('queryController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {


var query = $scope.query;


//$scope.query = 'gun';



$scope.$watch('query', function() {

  $scope.makequery('http://www.freesound.org/apiv2/search/text/?query=' + $scope.query + '&fields=id,name,previews,tags,images&page_size=50');
        
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




$scope.play = function(itemsrc) {

  //var thisaudio = "#aud" + itemid;
  //var myaudio = document.getElementById(thisaudio);
  //console.log(thisaudio);
  //myaudio.play();
var sound      = document.createElement('audio');
//sound.id       = 'aud' + itemid;
sound.controls = 'controls';
sound.src      = itemsrc;
sound.type     = 'audio/mpeg';
//document.getElementById('playlist').insertBefore(sound);
$('#playlist').prepend(sound);
sound.play();

//var audio = document.createElement("AUDIO");        // Create a <button> element
//var t = document.createTextNode("CLICK ME");       // Create a text node
//btn.appendChild(t);                                // Append the text to <button>
//document.body.appendChild(btn);

//change url
//remove element from query

//create element on playlist


}








}]);