$(document).ready(function(){
    $('#fullpage').fullpage();
	$.getJSON('weather.json', function(data) {
    //current weather
    var cTemp = data.currently.apparentTemperature;
    var cHumidity =  data.currently.humidity;
    var cSummary =  data.currently.summary;
    var cCloudCover =  data.currently.cloudCover;
    var cIcon =  data.currently.icon;

    // $('li:nth-child(1)').html(currentTemp + "\&#176");
    // $('li:nth-child(2)').html(summary);
    // $('li:nth-child(3)').html("cloud cover: "+ cloudCover);
    // $('li:nth-child(4)').html("humidity: " + humidity);
    // $('li:nth-child(5)').html('today will be: '+ icon);

    //hourly
    var hourly = data.hourly.data

    console.log(_.map(hourly, 'temperature'))



});
});