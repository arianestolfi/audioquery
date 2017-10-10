app.controller('queryController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {


var query = $scope.query;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new window.AudioContext();
var gainNode = audioCtx.createGain();


$scope.recordings = false;


//$scope.query = 'gun';



$scope.$watch('query', function() {
  $scope.makequery('http://www.freesound.org/apiv2/search/text/?query=' + $scope.query + '&fields=id,name,previews,tags,images,duration&page_size=80');
        
    });




$scope.singlequery = function(soundid) {


var req = {
 method: 'GET',
 url: 'http://www.freesound.org/apiv2/sounds/'+ soundid + '/?fields=id,name,previews,images,duration' + '&token=2rofapnyzy82X90HwjKw56VhDBVIUp8XMq5HWWVI',
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
          $scope.sound = response.results;
      });
      }, function(response) {
        // error.
        
        //ok
      }, function(response) {
        // error.

      });

}

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
        //console.log(response);

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

sound.crossOrigin = "anonymous";

sound.id       = 'aud' + itemid;
sound.controls = 'controls';
//sound.loop = 'loop';
sound.src      = itemsrc;
sound.type     = 'audio/mpeg';
//put element on playlist
$('#audios').prepend(sound);
sound.play();

//binding new objects to sudio context

var source = audioCtx.createMediaElementSource(sound);
source.connect(gainNode);
gainNode.connect(audioCtx.destination)

}

//recorder from thomas vassalo

$scope.startRecording = function () {
    //$('#recStatus').fadeIn();
    //var input = gainNode;
    var input = gainNode;
    //__log('Media stream created.'); input.connect(audio_context.destination); __log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    console.log('Recorder initialised.');

    recorder && recorder.record();
    var now = new Date();
  }

  $scope.stopRecording = function (){
  //$('#recStatus').fadeOut();
    recorder && recorder.stop();
    console.log('Recorder stop');

    var now = new Date();
    createDownloadLink();
    var now = new Date();
    $scope.recordings = true;
    recorder.clear();
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function (blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');

      au.controls = true;
      au.src = url;
      hf.href = url;
      //hf.download = new Date().toISOString() + '.wav';
      var now = new Date();
      var patchName = location.pathname.substring(1);
      patchName = patchName.replace(/\.[^/.]+$/, "");
      hf.download = patchName + now.toISOString() + '.wav';
      hf.innerHTML = hf.download;
      console.log(hf.download);
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
  }

var WORKER_PATH = './scripts/controllers/recorderWorker.js';

  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    var numChannels = config.numChannels || 2;
    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
                 this.context.createJavaScriptNode).call(this.context,
                 bufferLen, numChannels, numChannels);
    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: numChannels
      }
    });
    var recording = false,
      currCallback;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++){
          buffer.push(e.inputBuffer.getChannelData(channel));
      }
      worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }

    this.configure = function(cfg){
      for (var prop in cfg){
        if (cfg.hasOwnProperty(prop)){
          config[prop] = cfg[prop];
        }
      }
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.getBuffer = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffer' })
    }

    this.exportWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    }

    worker.onmessage = function(e){
      var blob = e.data;
      currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  };

  Recorder.forceDownload = function(blob, filename){
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }

  window.Recorder = Recorder;




}]);