// 'use strict';
console.log('apiCall.js');

$("#get-cat").on("click", function () {
    event.preventDefault();


    var catBreed = $('#cat-breed').val().trim();
    console.log(catBreed);

    var query = catBreed;

    console.log('apiCall--> line 30--> query ', query);

    // use jquery ajax method
    // Asynchronous JavaScript and XML
    // asynchronous operations run outside of the natural flow of javaScript's single threaded nature

    $.ajax({
        // pass in the queryURL
        url: "/api/queryUrl",
        data: { q: query },
        // execute a POST method to retrieve information
        method: "POST"
    })
        // .then() => executing after the successful completion of our ajax call
        // .then() will execute our callback function
        // store the data that comes back from the api as result
        .then(function (result) {
            // console.log(result);
            var results = result;
            console.log('results should show up below');
            // answer from api will be shown below.
            console.log(results.name);
        });

    var catName = $('<p id= "cat-name"></p>');
    console.log('cat name is --> ', catName);

    var catTemperament = $('<p id= "cat-temp"></p>');

    var catOrigin = $('<p id= "cat-origin"></p>');

    var catDescription = $('<p id= "cat-desc"></p>');


    $('#cats-here').append(catName, catTemperament, catOrigin, catDescription);



});