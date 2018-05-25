var express = require('express');
var router = express.Router();



router.post('/getIntent', function(req, res, next) {
    var body = req.body;
    var description = body.description;

    const projectId = 'leboncoin-d6a50'; //https://dialogflow.com/docs/agents#settings
    const sessionId = 'quickstart-session-id';
    const query = 'hello';
    const languageCode = 'en-US';

// Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();

// Define session path

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: description,
                languageCode: languageCode,
            },
        },
    };

    sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
                res.json(result);
            } else {
                console.log(`  No intent matched.`);
            }
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

    // res.json({"status": "ok"});

});

module.exports = router;