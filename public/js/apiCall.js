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
    console.log('location --> ', lat + '/' + lon);

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

            // common variables
            var parkName = data[1].name;
            var parkLocation = data[1].location;
            var parkUrl = data[1].url;

            console.log('parkName--> ', parkName);
            console.log('parkLocation--> ', parkLocation);
            console.log('parkUrl--> ', parkUrl);

            // variables for trails
            var parkSummary = data[1].summary;
            var parkPicture = data[1].imgSmallMed;
            var parkLength = data[1].length;

            console.log('parkSummary--> ', parkSummary);
            console.log('parkPicture--> ', parkPicture);
            console.log('parkLength--> ', parkLength);

            // variables for campgrounds
            var parkBookable = data[1].isBookable;
            var parkCampground = data[1].isCampground;
            var parkImage = data[1].imgUrl;

            console.log('parkBookable--> ', parkBookable);
            console.log('parkCampground--> ', parkCampground);
            console.log('parkImage--> ', parkImage);

            $('#info-here').append(parkName);
            $('#info-here').append(parkLocation);
            $('#first-img').append('<img src=' + parkPicture +'>');

            $('#more-info').append(parkSummary);
            $('#more-info').append(parkPicture);
            $('#more-info').append(parkLength);



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
        "/Longitude: " + position.coords.longitude;

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log('lat/log --> ', lat + '/' + lon);
};