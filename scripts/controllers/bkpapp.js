var app = angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngSanitize'

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
app.run(['$route', '$location', '$rootScope', function ($route, $location, $rootScope) {
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

  //headers http  
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

//custom player for audioquery
app.directive ('assPlayer', function(){

    return {
    restrict: 'E',
    transclude: true,
    scope: {audiodata: '=audiodata'},    
    templateUrl: 'parts/ass-player.html',
    link: function ($scope) {
    var req = {
        method: 'GET',
        url: 'http://www.freesound.org/apiv2/sounds/' + $scope.audiodata.id + '/?fields=id,name,previews,images,duration' + '&token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    };

    console.log($scope.audiodata);
    $.ajax(req).
      then(function(response) {
        // when the response is available

      $scope.$apply(function () {
          $scope.freesound = response;
                  console.log($scope.freesound);
                  $scope.soundsrc = $scope.freesound.previews['preview-hq-mp3'];
                      
      });

    //console.log($scope.audiodata);

        //confere se o som é novo ou existente

    // var itemid = $scope.freesound.id; 
    // var itemsrc = $scope.freesound.previews['preview-hq-mp3'];
    //   //create audio element  
    //   var sound      = document.createElement('audio');
    //   sound.crossOrigin = "anonymous";
    //   sound.id       = 'aud' + itemid;
    //   sound.controls = 'controls';
    //   //sound.loop = 'loop';
    //   sound.src      = itemsrc;
    //   sound.type     = 'audio/mpeg';
    //   //put element on playlist
    //   var container = '#sound' + itemid
    //   $(container).prepend(sound);
      
    //   sound.play();


//binding new objects to audio context


//var source = audioCtx.createMediaElementSource(sound);
//source.connect(gainNode);
//gainNode.connect(audioCtx.destination)

      



      }, function(response) {
        // error.
        
        //ok
      }, function(response) {
        // error.

      });



},

    }
});

app.directive('audiosource', function(){

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

app.filter("trustUrl", ['$sce', function ($sce) {
return function (recordingUrl) {
return $sce.trustAsResourceUrl(recordingUrl);
};
}]);


function findinarray(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] == valuetosearch) {
    return i;
    }
    }
    return null;
    }

