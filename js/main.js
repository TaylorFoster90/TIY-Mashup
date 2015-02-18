$(document).ready(function(){
    $('#fullpage').fullpage();
	$.getJSON('http://api.forecast.io/forecast/9e3f9effa091da78070dd0e26d01368f/28.4158,-81.2989', function(data) {
    //current weather
    var cTemp = data.currently.apparentTemperature;
    var cHumidity =  data.currently.humidity;
    var cSummary =  data.currently.summary;
    var cCloudCover =  data.currently.cloudCover;
    
    if(cSummary == 'Mostly Cloudy'){
        $('i').addClass('wi wi-cloudy');
    }
    if(cSummary == 'Light Rain'){
        $('i').addClass('wi wi-sprinkle');
    }
    if(cSummary = 'Partly Cloudy'){
        $('i').addClass('wi wi-cloud');
    }
    if(cSummary == 'Rain'){
        $('i').addClass('wi wi-rain');
    }
    if(cSummary == 'Snow'){
        $('i').addClass('wi wi-snow');
    };
    $('li:nth-child(1)').html(cTemp + "\&#176");
    $('li:nth-child(2)').html(cSummary);
    $('li:nth-child(3)').html("cloud cover: "+ cCloudCover);
    $('li:nth-child(4)').html("humidity: " + cHumidity);

    //hourly
    var hourly = data.hourly.data
    var hTemp =  _.map(hourly, 'temperature');
    var hSummary = _.map(hourly, 'summary');
    var hTime = _.map(hourly, 'time');

    for(var i=0; i < 24; i++){
        var date = new Date(hTime[i] * 1000);
        var hours = date.getHours();
        $('.hour').append("<li>"+hours+":00"+" "+Math.floor(hTemp[i])+"\&#176"+ " " + hSummary[i] +"</li>");
        }
   });
});