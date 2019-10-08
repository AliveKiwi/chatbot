'use strict';
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('structjson');
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

module.exports = {
  textQuery: async function(text, parameters = {}) {
    const self = module.exports;
    // Defining my request object for passing to Dialogflow.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // Query to Dialogflow
          text: text,
          // Language Code
          languageCode: config.dialogFlowSessionLanguageCode
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

  eventQuery: async function(text, parameters = {}) {
    const self = module.exports;
    // Defining my request object for passing to Dialogflow.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.dialogFlowSessionLanguageCode
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
