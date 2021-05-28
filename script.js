// start of Jquery
$(document).ready(function(){
let date = '';
// these are variabales for day zero
let day = moment().format("Do MM YYYY")
let cardElContainer = $("#cardElementsContainer").text("'");

// these are the variables for the API fetch
let locationQuery= '';
let searchHistory =[];

$ ("#searchBtn").on("click", function(Event) { 
        cardElContainer.text('');
        locationQuery = $("#searchField").val().trim();
        searchHistory.push(locationQuery)
        localStorage.setItem("location",JSON.stringify(searchHistory));
        event.preventDefault ();
        console.log(locationQuery)
        searchHistory = JSON.parse(localStorage.getItem("searchField"))
        console.log(searchHistory);

fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
        locationQuery+
        '&appid=4e9b190f26827f446e804d86e0f8f699'
        )
        .then(function(response) {
        return response.json();
        })
        .then(function(weatherData) {
//     data from API
        console.log(weatherData);
// loop to dynamically create the weather cards
        for (i=0; i < weatherData.list.length; i=i+8) {
                moment().format ("Do MMMM YYYY");
        let dayDateTime = weatherData.list[i].dt_txt;
        let dayTempKelvin = Math.floor(weatherData.list[i].main.temp - 273);
        let dayWindSpeed = weatherData.list[i].wind.speed;
        let dayHumidity = weatherData.list[i].main.humidity;
        let dayWeatherDetailsMain = weatherData.list[i].weather[0].main;
        let dayWeatherDetailsDescription = weatherData.list[i].weather[0].description;
        let dayWeatherDetailsIcon = weatherData.list[i].weather[0].icon;
        let weatherIconUrl = 'http://openweathermap.org/img/wn/'+
        dayWeatherDetailsIcon+
        '@2x.png'

        // creating the elements for each card
        cardElContainer = $("#cardElementsContainer");
        createcardEL = $("<div>").addClass("card  border border-primary").text(dayDateTime);
        createCardBody = $("<div>").addClass("card-body");
        headerEl = $("<h5>").addClass("card-title");
        listElTemp = $("<li>").addClass("listClass").attr("id","dayTemp").text(dayTempKelvin + " C");
        listElWind = $("<li>").addClass("listClass").attr("id","dayWind").text(dayWindSpeed + " m/s");
        listElHumidity = $("<li>").addClass("listClass").attr("id","dayHumidity").text(dayHumidity + "%");;
        listElDetailsMain = $("<li>").addClass("listClass").attr("id","detailsMain").text(dayWeatherDetailsMain);;
        listElDetailsDescription = $("<li>").addClass("listClass").attr("id","detailsDescription").text(dayWeatherDetailsDescription);;
        imageIcon = $("<img>").attr("src", weatherIconUrl);

        // appending all the elements within each card
        headerEl.append(listElTemp);
        headerEl.append(listElWind);
        headerEl.append(listElHumidity);
        headerEl.append(listElDetailsMain);
        headerEl.append(listElDetailsDescription);
        headerEl.append(imageIcon);
        createCardBody.append(headerEl);
        createcardEL.append(createCardBody);
        cardElContainer.append(createcardEL);

}
// -----------------------------------------------------------------------------------------------
        });
    });
})
// end of Jq
