'use strict';

var apiKey = require('keys');

$("button").on("click", function () {

    // use jquery $ to select 'this' button html object and use .attr() to capture the value of the data-state name
    var state = 'WA';

    // ex.
    // state => 'WA'

    https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=JLpq6B36fmBiohHC1v9ac6N43DLpgUvkGSau7puz

    // store the API url that we tested via the docs
    var queryURL = "developer.nps.gov/api/v1/campgrounds?stateCode=" +
        state + "&limit5&api_key=" + apiKey;

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