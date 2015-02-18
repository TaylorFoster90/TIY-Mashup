$(document).ready(function() {
  var TOKEN = '9e3f9effa091da78070dd0e26d01368f';
 
  var API = _.template('https://api.forecast.io/forecast/${token}/${coords.lat},${coords.lon}');
 
  $('#fullpage').fullpage();
 
  /**
   * @param Object coords with { lat: Number, lon: Number }
   */
  function getWeather(token, coords){
    return $.ajax({
      url: API({ token: token, coords: coords }),
      dataType: 'jsonp'
    })
      .fail(function(){
        // Add error message to page...
      })
      .always(function(){
        // Hide / remove loading animation...
      })
    ; // END request
  }
 
  // Display loading animation...
  var request = getWeather(TOKEN, { lat: '38.6967', lon: '76.0122' });
 
  request.done(function(data) {
    //current weather
    var cTemp = data.currently.apparentTemperature;
    var cHumidity = data.currently.humidity;
    var cSummary = data.currently.summary;
    var cCloudCover = data.currently.cloudCover;
    var wIcon = data.currently.icon;
 
    if (wIcon == 'cloudy'){
      $('i').addClass('wi wi-cloudy');
    }
    if (wIcon == 'rain'){
      $('i').addClass('wi wi-rain');
    }
    if (wIcon = 'clear-day'){
      $('i').addClass('wi wi-day-sunny');
    }
    if (cSummary == 'clear-night'){
      $('i').addClass('wi wi-night-clear');
    }
    if(wIcon == 'partly-cloudy-night'){
        ('i').addClass('wi wi-night-cloudy')
    }
    if (wIcon == ''){
      $('i').addClass('wi wi-snow');
    }
    else{
        $('i').addClass('wi wi-meteor');
    };
    $('li:nth-child(1)').append("<span>" + cTemp + "\&#176" + "</span>");
    $('li:nth-child(2)').append("<span>" + cSummary + "</span>");
    $('li:nth-child(3)').append("<span>" + "Cloud Cover: " + Math.floor(cCloudCover * 100) + "%" + "</span>");
    $('li:nth-child(4)').append("<span>" + "Humidity: " + Math.floor(cHumidity * 100) + "%" + "</span>");
    $('#temp').hover(function(){
      $(this).children().css('display', 'inline');
    });
    $('#sum').hover(function(){
      $(this).children().css('display', 'inline');
    });
    $('#cloud').hover(function(){
      $(this).children().css('display', 'inline');
    });
    $('#humid').hover(function(){
      $(this).children().css('display', 'inline');
    });
  });
 
  request.done(function(data){
    //hourly
    var hourly = data.hourly.data
    var hTemp = _.map(hourly, 'temperature');
    var hSummary = _.map(hourly, 'summary');
    var hTime = _.map(hourly, 'time');
 
    for (var i = 0; i < 24; i++) {
      var date = new Date(hTime[i] * 1000);
      var hours = date.getHours();
      $('.hour').append("<li>" + "<time>" + hours + ":00" + "</time>" + " " + "<span>" + Math.floor(hTemp[i]) + "\&#176" + " " + hSummary[i] + "</span>" + "</li>");
    }
  });
});