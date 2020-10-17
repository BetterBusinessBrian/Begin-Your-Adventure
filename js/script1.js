var state;

$(document).ready(function () {

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
    });


    function abbrState(input) {

        var states = [
            ['arizona', 'az'],
            ['alabama', 'al'],
            ['alaska', 'ak'],
            ['arkansas', 'ar'],
            ['california', 'ca'],
            ['colorado', 'co'],
            ['connecticut', 'ct'],
            ['delaware', 'de'],
            ['florida', 'fl'],
            ['georgia', 'ga'],
            ['hawaii', 'hi'],
            ['idaho', 'id'],
            ['illinois', 'il'],
            ['indiana', 'in'],
            ['iowa', 'ia'],
            ['kansas', 'ks'],
            ['kentucky', 'ky'],
            ['louisiana', 'la'],
            ['maine', 'me'],
            ['maryland', 'md'],
            ['massachusetts', 'ma'],
            ['michigan', 'mi'],
            ['minnesota', 'mn'],
            ['mississippi', 'ms'],
            ['missouri', 'mo'],
            ['montana', 'mt'],
            ['nebraska', 'ne'],
            ['nevada', 'nv'],
            ['new hampshire', 'nh'],
            ['new jersey', 'nj'],
            ['new mexico', 'nm'],
            ['new york', 'ny'],
            ['north carolina', 'nc'],
            ['north dakota', 'nd'],
            ['ohio', 'oh'],
            ['oklahoma', 'ok'],
            ['oregon', 'or'],
            ['pennsylvania', 'pa'],
            ['rhode island', 'ri'],
            ['south carolina', 'sc'],
            ['south dakota', 'sd'],
            ['tennessee', 'tn'],
            ['texas', 'tx'],
            ['utah', 'ut'],
            ['vermont', 'vt'],
            ['virginia', 'va'],
            ['washington', 'wa'],
            ['west virginia', 'wv'],
            ['wisconsin', 'wi'],
            ['wyoming', 'wy'],
        ];

        // console.log('state passed ', input);

        var statePassed = input.toLowerCase();
        // console.log('name passed is now ', statePassed);

        // input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        // console.log('input is ', input);
        
        for (i = 0; i < states.length; i++) {
            var stateName = states[i][0];
            var stateAbbr = states[i][0];

            if (states[i][0] === statePassed) {
                    state = (states[i][1]);
                    console.log('returned ', states[i][1]);
                    return (state);
            } else if (states[i][1] === statePassed) {
                state = (states[i][1]);
                console.log('returned ', states[i][1]);
                return (state);
            } else if (i >= 49) {
                console.log('this');
                $('#message').fadeIn(1000);
                $('#message').text("Please enter a valid state name");
                setTimeout(function(){
                    $('#message').fadeOut(1000);
                },3000); 
            }
        }
    }

    $("#searchForm").submit(function() {
        var state = $('#search-input').val();
        // console.log('state = ', state);
        var stateName = abbrState(state);
        localStorage.setItem("state", stateName);
        location.href = "index2.html";
        clear();
        return false;
    });

    function clear (){
        $('#search-input').val(''); 
    }


});