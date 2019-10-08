console.log('api-routes.js');
var keys = require("../keys");
var db = require("../models");

module.exports = function (app) {

    app.post("/api/queryUrl", function (req, res) {

        console.log('api-routes--> line 9 --> req.body', req.body.query);
        // console.log('api-routes--> res', res);
        var queryStr = JSON.stringify(req.body.query);

        // keys.catsKey.id was changed to keys.catsKey  10/7 7:30pm

        var queryURL = "https://api.thecatapi.com/v1/breeds/search?q=" + queryStr + "&key=" + keys.catsKey;

        // https://api.thecatapi.com/v1/breeds/search?q=siam&key=70fc4cdb-bfdc-45da-b9cc-160890df8427

        console.log('api-routes --> query url --> line 15', queryURL);


        app.get(queryURL, function (req2, res2) {
            console.log('api-routes--> res2', res2);
            console.log('api-routes --> req2', req2);
            req2.json('api-routes --> res2', res2);
            console.log('req2 --> ', req2);
        })
    });

    app.post("/api/addData", function (req, res) {


        // the next three lines are used instead of the dummy data
        // db.User.create(req.body).then(function (data) {
        //     res.json(data);
        // }).then

        db.User.create({
            name: "Daniel Gonzalez",
            email: 'dgonzalez@yahoo.com',
            password: 'q5l4s5h7rt'
        }).then(function (data) {
            res.json(data);
        })

    });

    app.post("/api/partData", function (req, res) {

        // the next three lines are used instead of the dummy data
        // db.User.create(req.body).then(function (data) {
        //     res.json(data);
        // }).then

        db.Post.create({
            cat: 'Siamese',
            comments: 'The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the Wichianmat landrace, one of several varieties of cat native to Thailand, the Siamese became one of the most popular breeds in Europe and North America in the 19th century.',
            UserId: 1
        }).then(function (data) {
            res.json(data);
        })

    });
};