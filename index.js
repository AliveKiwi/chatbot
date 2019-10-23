const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const firebase = require('firebase');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require('./routes/dialogFlowRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT);
