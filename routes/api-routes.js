console.log('api-routes.js');
var keys = require("../keys");
var db = require("../models");
var axios = require("axios");

module.exports = function (app) {

    app.post("/api/queryUrl", function (req, res) {

        console.log('api-routes--> line 9 this is the user input--> req.body-> ', req.body);
        // console.log('api-routes--> res', res);
        var distance = req.body.q;
        // console.log('distance --> ', distance);
        var choice = req.body.c;
        // console.log('choice--> ', choice);
        var lat = req.body.la;
        // console.log('latitude--> ', lat);
        var lon = req.body.lo;
        // console.log('longitude--> ', lon);

        // https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200614708-577f9cb92abafd2233a1a3e67f90ed4f;
        // https://www.hikingproject.com/data/get-campgrounds?lat=40.0274&lon=-105.2519&maxDistance=10&key=200614708-577f9cb92abafd2233a1a3e67f90ed4f
        var queryURL = "https://www.hikingproject.com/data/get-" + choice + "?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distance + "&key=" + keys.parksKey.id;

        console.log('api-routes --> query url --> line 15', queryURL);

        axios.get(queryURL
            // execute a GET method to retrieve information
        ).then(result => {
            // console.log(result.data);
            res.json(result.data);
            // console.log('--------json results-------')
            // console.log(result.data);
            // console.log('=============json result above==========');

        }).catch(error => {
            console.log(error);
        })
    });

    app.post("/api/user", function (req, res) {
        db.User.create(req.body)
            .then(function (data) {
                res.json(data);
            }).catch(function (data) {
                console.log(data);
            });
    });

    app.post("/api/park", function (req, res) {
        db.Park.create(req.body)
            .then(function (data) {
                res.json(data);
            }).catch(function (data) {
                console.log(data);
            });
    });

    app.post("/api/comment", function (req, res) {
        /**
         {
            comment: '',
            userId: 1,
            parkId: 1
         }
         */

        db.Post.create(req.body)
            .then(function (data) {
                res.json(data);
            }).catch(function (err) {
                console.log(err)
                res.json(err);
            });
    });

    app.get("/api/parks", function (req, res) {
        db.Park.findAll({
            // TODO: include the park model to create a join
            where: {
                id: req.params.id
            }
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
            include: [
                { Park: comment }
            ]
        })
            .then(function (data) {
                res.json(data)
            });
    });

    app.post("/api/posts", function (req, res) {
        // TODO: Research an example of findOrCreate
        db.Park.findOrCreate({
            where: { Park: name }
        }).then(function (data) {

            // TODO: db.Post.create() and pass in the parkId to fulfill the association
            db.Post.create(data).then(function (data) {
                res.json(data)
            });
            //         res.json(data)
        });
    });
};