var express = require('express');
var router = express.Router();
var connectBot = require('./connectBot')

router.get('/', function(req, res, next) {
    const msg = req.body.msg
    connectBot(msg)
        .then(function(response) {
            switch (response[0].queryResult.intent.displayName) {
                case "Welcome":
                    res.send(response[0].queryResult.fulfillmentText);
                case "subscribe":
                    res.send(response[0].queryResult.fulfillmentText);
                case "available courses":
                    res.send("db response");
                case "next training sessions":
                    res.send("db response");
                case "running course":
                    res.send(response[0].queryResult.fulfillmentText);
                case "profile":
                    res.send(response[0].queryResult.fulfillmentText);
                case "contact":
                    res.send(response[0].queryResult.fulfillmentText);
                case "exams and tests":
                    res.send(response[0].queryResult.fulfillmentText);
                case "quiz":
                    res.send(response[0].queryResult.fulfillmentText);
                case "BYE":
                    res.send(response[0].queryResult.fulfillmentText);
            }
        })

});

module.exports = router;
