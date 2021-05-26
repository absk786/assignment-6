// this will fetch the data and console log it. 
// start of JQ
$(document).ready(function(){

    for (i = 0; i <5; i++) {
        console.log(moment().add(i, 'days').calendar());  
    }
    
    $("#searchBtn").on("click", function(Event) { 
    let locationQuery = $("#searchField").val().trim();
   event.preventDefault ();
    console.log(locationQuery)
    console.log("the search, button was clicked");

fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    locationQuery+
     '&appid=4e9b190f26827f446e804d86e0f8f699'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(positionData) {
        console.log(positionData);

    let lat = positionData.coord.lat;
    let lon= positionData.coord.lon;

    console.log(lon);
    console.log(lat);

    // Fetch of second set of data
     fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat='+
        lat+
        '&lon='
        +lon+
        '&appid=4e9b190f26827f446e804d86e0f8f699'
        )
        .then(function(response) {
          return response.json();
        })
        .then(function(weatherData) {
          console.log(weatherData);
        });
    });
})



   

// end of Jq
});