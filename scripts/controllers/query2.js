app.controller('pagController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {

  var req = {
 method: 'GET',
 url: 'http://www.freesound.org/apiv2/search/text/?token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI&query=cars',
 headers: {
   'Content-Type': 'application/json'
 }
 
};

 $http.get(req).
      then(function() {
        // when the response is available
        console.log(oi);
        
      }, function(response) {
        // error.
        
        //ok
      }, function(response) {
        // error.
        
      });


}]);