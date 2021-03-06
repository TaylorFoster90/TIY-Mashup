$(document).ready(function() {
var zip = $('zipcode').val();
var zipcode = Number(zip);
$("button").click(function(zip){
  $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&key=AIzaSyAFisviBgn4MTif0nM9VYfMP3rDoBrC_XM", function(data){
    console.log(data);
    });
});
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
    $('.current li:nth-child(1)').html(cTemp + "\&#176");
    $('.current li:nth-child(2)').html(cSummary);
    $('.current li:nth-child(3)').html("Cloud Cover: " + Math.floor(cCloudCover * 100) + "%");
    $('.current li:nth-child(4)').html("Humidity: " + Math.floor(cHumidity * 100) + "%");
  });
 
  request.done(function(data){
    //hourly
    var hourly = data.hourly.data
    var hTemp = _.map(hourly, 'temperature');
    var hSummary = _.map(hourly, 'summary');
    var hTime = _.map(hourly, 'time');
 
    for (var i = 0; i < 10; i++) {
      var date = new Date(hTime[i] * 1000);
      var hours = date.getHours();
      $('.hour').append("<li class='list-group-item'>" + "<time>" + hours + ":00" + "</time>" + " " + "<span>" + Math.floor(hTemp[i]) + "\&#176" + " " + hSummary[i] + "</span>" + "</li>");
    }
    console.log(data)
    request.done(function(data){
    //daily for 3 days
    function grabTempHigh(a){
        return data.daily.data[a].apparentTemperatureMax;
    }
    function grabTempLow(a){
        return data.daily.data[a].apparentTemperatureMin;
    }
    function grabSummary(a){
        return data.daily.data[a].summary;
    }

    $('.day1').html("Fuckin Tomorrow -- " + "High: " + Math.floor(grabTempHigh(0))+"\&#176" +" Low: "+ " " + Math.floor(grabTempLow(0))+ "\&#176"+" " + grabSummary(0));
    $('.day2').html("Fuckin Day After -- " + "High: " + Math.floor(grabTempHigh(1))+"\&#176" +" Low: "+ " " + Math.floor(grabTempLow(1))+ "\&#176"+" " + grabSummary(1));
    $('.day3').html("Fuckin Day After That -- " + "High: " + Math.floor(grabTempHigh(2))+"\&#176" +" Low: "+ " " + Math.floor(grabTempLow(2))+ "\&#176"+" " + grabSummary(2));


  })
  });
});