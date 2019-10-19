// 'use strict';
// console.log('apiCall.js');
// console.log('slick is ready!');

window.onload = function () {
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 1250,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
    getLocation();
};



var lat;
var long;
var choice;

function renderParks(data, type) {
    // TODO: Iterate around the data array and append html tags for each park returned 

    for (var i = 0; i < 6; i++) {

        // common variables
        var parkName = data[i].name;
        var parkLocation = data[i].location;

        console.log('Park Name -> ' + parkName);

        var results = $('<div>');
        results.addClass('results');

        results.append(parkName + ' is located in ' + parkLocation);
        // results.append('Type: '+ parkType);
        $('#results').append(results);

        // variables for trails
        if (type === 'trails') {
            var trailSummary = data[i].summary;
            var parkPicture = data[i].imgSmallMed;
            var trailLength = data[i].length;
            // var parkType = data[i].type;


            var trailSumm = $('<div>');
            trailSumm.addClass('info');
            var lenghtOfTrail = $('<div>');
            lenghtOfTrail.addClass('info');

            trailSumm.append(trailSummary);
            lenghtOfTrail.append('This trail is ' + trailLength + ' miles long');

            $('#results').append(trailSumm);
            $('#results').append(lenghtOfTrail);

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
            canReserve.append('is this camp bookable? ' + campBookable);
            webCamp.append('For more information visit ' + '<a href=' + parkUrl + '>' + parkName + '</a>');

            $('#results').append(numCamps);
            $('#results').append(canReserve);
            $('#results').append(webCamp);

        };


        //////////////////////////////////////

        //// CONTAINER ID="SHOW" NEEDS TO BE COMMENTED BACK IN HTML
        //// TO TRY THE FOLLOWING
        //// main container for carousel
        // // dynamically creates content but breaks carousel

        // var slider = $('<div class="slider>');
        // // slider.addClass('slider');

        // //// title and image container
        // var slide = $('<div>');
        // slide.addClass('slide');

        // // title
        // var title = $('<h3>');
        // title.text(parkName);

        // slide.append(title);
        // slide.append('<img src=' + parkPicture + '>');

        // var slider = $('<div>');
        // slider.addClass('slider');

        // slider.append(slide);

        // $('#show').append(slider);

        ////// OR THIS W/O CHANGING THE DIV BUT W/O CREATING VAR SLIDER
        // $('.slider').append(slide);

        ////////////////////////////////////

        // These append data to dom but multiplies of them
        // $('h3').append(parkName);
        // $('.slide').append('<img src=' + parkPicture + '>');
    };

    // $('.slider').append(slide);

    // $('#show').append(slider);

    $('h3').append(parkName);
    $('.slide').append('<img src=' + parkPicture + '>');
};

//var choice;  // this is in case the function commented out inside on click works

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