// 'use strict';
console.log('apiCall.js');

// var apiKey = require('keys.js');

// try two
// var query = [];

// try one
var checkboxSelector = $("input[type='checkbox']");

$("#get-info").on("click", function () {
    event.preventDefault();

    // $('id:checked') is used to extract the value from the checked box in index.html

    var camp = $('#camping:checked').val();
    // console.log(camp);
    var access = $('#access:checked').val();
    var rv = $('#rv:checked').val();
    var directions = $('#directions:checked').val();
    var water = $('#water:checked').val();
    var firewood = $('#firewood:checked').val();
    var bathrooms = $('#bathrooms:checked').val();
    var shower = $('#shower:checked').val();
    var cell = $('#cell:checked').val();

    // try one
    // var query = checkboxSelector.filter(":checked")//.val();
    var query = $("input[type=checkbox]:checked").map(function () {
        return this.value;
    }).get().join("%20");
    console.log('apiCall--> line 30--> query', query);

            // use jquery ajax method
            // Asynchronous JavaScript and XML
            // asynchronous operations run outside of the natural flow of javaScript's single threaded nature

            $.ajax({
                // pass in the queryURL
                url: "/api/queryUrl",
                data: {query},
                // execute a GET method to retrieve information
                method: "POST"
            })
                // .then() => executing after the successful completion of our ajax call
                // .then() will execute our callback function
                // store the data that comes back from the api as response
                .then(function (response) {
                    console.log('apiCall--> response', response);

                    var results = response.data;
                    console.log('results should show up below');
                    console.log('apiCall--> results', results);
                    // input from user will be captured below.



                });
        });