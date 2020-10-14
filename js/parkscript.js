 
$(document).ready(function () {
 
 // var state = localStorage.getItem("state")
 var state = "NC"
 var queryUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=f752B00Hli3S9ed2PsgaxTti5XBmaUL70IP4ZcTu"
 $.ajax({
   url: queryUrl,
   method: "GET"
 }).then(function (response) {
   lat = response.data[1].latitude
   long = response.data[1].longitude
   parkNumber = localStorage.getItem("ParkNumber");
   park = response.data[parkNumber]
   console.log(park)
   images = response.data[3].images;
   console.log(images);
   var i = 0;
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
 });

 
});