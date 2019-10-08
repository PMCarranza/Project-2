console.log('api-routes.js');
var keys = require("../keys");
var db = require("../models");
var axios = require("axios");

module.exports = function (app) {

    app.post("/api/queryUrl", function (req, res) {

        console.log('api-routes--> line 9 --> req.body', req.body.q);
        // console.log('api-routes--> res', res);
        var queryStr = req.body.q;

        // keys.catsKey.id was changed to keys.catsKey  10/7 7:30pm

        var queryURL = "https://api.thecatapi.com/v1/breeds/search?q=" + queryStr + "&key=" + keys.catsKey.id;

        // https://api.thecatapi.com/v1/breeds/search?q=siam&key=70fc4cdb-bfdc-45da-b9cc-160890df8427

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
            console.log(result.data[0].name)
        })
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
        })

    });

    app.post("/api/catData", function (req, res) {

        // the next three lines are used instead of the dummy data
        // db.User.create(req.body).then(function (data) {
        //     res.json(data);
        // }).then

        db.Post.create({
            cat: 'Persian',

            comments: 'The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle. It is also known as the "Persian Longhair" in the English-speaking countries. In the Middle East, region they are widely known as "Iranian cat" and in Iran they are known as "Shiraz cat".',
            UserId: 3
        }).then(function (data) {
            res.json(data);
        })

    });

    app.get("/api/catData", function (req, res) {
        db.Post.findAll({})
            .then(function (data) {
                res.json(data)
            })

    });
}