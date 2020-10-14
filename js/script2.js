        
        
        var parkName = ""
        var state = localStorage.getItem("state");
        var queryUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=f752B00Hli3S9ed2PsgaxTti5XBmaUL70IP4ZcTu"

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            
            lat = response.data[1].latitude
            long = response.data[1].longitude
            console.log(response)
           

            for (i = 0; i < response.data.length; i++) {
                console.log("looping");
                var div1 = $('<div/>');
                div1.addClass("card");
                var div2 = $('<div/>');
                div2.addClass("card-image");
                div1.append(div2);
                var img = $('<img/>');
                img.attr("src", response.data[i].images[0].url)
                img.addClass("images circle");
                div2.append(img);
                var title =$('<span/>', { text: response.data[i].fullName })
                title.addClass("cardtitle");
                div2.append(title);
                var div3 =$('<div/>');
                div3.addClass("card-content")
                var descrip =$("<p/>", {text: response.data[i].description})
                div3.append(descrip);
                div1.append(div3);
                var div4 =$('<div/>');
                div4.addClass("card-action");
                var link = $("<a/>", {text: "View This Park" , href: response.data[i].url});
                div4.append(link);
                div1.append(div4);

                $(".starter").append(div1);
                // $(".starter").append($("<br>"));
            }
        });