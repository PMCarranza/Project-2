'use strict';

var apiKey = require('keys');

$("button").on("click", function () {

    // use jquery $ to select 'this' button html object and use .attr() to capture the value of the data-state name
    var state = WA;

    // ex.
    // state => 'WA'

    // store the API url that we tested via the docs
    var queryURL = "https://developer.nps.gov/api/v1" +
        state + apiKey;

    // use jquery ajax method
    // Asynchronous JavaScript and XML
    // asynchronous operations a ran outside of the natural flow of javaScript's single threaded nature

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

            console.log(response)
            var results = response.data;

            // iterate around the results array
            for (var i = 0; i < results.length; i++) {
                // dynamically create a state div
                var stateDiv = $("<div>");
                // dynamically create <p>
                // use jquery .text() to assign text to the paragraph
                var p = $("<p>").text("Rating: " + results[i].rating);
                // dynamically create <img>
                var stateImage = $("<img>");
                // use jquery .attr() to set the src attribute to the image url from the JSON
                stateImage.attr("src", results[i].images.fixed_height.url);

                // use jquery .append() to append the paragraph tag we created via p
                stateDiv.append(p);
                // use jquery .append() to append the image tag we created via stateImage
                stateDiv.append(stateImage);

                // use jquery to select the html element with id gifs-appear-here and use jquery prepend to render the stateDiv we created above
                $("#gifs-appear-here").prepend(stateDiv);
            }
        });
});


// var unirest = require("unirest");

// var req = unirest("GET", "https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks");

// req.query({
// 	"parkCode": "WA",
// 	"stateCode": "WA",
// 	"limit": "10"
// });

// req.headers({
// 	"x-rapidapi-host": "jonahtaylor-national-park-service-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "ad24a6a3c4msh1ef81c2b087b181p14a38ejsn04757d489e51",
// 	"x-api-key": "JLpq6B36fmBiohHC1v9ac6N43DLpgUvkGSau7puz"
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });
