// start of JQ
$(document).ready(function(){

// these are variabales for day zero
let dayZero = moment().format("Do MM YYYY")
let dayOne = moment().add(1,'days').calendar();
let dayTwo = moment().add(2,'days').calendar();
let dayThree = moment().add(3,'days').calendar();
let dayFour = moment().add(4,'days').calendar();
let dayFive = moment().add(5,'days').calendar();
// these add the dates into the cards
$("#dayZero").text(dayZero);
$("#dayOne").text(dayOne);
$("#dayTwo").text(dayTwo);
$("#dayThree").text(dayThree);
$("#dayFour").text(dayFour);
$("#dayFive").text(dayFive);

// these are the variables for the API fetch
let lat= '';
let lon= '';
let locationQuery= '';
let temperatureData='';

$("#searchBtn").on("click", function(Event) { 
    locationQuery = $("#searchField").val().trim();
   event.preventDefault ();
    console.log(locationQuery)
    console.log("the search, button was clicked");

    cardElContainer = $("cardElementsContainer");
    createcardEL = $("<div>");
    cardElContainer.append(createcardEL);
   console.log("its appended")
   
// fetch(
//     'https://api.openweathermap.org/data/2.5/forecast?q=' +
//     locationQuery+
//      '&appid=4e9b190f26827f446e804d86e0f8f699'
//     )
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(weatherData) {
//         console.log(weatherData);

    // lat = positionData.coord.lat;
    // lon= positionData.coord.lon;

    // console.log(lon);
    // console.log(lat);

    // Fetch of second set of data
    //  fetch(
    //     'https://api.openweathermap.org/data/2.5/onecall?lat='+
    //     lat+
    //     '&lon='
    //     +lon+
    //     '&appid=4e9b190f26827f446e804d86e0f8f699'
    //     )
    //     .then(function(response) {
    //       return response.json();
    //     })
    //     .then(function(weatherData) {
    //     console.log(weatherData.current)
    //     temperatureData = weatherData;
// -----------------------------------------------------------------------------------------------
        // Day zero variables and Data
        // let dayZeroDateTime = weatherData.list[0];
        // let dayZeroTempKelvin = weatherData.list[0].main.temp;
        // let dayZeroWindSpeed = weatherData.list[0].wind.speed;
        // let dayZeroHumidity = weatherData.list[0].main.humidity;
        // let dayZeroWeatherDetailsMain = weatherData.list[0].weather[0].main;
        // let dayZeroWeatherDetailsDescription = weatherData.list[0].weather[0].description;
        // let dayZeroWeatherDetailsIcon = weatherData.list[0].weather[0].icon;
        // $("#dayZero").text(dayZeroDateTime);
        // $("#dayZeroTemp").text(dayZeroTempKelvin);
        // $("#dayZeroWind").text(dayZeroWindSpeed);
        // $("#dayZeroHumidity").text(dayZeroHumidity);
        // $("#dayZeroWeatherDetailsMain").text(dayZeroWeatherDetailsMain);
        // $("#dayZeroWeatherDetailsDescription").text(dayZeroWeatherDetailsDescription);
        // $("#dayZeroWeatherDetailsIcon").text(dayZeroWeatherDetailsIcon);
// -----------------------------------------------------------------------------------------------
        // Day one variables and Data 
        // let dayOne = weatherData.daily;
        // let dayOneUvIndex =  weatherData.current.uvi;
        // let dayOneTempKelvin =  weatherData.current.temp;
        // let dayOneWindSpeed =  weatherData.current.wind_speed;
        // let dayOneWeatherDetailsDescription =  weatherData.current.weather[0].description
        // let dayOneWeatherDetailsIcon =  weatherData.current.weather[0].icon
        // $("#dayOneTemp").text(dayOneTempKelvin);
        // $("#dayOneWind").text(dayOneWindSpeed);
        // $("#dayOneHumidity").text(dayOneHumidity);
        // $("#dayOneUvIndex").text(dayOneUvIndex);
// -----------------------------------------------------------------------------------------------
        // Day one variables and Data 
        // let dayTwo = weatherData.daily;
        // let dayTwoUvIndex =  weatherData.current.uvi;
        // let dayTwoTempKelvin =  weatherData.current.temp;
        // let dayTwoWindSpeed =  weatherData.current.wind_speed;
        // let dayTwoWeatherDetailsDescription =  weatherData.current.weather[0].description
        // let dayTwoWeatherDetailsIcon =  weatherData.current.weather[0].icon
        // $("#dayTwoTemp").text(dayTwoTempKelvin);
        // $("#dayTwoWind").text(dayTwoWindSpeed);
        // $("#dayTwoHumidity").text(dayTwoHumidity);
        // $("#dayTwoUvIndex").text(dayTwoUvIndex);
// -----------------------------------------------------------------------------------------------
        // let dayThree = weatherData.daily;
        // let dayThreeUvIndex =  weatherData.current.uvi;
        // let dayThreeTempKelvin =  weatherData.current.temp;
        // let dayThreeWindSpeed =  weatherData.current.wind_speed;
        // let dayThreeWeatherDetailsDescription =  weatherData.current.weather[0].description
        // let dayThreeWeatherDetailsIcon =  weatherData.current.weather[0].icon
        // $("#dayThreeTemp").text(dayThreeTempKelvin);
        // $("#dayThreeWind").text(dayThreeWindSpeed);
        // $("#dayThreeHumidity").text(dayThreeHumidity);
        // $("#dayThreeUvIndex").text(dayThreeUvIndex);
// -----------------------------------------------------------------------------------------------
        // let dayFour = weatherData.daily;
        // let dayFourUvIndex =  weatherData.current.uvi;
        // let dayFourTempKelvin =  weatherData.current.temp;
        // let dayFourWindSpeed =  weatherData.current.wind_speed;
        // let dayFourWeatherDetailsDescription =  weatherData.current.weather[0].description
        // let dayFourWeatherDetailsIcon =  weatherData.current.weather[0].icon
        // $("#dayFourTemp").text(dayFourTempKelvin);
        // $("#dayFourWind").text(dayFourWindSpeed);
        // $("#dayFourHumidity").text(dayFourHumidity);
        // $("#dayFourUvIndex").text(dayFourUvIndex);
// -----------------------------------------------------------------------------------------------
        // let dayFive = weatherData.daily;
        // let dayFiveUvIndex =  weatherData.current.uvi;
        // let dayFiveTempKelvin =  weatherData.current.temp;
        // let dayFiveWindSpeed =  weatherData.current.wind_speed;
        // let dayFiveWeatherDetailsDescription =  weatherData.current.weather[0].description
        // let dayFiveWeatherDetailsIcon =  weatherData.current.weather[0].icon
        // $("#dayFiveTemp").text(dayFiveTempKelvin);
        // $("#dayFiveWind").text(dayFiveWindSpeed);
        // $("#dayFiveHumidity").text(dayFiveHumidity);
        // $("#dayFiveUvIndex").text(dayFiveUvIndex);
// -----------------------------------------------------------------------------------------------
        });

    });
// })
// end of Jq
