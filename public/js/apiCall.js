// 'use strict';
console.log('apiCall.js');

var lat;
var long;
var choice;

//var choice;  // this is in case the function commented out inside on click works

$(".choice").on("click", function (event) {
    event.preventDefault();
console.log('SEARCHING FOR PARKS')
// $(document).on('click', '#image', function () {
//     event.preventDefault();

        // $('#choice').click(function () {
        //     choice = $('#choice').click();
        // });
    // });
    choice = ($(this).data('value'));
    // var choice = $('#choice').attributes;
    console.log('choice--> ', choice);
    var howFar = $('#how-far').val().trim();

    console.log('distance from Seattle --> ' + howFar);
    // console.log('choice --> ', choice);
    console.log('location --> ', lat+ '/' + lon);

    // var distance = howFar;

    // console.log('apiCall--> line 11--> user choice--> ', choice);
    console.log('apiCall--> line 11--> user distance--> ', howFar);

    // use jquery ajax method
    // Asynchronous JavaScript and XML
    // asynchronous operations run outside of the natural flow of javaScript's single threaded nature

    $.ajax({
        // pass in the queryURL
        url: '/api/queryUrl',
        data: {
            q: howFar,
            c: choice,
            la: lat,
            lo: lon

        },
        // execute a POST method to retrieve information
        method: "POST"
    })
        // .then() => executing after the successful completion of our ajax call
        // .then() will execute our callback function
        // store the data that comes back from the api as result
        .then(function (result) {
            if (result['campgrounds']) {
                var data = result.campgrounds
                for (var i = 0; i < data.length; i++) {
                    console.log('==========RESULT=========');
                    console.log(data[i].id);
                    console.log(data[i].name);
                    console.log('^^^^^^^^^RESULT^^^^^^^');
                };
            } else if (result['trails']) {
                var data = result.trails
                for (var i = 0; i < data.length; i++) {
                    console.log('==========RESULT=========');
                    console.log(data[i].id);
                    console.log(data[i].name);
                    console.log('^^^^^^^^^RESULT^^^^^^^');
                };
            }
            
            // console.log('number of results in i --> ', i);
            var choiceName = data[0].name;
            console.log('choiceName--> ', choiceName);

            // var choiceType = result.trails[0].type;
            // var choiceImgUrl = result.trails[0].imgSmallMed;
            // var choiceSummary = result.trails[0].summary;

            // // var choiceOrigin = result.trails[0].origin;
            // console.log('############## choice DATA ############');
            // console.log(choiceName);
            // console.log(choiceType);
            // console.log(choiceImgUrl);
            // console.log(choiceSummary);
            // console.log('^^^^^^^^^^^choice DATA^^^^^^^^');
            // // console.log('choiceData should show up below');
            // // //answer from api will be shown below.
            // // console.log('choiceName--> ', choiceName);
            // // //var showchoiceName=$('<p id= "choice-name"></p>');
            $('#info-here').append(choiceName);
            // $('#info-here').append(choiceType);
            // $('#info-here').append(choiceSummary);
            // $('#park-img').append(choiceImgUrl);
            // // $('#info-here').append(choiceOrigin);
            // //console.log('showchoiceName--> ', showchoiceName);
        });
});

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log('lat/log --> ', lat + '/' + lon);
};