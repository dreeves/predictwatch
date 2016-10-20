// This is the code that runs on the watch.
// The weather part isn't working right now.

var rocky = require('rocky');

var weather; // stores weather data fetched from open weather map
var predict; // stores data from predictwise

rocky.on('draw', function(event) {
  var ctx = event.context; // CanvasRenderingContext2D object
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var d = new Date();
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '42px bold numbers Leco-numbers';
  ctx.fillText(d.getHours()+':'+(d.getMinutes()<10 ? '0' : '')+d.getMinutes(), w/2, h/2, w);
  
  if (predict) { drawPredict(ctx, predict); }
  if (weather) { drawWeather(ctx, weather); }
});

rocky.on('minutechange', function(event) {
  //console.log("Another minute with your Pebble!");
  rocky.requestDraw();
});

rocky.on('message', function(event) {
  var message = event.data; // get message from mobile device (pkjs)

  if (message.weather) {
    weather = message.weather;
    rocky.requestDraw();
  }

  if (message.predict) {
    predict = message.predict;
    rocky.requestDraw();
  }
});

rocky.on('minutechange', function(event) {
  rocky.postMessage({'fetch': 'predict'});
});

rocky.on('hourchange', function(event) {
  rocky.postMessage({'fetch': 'weather'});  
});

function drawWeather(ctx, weather) {
  var weatherString = weather.fahrenheit + 'ºF, ' + weather.desc;
  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '14px Gothic';
  ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2, ctx.canvas.unobstructedHeight - 2);
}

function drawPredict(ctx, predict) {
  var predictString = 'Clinton  ' + predict.clinton + '\nTrump  ' + predict.trump + '\n' + predict.timestamp;
  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '14px Gothic';
  ctx.fillText(predictString, ctx.canvas.unobstructedWidth / 2, 2);
}
