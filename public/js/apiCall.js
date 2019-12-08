// 'use strict';
console.log('apiCall.js');


window.onload = function () {
    getLocation();
};

var lat;
var long;
var choice;

function renderParks(data, type) {
    //Iterate around the data array and append html tags for each park returned 

    for (var i = 0; i < 6; i++) {

        // common variables
        var parkName = data[i].name;
        var parkLocation = data[i].location;

        var results = $('<div>');
        results.addClass('results');

        results.append(parkName + ' is located in ' + parkLocation);
        $('#results').append(results);

        // variables for trails
        if (type === 'trails') {
            var trailSummary = data[i].summary;
            var parkPicture = data[i].imgSmall;
            var trailLength = data[i].length;

            var trailSumm = $('<div>');
            trailSumm.addClass('info');
            var lenghtOfTrail = $('<div>');
            lenghtOfTrail.addClass('info');

            var parkImage = $('<div>');
            parkImage.addClass('foto');
            parkImage.append('<img src=' + parkPicture + '>');

            trailSumm.append(trailSummary);
            lenghtOfTrail.append('This trail is ' + trailLength + ' miles long');
            
            $('#results').append(trailSumm);
            $('#results').append(lenghtOfTrail);
            $('#results').append(parkImage);


        } else {
            // variables for campgrounds
            var campBookable = data[i].isBookable;
            var campsiteNumb = data[i].numCampsites;
            var parkPicture = data[i].imgUrl;
            var parkUrl = data[i].url;

            var numCamps = $('<div>');
            numCamps.addClass('info');
            var canReserve = $('<div>');
            canReserve.addClass('info');
            var webCamp = $('<div>');
            webCamp.addClass('webadd');

            numCamps.append('Campsites available: ' + campsiteNumb);
            canReserve.append('is this camp bookable?: ' + campBookable);
            webCamp.append('For more information visit: ' + '<a href=' + parkUrl + '>' + parkName + '</a>');

            $('#results').append(numCamps);
            $('#results').append(canReserve);
            $('#results').append(webCamp);

        };
    };
};


$(".choice").on("click", function (event) {
    event.preventDefault();

    choice = ($(this).data('value'));
    var howFar = $('#how-far').val().trim();

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
                renderParks(data, 'campgrounds')
            } else if (result['trails']) {
                var data = result.trails
                renderParks(data, 'trails')
            };
        });
});

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    };
};

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        " / Longitude: " + position.coords.longitude;

    lat = position.coords.latitude;
    lon = position.coords.longitude;
};