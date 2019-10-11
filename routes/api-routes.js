console.log('api-routes.js');
var keys = require("../keys");
var db = require("../models");
var axios = require("axios");

module.exports = function (app) {

    app.post("/api/queryUrl", function (req, res) {

        console.log('api-routes--> line 9 this is the user input--> req.body-> ', req.body.q);
        // console.log('api-routes--> res', res);
        var queryStr = req.body.q;

        // keys.parksKey.id was changed to keys.parksKey  10/7 7:30pm
        // var queryURL = "https://api.theparkapi.com/v1/images/search?breeds/search?q=" + queryStr + "&key=" + keys.parksKey.id;
        var queryURL = "https://www.hikingproject.com/data/get-trails?lat=47.6062&lon=-122.3321&" + queryStr + "&key=" + keys.parksKey.id;

        // https://api.theparkapi.com/v1/breeds/search?q=siam&key=70fc4cdb-bfdc-45da-b9cc-160890df8427

        console.log('api-routes --> query url --> line 15', queryURL);

        // app.get(queryURL, function (req2, res2) {
        //     console.log('api-routes--> res2', res2);
        //     console.log('api-routes --> req2', req2);
        //     req2.json('api-routes --> res2', res2);
        //     console.log('req2 --> ', req2);
        // })

        axios.get(queryURL
            // execute a GET method to retrieve information
        ).then(result => {

            console.log('result data trails[0] name --> ', result.data.trails[0].name);
            for (var i = 0; i < result.data.trails.length; i++) {
                console.log('i --> ', i);
                // console.log('=============RESULT============');
                // console.log(result.data.trails[i].name);
                // console.log('^^^^^^^^^^^^RESULT^^^^^^^^^^^');
                console.log('result data trails[i] name', result.data.trails[i].name);
                console.log('result data trails[i] type', result.data.trails[i].type);
                console.log('result data trails[i] summary', result.data.trails[i].summary);
                console.log('result data trails[i] difficulty', result.data.trails[i].difficulty);
                console.log('result data trails[i] location', result.data.trails[i].location);
                console.log('result data trails[i] url', result.data.trails[i].url);
                console.log('result data trails[i] imgSmallMed', result.data.trails[i].imgSmallMed);
                console.log('result data trails[i] length', result.data.trails[i].length);

            };

        });
    });

    app.post("/api/addData", function (req, res) {


        // the next three lines are used instead of the dummy data
        // db.User.create(req.body).then(function (data) {
        //     res.json(data);
        // }).then

        db.User.create({
            name: "Joy McCullough",
            email: 'joy@aol.com',
            password: 'l3k4h5v6'
        }).then(function (data) {
            res.json(data);
        });

    });

    app.post("/api/parkData", function (req, res) {

        // the next three lines are used instead of the dummy data
        // db.User.create(req.body).then(function (data) {
        //     res.json(data);
        // }).then

        db.Post.create({
            park: 'Carkeek Park',
            comments: 'Carkeek Park is a 216 acres park located in the Broadview neighborhood of Seattle, Washington. The park contains Piper Orchard, Pipers Creek, play and picnic areas, picnic shelters, and hiking trails. A pedestrian bridge across the main lines of the BNSF Railway connects to the Carkeek Park sand beach on Puget Sound.',
            UserId: 1
        }).then(function (data) {
            res.json(data);
        }).park(function (data) {
            console.log(data)
        })

    });

    app.get("/api/parkData", function (req, res) {
        db.Post.findAll({})
            .then(function (data) {
                res.json(data)
            });

    });
};