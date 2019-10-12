// 'use strict';
console.log('apiCall.js');


$("#get-distance").on("click", function () {
    event.preventDefault();


    var howFar = $('#how-far').val().trim();
    console.log('distance from Seattle --> ' + howFar);

    var query = howFar;

    console.log('apiCall--> line 11--> user query--> ', query);

    // use jquery ajax method
    // Asynchronous JavaScript and XML
    // asynchronous operations run outside of the natural flow of javaScript's single threaded nature

    $.ajax({
        // pass in the queryURL
        url: '/api/queryUrl',
        data: { q: query },
        // execute a POST method to retrieve information
        method: "POST"
    })
        // .then() => executing after the successful completion of our ajax call
        // .then() will execute our callback function
        // store the data that comes back from the api as result
        .then(function (result) {
            for (var i = 0; i < result.length; i++) {
                console.log('==========RESULT=========');
                console.log(result.trails[i].name[i]);
                console.log('^^^^^^^^^RESULT^^^^^^^');
            };

            var hikeName = result.trails[0].name;
            var hikeType = result.trails[0].type;
            var hikeImgUrl = result.trails[0].imgSmallMed;
            var hikeSummary = result.trails[0].summary;

            // var hikeOrigin = result.trails[0].origin;
            console.log('############## hike DATA ############');
            console.log(hikeName);
            console.log(hikeType);
            console.log(hikeImgUrl);
            console.log(hikeSummary);
            console.log('^^^^^^^^^^^hike DATA^^^^^^^^');
            // console.log('hikeData should show up below');
            // //answer from api will be shown below.
            // console.log('hikeName--> ', hikeName);
            // //var showhikeName=$('<p id= "hike-name"></p>');
            $('#info-here').append(hikeName);
            $('#info-here').append(hikeType);
            $('#info-here').append(hikeSummary);
            $('#park-img').append(hikeImgUrl);
            // $('#info-here').append(hikeOrigin);
            //console.log('showhikeName--> ', showhikeName);
        });

});