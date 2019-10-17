// 'use strict';

$(document).ready(function () {
    $('.center').slick({
        // autoplay: autoplay,
        // autoplaySpeed: 4000,
        centerMode: true,
        // centerPadding: '60px',
        slidesToShow: 4,
        arrows: true,
        // speed:5000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 4
                }
            }
        ]
    });
});
console.log('apiCall.js');

console.log('slick is ready!');



var lat;
var long;
var choice;


function renderParks(data, type) {
    // TODO: Iterate around the data array and append html tags for each park returned 

    for (var i = 0; i < 3; i++) {
        var parkName = data[i].name;
        var parkLocation = data[i].location;
        var parkUrl = data[i].url;
        // console.log('=================DATA===============');
        // console.log(data);
        // console.log('==================DATA=============');

        // console.log('parkName--> ', data[i].name);
        // console.log('parkLocation--> ', parkLocation);
        // console.log('parkUrl--> ', parkUrl);

        // variables for trails
        if (type === 'trails') {
            var trailSummary = data[i].summary;
            var parkPicture = data[i].imgSmallMed;
            var trailLength = data[i].length;
        } else {
            // variables for campgrounds
            var campBookable = data[i].isBookable;
            var campCampground = data[i].isCampground;
            var parkPicture = data[i].imgUrl;
        };

        console.log('Park Name -> ' + parkName);
        // console.log('trailPicture--> ', parkPicture);
        // console.log('trailLength--> ', trailLength);
        // console.log('campBookable--> ', campBookable);
        // console.log('campCampground--> ', campCampground);
        // console.log('park picture--> ', parkPicture);
        // console.log('trailSummary--> ', trailSummary);


        // $('#park-info').append('Park Name' + parkName);

        $('.center').append(parkName);

        $('.center').append('<img src=' + parkPicture +'>');

        // $('#park-img' + [i]).append('<img src=' + parkPicture + '>');
        // $('#park-img' + [i]).append('<img src=' + parkPicture + '>');

        $('#camp-box').append(campBookable);
        $('#camp-box').append(campCampground + '<--');

        $('#general-info').append(trailSummary);
        $('#trail-box').append(parkLocation);
        $('#trail-box').append(parkUrl);
        $('#trail-box').append(trailLength + '<--');
        // $('#more-info').append(parkPicture);
        // $('#more-info').append(parkLength);

    }
}

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
                renderParks(data, 'campgrounds')
            } else if (result['trails']) {
                var data = result.trails
                renderParks(data, 'trails')
            }

            // console.log('number of results in i --> ', i);

            // common variables



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