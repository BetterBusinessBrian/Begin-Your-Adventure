
// var state = localStorage.getItem("state")

var state = localStorage.getItem("state")
parkNumber = localStorage.getItem("ParkNumber");
var queryUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=f752B00Hli3S9ed2PsgaxTti5XBmaUL70IP4ZcTu"
$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function (response) {
  console.log(response)
  lat = response.data[1].latitude
  long = response.data[1].longitude
  park = response.data[parkNumber]
  console.log(park)
  images = response.data[parkNumber].images;
  console.log(images);
  var i = 0;
  if (images.length !== 0) {

    $(images).each(function () {
      url = images[i].url;
      console.log(url);
      var newItem = $("<a>").addClass("carousel-item");
      var newImg = $("<img>").attr("src", url);
      // newImg.addClass("materialboxed");
      var newSlide = newItem.append(newImg);
      $(".carousel").append(newSlide);
      i++;
    });

  // initialize the carousel
  $(".carousel").carousel();
  }

//   $('.carousel').carousel({
//     fullWidth: true,
//     indicators: true,
// });

//   $('.carousel').carousel({
//     fullWidth: true,
//     indicators: true,
// });

  // Populate Park Name
  $(".parkName").text(park.fullName)
  // Populate Activities
  for (i = 0; i < park.activities.length; i++) {
    var listItem = park.activities[i].name
    var ptag = $("<p/>", { text: listItem })
    $(".activities").append(ptag)
  }
  // populate Park Info
  $(".description").text(park.description);
  var address = park.addresses[0].line1 + " " + park.addresses[0].line2 + " " + park.addresses[0].city + ", " + park.addresses[0].stateCode + ", " + park.addresses[0].postalCode
  $(".address").text(address);

  // operating hours
  if(park.operatingHours.length !== 0){
  var opHours = "Description: " + park.operatingHours[0].description
  $(".operating").text(opHours);
  $(".monday").text("Monday: " + park.operatingHours[0].standardHours.monday);
  $(".tuesday").text("Tuesday: " + park.operatingHours[0].standardHours.tuesday);
  $(".wednesday").text("Wednesday: " + park.operatingHours[0].standardHours.wednesday);
  $(".thursday").text("Thursday: " + park.operatingHours[0].standardHours.thursday);
  $(".friday").text("Friday: " + park.operatingHours[0].standardHours.friday);
  $(".saturday").text("Saturday: " + park.operatingHours[0].standardHours.saturday);
  $(".sunday").text("Sunday: " + park.operatingHours[0].standardHours.sunday);
  } else {$(".operating").text("Hours not provided via API, please visit offical site.");}

  // Entry Fees
  for (i = 0; i < park.entranceFees.length; i++) {
    var cost = park.entranceFees[i].cost
    var description = park.entranceFees[i].description
    var title = park.entranceFees[i].title
    var fee = $("<p/>", { text: title + ": $" + cost + "- " + description })
    $(".fees").append(fee)
  }
  $('.modal').modal();

  // Buttons
  $(".parkDirections").on("click", function () {
    $(".parkDirections").attr('href', park.directionsUrl)
  })
  $(".parkWebsite").on("click", function () {
    $(".parkWebsite").attr('href', park.url)
  });

  // Weather Info
  // Using latitude and Longitude from previous API to get complete data from next API
  var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=hourly,minutely,alert&appid=510c7f3ff27ad1727021b6aa3db8d1b0"
  $.ajax({
    url: queryUrl2,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // Update Current Data
    var temp = Math.round(response.current.temp) + "°"
    var humidity = response.current.humidity + "%"
    var windspeed = response.current.wind_speed + "MPH"
    var iconCode = response.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    $(".headIcon").attr("src", iconUrl);
    $(".temp").text("Temperature: " + temp);
    $(".humid").text("Humdity: " + humidity);
    $(".windspeed").text("Wind Speed: " + windspeed)

    for (i = 1; i < 6; i++) {
      $(".date").each(function () {
        var index = parseInt($(this).attr('id'))
        if (i == index) {
          var d = new Date(response.daily[i].dt * 1000)
          var month = d.getMonth() + 1;
          var day = d.getDate();
          var year = d.getFullYear()
          var date = "(" + (day < 10 ? '0' : '') + day + '/' +
            (month < 10 ? '0' : '') + month + '/' + year + ")";
          $(this).text(date)
        }
        $(".forecastTemp").each(function () {
          var index = parseInt($(this).attr('id'))
          if (i == index) {
            var forecastTemp = "Temperature: " + Math.round(response.daily[i].temp.day) + "°"
            $(this).text(forecastTemp)
          }
        })
        $(".forecastHumid").each(function () {
          var index = parseInt($(this).attr('id'))
          if (i == index) {
            var forecastHumid = "Humidity: " + response.daily[i].humidity + "%";
            $(this).text(forecastHumid);
          }
        })
        $(".icon").each(function () {
          var index = parseInt($(this).attr('id'))
          if (i == index) {
            var iconCode = response.daily[i].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            $(this).attr("src", iconUrl);
          }
        })

      });
    }

  });
});