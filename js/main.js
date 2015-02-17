$(document).ready(function(){
	$.getJSON('weather.json', function(data) {
    // console.log(data.currently);
    // console.log("Time:" + " " + data.currently.time);
    // console.log(data.currently.summary);
    // console.log("Feels Like:" + " " + data.currently.apparentTemperature);
    // console.log("Actual Temp:" + " " + data.currently.temperature);
    // console.log("Humidity:" + " " + data.currently.humidity);
    // console.log("Windspeed:" + " " + data.currently.windSpeed);
    // console.log("Chance of Rain:" + " " + data.currently.precipProbability + "%");
    // console.log(data.daily.summary);
    // console.log("Forecast:" + " " + data.daily.data[0].summary + "\nTomorrow:" + " " + data.daily.data[1].summary);
    // console.log(data.daily);


    //Jared, here is the variables for some of the things we will need to populate with, these focus soley
    //on the CURRENT stats, obviously we can make some more `vars` for the "future" weather later on
    //or loop threw this data, we'll talk about it more in person tomorrow, for now this gives
    //us something to work with
    var currentTemp = data.currently.apparentTemperature;
    var humidity =  data.currently.humidity;
    var summary =  data.currently.summary;
    var cloudCover =  data.currently.cloudCover;
    var icon =  data.currently.icon;

    $('li:nth-child(1)').html("The Current Temp is: "+currentTemp);
    $('li:nth-child(2)').html("humidity is: " + humidity);
    $('li:nth-child(3)').html("today will be: " +summary);
    $('li:nth-child(4)').html("cloud cover: "+cloudCover);
    $('li:nth-child(5)').html('today will be: '+icon);


});
});