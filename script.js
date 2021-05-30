// start of Jquery
$(document).ready(function () {
        // these are variabales for day zero
        let cardElContainer = $("#cardElementsContainer").text("");
        // these are the variables for the API fetch
        let locationQuery = '';
        let searchHistory = [];
        let citylon ='';
        let citylat ='';

        try {
                let locationJSON = localStorage.getItem('location');
                searchHistory = JSON.parse(locationJSON) || [];
        } catch {
                searchHistory = [];
        }
        printHistory(searchHistory);
// ------------------------------------------------------------------------------------------     
// this is the clear button
        $("#clearBtn").on("click", function () {

                console.log("the clear button was clicked");
                localStorage.clear()
                searchHistory = [];
                cardElContainer = $("#cardElementsContainer").text("");

                event.preventDefault();
                $(".searchHistory").text("");
        })
// ------------------------------------------------------------------------------------------   
// ------------------------------------------------------------------------------------------     

// this is the API call#1
$("#searchBtn").on("click", function serachEvent (event) {
                console.log("searchbutton clcked twice")

                cardElContainer.text('');

                locationQuery = $("#searchField").val().trim();
                searchHistory.push(locationQuery)
                localStorage.setItem("location", JSON.stringify(searchHistory));
                event.preventDefault();

                console.log(locationQuery)
                console.log(searchHistory);

                printHistory(searchHistory);
                
                fetch(
                        'https://api.openweathermap.org/data/2.5/forecast?q=' +
                        locationQuery +
                        '&cnt=48&appid=4e9b190f26827f446e804d86e0f8f699'
                        )
                        .then(function (response) {
                                return response.json();
                        })
                        .then(function (weatherData) {

                                let weatherDataList = weatherData.list || [];

                                //     data from API
                                console.log(weatherData);

                                if (weatherDataList.length == 0) {
                                        //TODO: show a friendly error message
                                        return; 
                                }
                        
                        citylon = weatherData.city.coord.lon;
                        citylat = weatherData.city.coord.lat;

                        
                                console.log("searchbutton clcked once")
                                // let citylon = weatherData.city.coord.lon;
                                // let citylat = weatherData.city.coord.lat;
                                console.log(citylon);
                                console.log(citylat);
                        
                                fetch(
                                        'https://api.openweathermap.org/data/2.5/onecall?lat='+
                                        citylat+
                                        '&lon='+
                                        citylon+
                                        '&appid=4e9b190f26827f446e804d86e0f8f699'
                                        )
                                        .then(function (response) {
                                                return response.json();
                                        })
                                        .then(function (dayZdata) {
                                        console.log(dayZdata.current);
                                        
                                        let cardZero = $(".cardZero")
                                        $("#dayZero").text("Date: " + weatherDataList[0].dt_txt)
                                        $("#dayZeroTemp").text("Temp: " + Math.floor(dayZdata.current.temp - 273) + " C")
                                        $("#dayZeroWind").text("Wind: " + weatherDataList[0].wind.speed + " m/s");
                                        $("#dayZeroHumidity").text("Humidity: " + dayZdata.current.humidity + "%")
                                        $("#dayZeroWeatherUVI").text("UV Index: " + dayZdata.current.uvi + "%")
                                        $("#dayZeroWeatherDetailsMain").text("Description: " + dayZdata.current.weather[0].main)
                                        // $("#dayZeroWeatherDetailsDescription").text(dayZdata.current.weather[0].description)
                                        
                                        let icon = dayZdata.current.weather[0].icon;

                                        let currentWeatherUrl = 'http://openweathermap.org/img/wn/' +
                                        icon +
                                        '@2x.png';
                                        imageIcon = $("<img>").attr("src", currentWeatherUrl);
                                        cardZero.append(imageIcon)        

                        })
                                let firstDate = weatherDataList[0].dt_txt;
                                let firstDateMoment = moment(firstDate);
                                let now = moment();

                                firstDateMoment.set({
                                        hour: now.get('hour'),
                                        minute: now.get('minute'),
                                        second: now.get('second')
                                });

                                // Build an array of moments we want to report on (one per day)
                                let forcastDayMoments = [];
                                for (let i = 0; i < 5; i++) {
                                        let forcastDayMoment = moment(firstDateMoment).add(i, 'days');
                                        forcastDayMoments.push(forcastDayMoment);
                                }

                                let forcastDataItems = [];
                                forcastDayMoments.forEach(function (forcastDayMoment) {
                                        let previousDiffInMS;
                                        let previousWeatherData;
                                        for (let i = 0; i < weatherDataList.length; i++) {
                                                let dayDateTime = weatherDataList[i].dt_txt;
                                                let weatherMoment = moment(dayDateTime);
                                                let diffInMS = moment(weatherMoment).diff(forcastDayMoment);
                                                diffInMS = Math.abs(diffInMS);

                                                if (previousDiffInMS === undefined) {
                                                        previousDiffInMS = diffInMS;
                                                        previousWeatherData = weatherDataList[i];
                                                        continue;
                                                }

                                                if (diffInMS > previousDiffInMS || (i == weatherDataList.length - 1)) {
                                                        forcastDataItems.push(previousWeatherData);
                                                        break;
                                                }

                                                previousDiffInMS = diffInMS;
                                                previousWeatherData = weatherDataList[i];
                                        }
                                });


                                forcastDataItems.forEach(function (forcastDataItem) {

                                        let dayDateTime = forcastDataItem.dt_txt;
                                        let dayTempKelvin = Math.floor(forcastDataItem.main.temp - 273);
                                        let dayWindSpeed = forcastDataItem.wind.speed;
                                        let dayHumidity = forcastDataItem.main.humidity;
                                        let dayWeatherDetailsMain = forcastDataItem.weather[0].main;
                                        let dayWeatherDetailsDescription = forcastDataItem.weather[0].description;
                                        let dayWeatherDetailsIcon = forcastDataItem.weather[0].icon;
                                        let weatherIconUrl = 'http://openweathermap.org/img/wn/' +
                                                dayWeatherDetailsIcon +
                                                '@2x.png';

                                        // creating the elements for each card
                                        cardElContainer = $("#cardElementsContainer");
                                        createcardEL = $("<div>").addClass("card  border border-primary").text(dayDateTime);
                                        createCardBody = $("<div>").addClass("card-body");
                                        headerEl = $("<h5>").addClass("card-title");
                                        listElTemp = $("<li>").addClass("listClass").attr("id", "dayTemp").text(dayTempKelvin + " C");
                                        listElWind = $("<li>").addClass("listClass").attr("id", "dayWind").text(dayWindSpeed + " m/s");
                                        listElHumidity = $("<li>").addClass("listClass").attr("id", "dayHumidity").text(dayHumidity + "%");;
                                        listElDetailsMain = $("<li>").addClass("listClass").attr("id", "detailsMain").text(dayWeatherDetailsMain);;
                                        listElDetailsDescription = $("<li>").addClass("listClass").attr("id", "detailsDescription").text(dayWeatherDetailsDescription);;
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
                                });
                                // -----------------------------------------------------------------------------------------------
                        });

                        
        });
// ------------------------------------------------------------------------------------------     

// this is on clicking the search history
$(".dynamicP").on("click", function () {
        cardElContainer = $("#cardElementsContainer").text("");
        locationQuery = $(this).text()
        console.log(locationQuery)

        fetch(
                'https://api.openweathermap.org/data/2.5/forecast?q=' +
                locationQuery +
                '&cnt=48&appid=4e9b190f26827f446e804d86e0f8f699'
                )
                .then(function (response) {
                        return response.json();
                })
                .then(function (weatherData) {
                        let weatherDataList = weatherData.list || [];

                        //     data from API
                        console.log(weatherData);
                        citylon = weatherData.city.coord.lon;
                        citylat = weatherData.city.coord.lat;
                        if (weatherDataList.length == 0) {
                                //TODO: show a friendly error message
                                return; 
                        }
                        fetch(
                                'https://api.openweathermap.org/data/2.5/onecall?lat='+
                                citylat+
                                '&lon='+
                                citylon+
                                '&appid=4e9b190f26827f446e804d86e0f8f699'
                                )
                                .then(function (response) {
                                        return response.json();
                                })
                                .then(function (dayZdata) {
                                console.log(dayZdata.current);
                                
                                let cardZero = $(".cardZero")
                                $("#dayZero").text("Date: " + weatherDataList[0].dt_txt)
                                $("#dayZeroTemp").text("Temp: " + Math.floor(dayZdata.current.temp - 273) + " C")
                                $("#dayZeroWind").text("Wind: " + weatherDataList[0].wind.speed + " m/s");
                                $("#dayZeroHumidity").text("Humidity: " + dayZdata.current.humidity + "%")
                                $("#dayZeroWeatherUVI").text("UV Index: " + dayZdata.current.uvi + "%")
                                $("#dayZeroWeatherDetailsMain").text("Description: " + dayZdata.current.weather[0].main)
                                // $("#dayZeroWeatherDetailsDescription").text(dayZdata.current.weather[0].description)
                                let icon = dayZdata.current.weather[0].icon;

                                let currentWeatherUrl = 'http://openweathermap.org/img/wn/' +
                                icon +
                                '@2x.png';
                                imageIcon = $("<img>").attr("src", currentWeatherUrl);
                                // cardZero.append(imageIcon)        
                })
                        let firstDate = weatherDataList[0].dt_txt;
                        let firstDateMoment = moment(firstDate);
                        let now = moment();

                        firstDateMoment.set({
                                hour: now.get('hour'),
                                minute: now.get('minute'),
                                second: now.get('second')
                        });

                        // Build an array of moments we want to report on (one per day)
                        let forcastDayMoments = [];
                        for (let i = 0; i < 5; i++) {
                                let forcastDayMoment = moment(firstDateMoment).add(i, 'days');
                                forcastDayMoments.push(forcastDayMoment);
                        }

                        let forcastDataItems = [];
                        forcastDayMoments.forEach(function (forcastDayMoment) {
                                let previousDiffInMS;
                                let previousWeatherData;
                                for (let i = 0; i < weatherDataList.length; i++) {
                                        let dayDateTime = weatherDataList[i].dt_txt;
                                        let weatherMoment = moment(dayDateTime);
                                        let diffInMS = moment(weatherMoment).diff(forcastDayMoment);
                                        diffInMS = Math.abs(diffInMS);

                                        if (previousDiffInMS === undefined) {
                                                previousDiffInMS = diffInMS;
                                                previousWeatherData = weatherDataList[i];
                                                continue;
                                        }

                                        if (diffInMS > previousDiffInMS || (i == weatherDataList.length - 1)) {
                                                forcastDataItems.push(previousWeatherData);
                                                break;
                                        }

                                        previousDiffInMS = diffInMS;
                                        previousWeatherData = weatherDataList[i];
                                }
                        });


        forcastDataItems.forEach(function (forcastDataItem) {

                                let dayDateTime = forcastDataItem.dt_txt;
                                let dayTempKelvin = Math.floor(forcastDataItem.main.temp - 273);
                                let dayWindSpeed = forcastDataItem.wind.speed;
                                let dayHumidity = forcastDataItem.main.humidity;
                                let dayWeatherDetailsMain = forcastDataItem.weather[0].main;
                                let dayWeatherDetailsDescription = forcastDataItem.weather[0].description;
                                let dayWeatherDetailsIcon = forcastDataItem.weather[0].icon;
                                let weatherIconUrl = 'http://openweathermap.org/img/wn/' +
                                        dayWeatherDetailsIcon +
                                        '@2x.png';

                                // creating the elements for each card
                                cardElContainer = $("#cardElementsContainer");
                                createcardEL = $("<div>").addClass("card  border border-primary").text(dayDateTime);
                                createCardBody = $("<div>").addClass("card-body");
                                headerEl = $("<h5>").addClass("card-title");
                                listElTemp = $("<li>").addClass("listClass").attr("id", "dayTemp").text(dayTempKelvin + " C");
                                listElWind = $("<li>").addClass("listClass").attr("id", "dayWind").text(dayWindSpeed + " m/s");
                                listElHumidity = $("<li>").addClass("listClass").attr("id", "dayHumidity").text(dayHumidity + "%");;
                                listElDetailsMain = $("<li>").addClass("listClass").attr("id", "detailsMain").text(dayWeatherDetailsMain);;
                                listElDetailsDescription = $("<li>").addClass("listClass").attr("id", "detailsDescription").text(dayWeatherDetailsDescription);;
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
                        });
                        // -----------------------------------------------------------------------------------------------
                });

                
});





// ------------------------------------------------------------------------------------------     
function printHistory(searchHistory) {
                let searchHistoryEl = $(".searchHistory");
                searchHistoryEl.empty();
                for (i = 0; i < searchHistory.length; i++) {
                        let dynamicPTag = $("<button>").addClass("dynamicP").text(searchHistory[i]);
                        searchHistoryEl.append(dynamicPTag);
                }
        }
})


// end of Jq

