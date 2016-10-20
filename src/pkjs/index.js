// open weather map
var myAPIKey = '0de15b7f09e4e93b7327c261eb03794b';

Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;

  if (message.fetch === 'predict') {
    var pwurl = 'http://table-cache1.predictwise.com/latest/group_3.json';
    request(pwurl, 'GET', function(respText) {
      var predictData = JSON.parse(respText);
      Pebble.postMessage({
        'predict': {
          'clinton':   parseInt(predictData.tables[0].table[0][1]),
          'trump':     parseInt(predictData.tables[0].table[1][1]),
          'timestamp': predictData.tables[0].timestamp
        }
      });
    });
  } else if (message.fetch === 'weather') {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var wurl = 'http://api.openweathermap.org/data/2.5/weather' +
                '?lat=' + pos.coords.latitude +
                '&lon=' + pos.coords.longitude +
                '&appid=' + myAPIKey;

      request(wurl, 'GET', function(respText) {
        var weatherData = JSON.parse(respText);

        Pebble.postMessage({
          'weather': {
            'celcius': Math.round(weatherData.main.temp - 273.15), // from kelvin
            'fahrenheit': Math.round((weatherData.main.temp - 273.15)*9/5+32),
            'desc': weatherData.weather[0].main
          }
        });
      });
    }, function(err) {
      console.error('Error getting location');
    },
    { timeout: 15000, maximumAge: 60000 });
  }
});

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function(e) {
    if (xhr.status >= 400 && xhr.status < 600) { // HTTP 4xx-5xx are errors
      console.error('Request failed with HTTP status ' + xhr.status + ', body: ' + this.responseText);
      return;
    }
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}
