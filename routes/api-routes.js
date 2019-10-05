console.log('api-routes.js');
var keys = require("../keys");

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
};