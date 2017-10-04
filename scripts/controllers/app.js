var app = angular.module('app', [
    'ngRoute',
    'ngTouch'

]).config(function($sceProvider){
    $sceProvider.enabled(false);
    //para permitir links externos
});


function addLeadingZeros (n, length)
{
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}





//testController end  

//prevent reloading of page when changing adress
app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }

            return original.apply($location, [path]);
        };
    }])


app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    //$locationProvider.html5Mode(true);
    $routeProvider
      .
    when('/busca', {
            templateUrl: 'parts/busca.html',
            controller: 'queryController'
        }).otherwise({
        
        templateUrl: 'parts/list.html',
            controller: 'queryController'
    });
    
            //$locationProvider.html5Mode(true);

    
$httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    
  });

app.directive('ngMain', function() {
  return {
    
    templateUrl: 'parts/query.html'
    }
  
});

app.directive ('assPlayer', function(){

    return {
    restrict: 'E',
    transclude: true,
    scope: {audiodata: '=audiodata'},    
    templateUrl: 'parts/ass-player.html',
    link: function ($scope) {
        //console.log($scope.freesound);
    var req = {
        method: 'GET',
        url: 'http://www.freesound.org/apiv2/sounds/' + $scope.audiodata + '/?fields=id,name,previews,images,duration' + '&token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI',
        headers: {
        'Content-Type': 'application/json'
        }
    };

    $.ajax(req).
      then(function(response) {
        // when the response is available
        //console.log(response);

      $scope.$apply(function () {
          $scope.response = response;
          $scope.freesound = response.results;
      });
      }, function(response) {
        // error.
        
        //ok
      }, function(response) {
        // error.

      });

},

    }
});

app.directive('loadedsounds', function(){

});


app.directive('ngMain2', function() {
  return {
    templateUrl: 'parts/query.html'
  }
});



app.filter('numberFixedLen', function () {
    return function (a, b) {
        return (1e4 + a + "").slice(-b)
    }
});

app.filter('sectime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

app.filter('tostring', function() {
  return function(a) { 
    return a.toString();
  };
});

app.filter('numberStr', function () {
    return function (string) {
        parseInt(number);
    }
});

app.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);



app.filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});




function findinarray(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] == valuetosearch) {
    return i;
    }
    }
    return null;
    }

