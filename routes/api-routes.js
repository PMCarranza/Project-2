console.log('api-routes.js');
var keys = require("../keys");
var db = require("../models");
var axios = require("axios");

module.exports = function (app) {

    app.post("/api/queryUrl", function (req, res) {

        console.log('api-routes--> line 9 this is the user input--> req.body-> ', req.body);
        // console.log('api-routes--> res', res);
        var distance = req.body.q;
        console.log('distance --> ', distance);
        var choice = req.body.c;
        console.log('choice--> ', choice);
        var lat = req.body.la;
        console.log('latitude--> ', lat);
        var lon = req.body.lo;
        console.log('longitude--> ', lon);

        // https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200614708-577f9cb92abafd2233a1a3e67f90ed4f;
        // https://www.hikingproject.com/data/get-campgrounds?lat=40.0274&lon=-105.2519&maxDistance=10&key=200614708-577f9cb92abafd2233a1a3e67f90ed4f
        var queryURL = "https://www.hikingproject.com/data/get-" + choice + "?lat="+lat+"&lon="+lon+"&maxDistance=" + distance + "&key=" + keys.parksKey.id;

        console.log('api-routes --> query url --> line 15', queryURL);

        axios.get(queryURL
            // execute a GET method to retrieve information
        ).then(result => {

            // console.log('result data trails[0] name --> ', result.data.trails[0].name);
            // for (var i = 0; i < result.data.trails.length; i++) {
            // console.log('i --> ', i);
            // console.log('=============RESULT============');
            // console.log('result data trails[i] name->', result.data.trails[i].name);
            // console.log('result data trails[i] type->', result.data.trails[i].type);
            // console.log('result data trails[i] summary->', result.data.trails[i].summary);
            // console.log('result data trails[i] difficulty->', result.data.trails[i].difficulty);
            // console.log('result data trails[i] location->', result.data.trails[i].location);
            // console.log('result data trails[i] url->', result.data.trails[i].url);
            // console.log('result data trails[i] imgSmallMed->', result.data.trails[i].imgSmallMed);
            // console.log('result data trails[i] length->', result.data.trails[i].length);
            // console.log('^^^^^^^^^^^^RESULT^^^^^^^^^^^');
            res.json(result.data.choice);
            console.log('--------json results-------')
            console.log(result.data);
            // console.log(result.data[i].trails[i].name);
            console.log('=============json result above==========');
            // };

        });
    });

    app.post("/api/addData", function (req, res) {


        // the next three lines are used instead of the dummy data
        // db.User.create(req.body).then(function (data) {
        //     res.json(data);
        // }).then

        db.User.create({
            name: "Marvin Vega",
            email: 'marvin@hotmail.com',
            password: 'a1b2c3d4'
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
            park: 'Green Lake',
            comments: '2.8 mile walk/jog trail, plenty of green area, sports fields, tennis courts, sandy beach, swimming spots with lifegurads, benches, wadding pool about 10 inches deep open june - august, coffee shops, ice cream shop and restaurants close by.',
            UserId: 1
        }).then(function (data) {
            res.json(data);
        }).catch(function (data) {
            console.log(data)
        })

    });

    app.get("/api/parks", function (req, res) {
        db.Park.findAll({
            // TODO: include the park model to create a join
        })
            .then(function (data) {
                res.json(data)
            });
    });

    app.get("/api/parks/:id", function (req, res) {
        db.Park.findOne({
            where: {
                id: req.params.id
            },
            // TODO: include the park model to create a join
        })
            .then(function (data) {
                res.json(data)
            });
    });

    app.post("/api/posts", function (req, res) {
        // TODO: Research an example of findOrCreate
        // db.Park.findOrCreate({})
        //     .then(function (data) {

        // TODO: db.Post.create() and pass in the ParkId to fulfill the association

        //         res.json(data)
        //     });
    });


};