/*
//$.button.on(click) post zip code to geocoding api, return lat/lon
//var userLoc = form return value
//new json call = $.get(JSON('"https://api.forecast.io/forecast/9e3f9effa091da78070dd0e26d01368f/" + userLoc + "?callback=?"'
*/


$(document).ready(function(){
    $('#fullpage').fullpage();

    $("button").click(function(zip){

    $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + $('#zipbox').val() + "&key=AIzaSyAFisviBgn4MTif0nM9VYfMP3rDoBrC_XM");
        console.log('success');
        console.log($('#zipbox').val());
        console.log(justthefuckingobjectplease);


    });

    $.getJSON('https://api.forecast.io/forecast/9e3f9effa091da78070dd0e26d01368f/28.6967,-81.0122?callback=?', function(data) {
    //current weather
    var cTemp = data.currently.apparentTemperature;
    var cHumidity =  data.currently.humidity;
    var cSummary =  data.currently.summary;
    var cCloudCover =  data.currently.cloudCover;
    var wIcon = data.currently.icon;
    

    if(wIcon = "rain"){
        $('i').addClass("wi wi-rain");
    } else if(wIcon == "light-rain"){
        $('i').addClass("wi wi-showers");    
    } else if(wIcon == "partly-cloudy-night"){
        $('i').addClass("wi wi-night-cloudy");
    } else if(wIcon == "cloudy"){
        $('i').addClass("wi wi-cloudy");
    } else if(wIcon == "clear-night"){
        $('i').addClass("wi wi-night-clear");
    } else if(wIcon == "clear-day"){
        $('i').addClass("wi wi-day-sunny");
    } else {
        $('i').addClass("");
    };

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
    $('li:nth-child(1)').append("<span>" + cTemp + "\&#176" + "</span>");
    $('li:nth-child(2)').append("<span>" + cSummary + "</span>");
    $('li:nth-child(3)').append("<span>" + "Cloud Cover: "+ Math.floor(cCloudCover*100)+"%" + "</span>");
    $('li:nth-child(4)').append("<span>" + "Humidity: " + Math.floor(cHumidity*100) + "%" + "</span>");
    $('#temp').hover(
        function(){
            $(this).children().css('display', 'inline');
        });
    $('#sum').hover(
        function(){
            $(this).children().css('display', 'inline');
        });
    $('#cloud').hover(
        function(){
            $(this).children().css('display', 'inline');
        });
    $('#humid').hover(
        function(){
            $(this).children().css('display', 'inline');
        });
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
