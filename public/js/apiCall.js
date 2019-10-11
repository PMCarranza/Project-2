// 'use strict';
console.log('apiCall.js');

$("#get-distance").on("click", function () {
    event.preventDefault();


    var howFar = $('#how-far').val().trim();
    console.log('distance from Seattle --> ', howFar);

    var query = howFar;

    console.log('apiCall--> line 11--> user query ', query);

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
            console.log('==========RESULT=========');
            console.log(result.trails);
            console.log('^^^^^^^^^RESULT^^^^^^^');
            // var hikeData = result.breeds[0].alt_names;
            // var hikeImgUrl = result.url
            // var hikeDescription = result.breeds[0].description;
            // var hikeOrigin = result.breeds[0].origin;
            // console.log('############## hike DATA############');
            // console.log(hikeData);
            // console.log(hikeImgUrl);
            // console.log(hikeDescription);
            // console.log(hikeOrigin);
            // console.log('^^^^^^^^^^^hike DATA^^^^^^^^');
            // console.log('hikeData should show up below');
            // //answer from api will be shown below.
            // var hikeName = hikeData;
            // console.log('hikeName--> ', hikeName);
            // //var showhikeName=$('<p id= "hike-name"></p>');
            // $('#info-here').append(hikeName);
            // $('#park-img').append(hikeImgUrl);
            // $('#info-here').append(hikeDescription);
            // $('#info-here').append(hikeOrigin);
            //console.log('showhikeName--> ', showhikeName);
        });

});