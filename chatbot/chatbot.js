'use strict';
const dialogflow = require('dialogflow');
const structjson = require('structjson');
const config = require('../config/keys');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

module.exports = {
  textQuery: async function(text, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    const self = module.exports;
    // Defining my request object for passing to Dialogflow.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // Query to Dialogflow
          text: text,
          // Language Code
          languageCode: languageCode
        }
      },

      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    // The code which is making request to Dialogflow and returns a response.
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    const self = module.exports;
    // Defining my request object for passing to Dialogflow.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: languageCode
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses) {
    return responses;
  }
};
