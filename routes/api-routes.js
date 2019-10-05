console.log('api-routes.js');
var keys = require("../keys");
var db = require("../models");

module.exports = function (app) {

    app.post("/api/queryUrl", function (req, res) {

        console.log('api-routes--> req.body', req.body.query);
        // console.log('api-routes--> res', res);
        var queryStr = JSON.stringify(req.body.query);

        var queryURL = "developer.nps.gov/api/v1/campgrounds?stateCode=WA &limit5&api_key=" + keys.npsKey.id + "&q=" + queryStr;

        console.log(queryURL);


        app.get(queryURL, function (req2, res2) {
            console.log('api-routes--> res2', res2);
            console.log('api-routes --> req2', req2);
            req2.json('api-routes --> res2', res2);
        })
    });

    app.post("/api/addData", function (req, res) {
        db.User.create({
            name: "Daniel Gonzalez",
            email: 'dgonzalez@yahoo.com',
            password: 'q5l4s5h7rt'
        }).then(function (data) {
            res.json(data);
        })

    });

    app.post("/api/partData", function (req, res) {
        db.Post.create({
            park: 'Green Lake',
            comments: '2.8 mile walk/jog trail, plenty of green area, sports fields, tennis courts, sandy beach, swimming spots with lifegurads, benches, wadding pool about 10 inches deep open june - august, coffee shops, ice cream shop and restaurants close by.',
            UserId: 7
        }).then(function (data) {
            res.json(data);
        })

    });
};