var dialogflow = require("dialogflow");


module.exports = authentication = async function(msgToSend) {
    const projectId = "chatbot-59660";
    const sessionId = "SessionSelim";
    const languageCode = "en";
    const authenticationFile = "./chatBot.json"

    const sessionClient = new dialogflow.SessionsClient({
        projectId,
        keyFilename: authenticationFile
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msgToSend,
                languageCode: languageCode
            }
        }
    };

    try {
        let response = await sessionClient.detectIntent(request);
        return response;
    } catch (err) {
        return err;
    }
};
