const chatbot = require('../chatbot/chatbot');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ response: 'Hello, How may I assist you?' });
  });

  app.post('/api/df_text_query', async (req, res) => {
    // Calling the function defined in chatbot.js file.
    const responses = await chatbot.textQuery(
      req.body.text,
      req.body.parameters
    );
    console.log(responses);
    const result = responses[0].queryResult;
    res.send(result.fulfillmentText);
  });

  app.post('/api/df_event_query', async (req, res) => {
    // Calling the function defined in chatbot.js file.
    const responses = await chatbot.eventQuery(
      req.body.event,
      req.body.parameters
    );
    console.log(responses);
    const result = responses[0].queryResult;
    res.send(result.fulfillmentText);
  });
};
