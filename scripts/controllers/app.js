var app = angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAudio',
    'ngSanitize',
    'angulartics',
    'angulartics.google.analytics'

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
app.directive ('assPlayer', ['$rootScope', function($rootScope){

    return {
    restrict: 'E',
    //transclude: true,
    scope: {'audiodata' : '=audiodata',
    order: '@'},    
    templateUrl: 'parts/ass-player.html',
    link: function ($scope, element, attribute) {
    var req = {
        method: 'GET',
        url: 'https://freesound.org/apiv2/sounds/' + $scope.audiodata.id + '/?fields=id,name,previews,images,duration' + '&token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    };

    //console.log($scope.audiodata);
     //console.log($scope.order);
    $.ajax(req).
      then(function(response) {
        // when the response is available

      $scope.$apply(function () {
          $scope.freesound = response;
                  console.log($scope.freesound);
                  $scope.soundsrc = $scope.freesound.previews['preview-hq-mp3'];
                  // var sound = ngAudio.load($scope.freesound.previews['preview-hq-mp3']);
                      
      });

       $scope.loop = false;
       $scope.soundvolume = 1;
    var itemid = $scope.freesound.id; 
    var itemsrc = $scope.freesound.previews['preview-hq-mp3'];
       //create audio element  
    // console.log($scope.audiodata.newsound);
    var sound      = document.createElement('audio');
    var imgid = '#img' + itemid;
    var divid = 'audio' + $scope.order;
    sound.crossOrigin = "anonymous";
    sound.id       = 'aud' + itemid;
    sound.controls = 'controls';
     //sound.loop = 'loop';
    sound.src      = itemsrc;
    sound.type     = 'audio/mpeg';
     //put element on playlist
    document.getElementById(divid).appendChild(sound);
      if ($scope.audiodata.newsound == 1) {
        sound.autoplay = 'autoplay';

       }
       
       $scope.$watch('loop', function(newValue, oldValue) {
                if (newValue)
                    console.log($scope.loop.booleanVal);
                sound.addEventListener('ended', function() {
                    if ($scope.loop.booleanVal) {
                        this.currentTime = 0;
                        this.play();
                    }

}, false);
            }, true);

       $scope.setvolume = function(val){
                  //console.log($scope.soundvolume);
                  sound.volume = val;                  
       }


$scope.removethis = function(index) {
  //$scope.$parent.sounds.splice(index, 1);
  $scope.$parent.removeitem();
}
    

    console.log($scope.loop);

    var msource = audioCtx.createMediaElementSource(sound);
    msource.connect(gainNode);
    sources.push(msource);
    
    



      }, function(response) {
        // error.
        
        //ok
      });



},

    }
}]);

app.directive('audiosource', function(){

});


app.directive('ngMain2', function() {
  return {
    templateUrl: 'parts/query.html'
  }
});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('numberFixedLen', function () {
    return function (a, b) {
        return (1e4 + a + "").slice(-b)
    }
});

app.filter('shortnum', function () {
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

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


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




