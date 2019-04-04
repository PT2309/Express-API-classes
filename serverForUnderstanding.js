const express = require('express');

/*
  Setting up app for express.
  Now our app can listen to requests with (GET, POST, DELETE, PUT)
      Ex: app.get('/', function(req, res){
        res.end('whatever your response is')  or res.send(some data inJSON or a webpage) or res.json(some JSON data)
    }) --- this is a get request.
          1st argument -- It is going to be the route/Url which is going to make the request.
          2nd argument -- It is the callback function which on recieving the request will send back the data.
                function(req, res)
                  -- req(request) will have the methods from the request object from the client
                  -- res(response) will be the response which the server will send back. It can be data or view.
*/
const app = express();

app.get('/', (req, res) => {
  console.log('GET request is made from the browser!!'); // This is logging the message but not sending anything back.
  res.send({ msg: 'Hi'}); // This method ends the get request and sends back whatever is passed in end.

})

/*
In many environments (e.g. Heroku), and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.
So process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
So you pass that to app.listen and that makes your server be able to accept a parameter from the environment
what port to listen on.
If you pass 3000 hard-coded to app.listen(), you're always listening on port 3000,
which might be just for you, or not,
depending on your requirements and the requirements of the environment in which you're running your server.
*/
app.listen(process.env.port || 3001, () => {
  console.log('Listening to port number 3001');
})
