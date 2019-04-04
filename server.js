const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// We connect to our database
mongoose.connect('mongodb://localhost/teamavenger', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());

// .use() Mounts the specified middleware function or functions at the specified path:
// the middleware function is executed when the base of the requested path matches path.

app.use('/api', routes); // We want our api to be of form /api/avengers so we pass the /api and the routes we created in routes folder

// Error handling middleware
app.use(function(err, req, res, next){
  // This function will send back the object of error once we have encountered the error.
  // We also need to make sure that we set the status of the response to relevant code because 200 is for OK
  res.status(422).send({error: err.message});
})


app.listen(process.env.port || 3001, () => {
  console.log('Listening to port number 3001');
})
