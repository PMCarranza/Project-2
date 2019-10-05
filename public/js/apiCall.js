'use strict';
console.log('apiCall.js');

var apiKey = require('keys.js');

$("#get-info").on("click", function () {
    event.preventDefault();

    // var camp = $('#camp:checkbox').val();
    var camp = $('#camp').val();
    var access = $('#access').val();
    var rv = $('#rv').val();
    var directions = $('#directions').val();
    var water = $('#water').val();
    var firewood = $('#firewood').val();
    var bathrooms = $('#bathrooms').val();
    var shower = $('#shower').val();
    var cell = $('#cell').val();

    var state = 'WA';

    // ex.
    // state => 'WA'

    // https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=JLpq6B36fmBiohHC1v9ac6N43DLpgUvkGSau7puz

    // store the API url that we tested via the docs
    var queryURL = "developer.nps.gov/api/v1/campgrounds?stateCode=" + state + "&limit5&api_key=" + apiKey;

    // use jquery ajax method
    // Asynchronous JavaScript and XML
    // asynchronous operations run outside of the natural flow of javaScript's single threaded nature

    $.ajax({
        // pass in the queryURL
        url: queryURL,
        // execute a GET method to retrieve information
        method: "GET"
    })
        // .then() => executing after the successful completion of our ajax call
        // .then() will execute our callback function
        // store the data that comes back from the api as response
        .then(function (response) {

            var results = response.data;
            console.log('results should show up below');
            console.log(results);
            // input from user will be captured below.


            
        });
});