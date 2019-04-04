const express = require('express');
const Avenger = require('../models/avenger');

// We will use the express Router() method.

const routes = express.Router(); // We are mounting our Router() in a variable routes

// We want to get list of avengers from db
routes.get('/avengers', (req, res, next) => {
  // res.send({type: 'GET'})
  /*
    the route /api/avengers with a get request will fetch us all the avengers in the db.
  */
  // Avenger.find({}).then(function(avengers){res.send(avengers)})


  /*
    the aggregate() is mongoDb functionality to perform aggregation
    aggregate().near() --> this will return the distance in m from the given point.
    parameters we pass are:
            near: { type and coordinates},
            maxDistance: the maximum distance we want to calculate the distance to.
            spherical: taking into consideration the circumference of the earth.
            distanceField: returns the distance calculated.
    Read about aggregate().near() --> https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/
  */
  Avenger.aggregate().near(
     {
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)]
      },
      maxDistance: 1000000,
      spherical: true,
      distanceField: "dis"
    }
  ).then((avengers) => {
    res.send(avengers)
  })
})

// We want to save a new avenger to the db
routes.post('/avengers', (req, res, next) => {
  console.log('req body object', req.body);
  /*
    We now use the Avenger model and in this post request we save the data to the collections.
    We use create an instance of the model and pass the request body (req.body) which has the data.
    The code to save will be:
                var newAvenger = new Avengers(req.body);
                newAvenger.save();

    But instead of creating an instance and then saving it, we can use the .create() method which do the same thing.
  */
  Avenger.create(req.body).then((avenger) =>{
    /* now we have the promise object so we want to send back the data that was saved.
      res.send({
        type: 'POST',
        name: req.body.name,
        avenger: req.body.avenger
    })
    */
    res.send(avenger);
  })
  /*
    If there was some error on saving the data we want to catch that error and send back the response.
    we can catch the error like:
          .catch(function(error) => { res.send(error)});
    but we make use of a middleware that will be defined by us. so the code will move to that middleware
    on encountering the error
  */
  .catch(next);


})

// We want to update an avenger in the db
// We specify the :id as the route params which comes in the reques object.
/* id could be anything, so the request URL might look like:
          www.avengers.com/api/avengers/23 -- 23 is the id
*/
routes.put('/avengers/:id', (req, res, next) => {
  // console.log(req.body.toString() + " : " + req.params.id);
  Avenger.findByIdAndUpdate({_id : req.params.id}, req.body, { new: true }).then((avenger) => {
    console.log('Updated the avenger', avenger);
    /*
      If we send back the avenger here in the response, it will send the pre updated avenge with old values
      Therefore we have to find the particular id again and then send that back in response
    */
      res.send(avenger)
  })
})

/*
   We want to delete an avenger in the db
   We specify :id here also to tell which id we want to delete
   We can access this id(route parameter) from the request object using: req.params.id
   The method to delete : findByIdAndDelete({_id: req.params.id})
 */

routes.delete('/avengers/:id', (req, res, next) => {
  Avenger.findByIdAndDelete({_id : req.params.id}).then((avenger) => {
    console.log('Deleted the avenger', avenger.name);
    res.send(avenger)
  })
})

module.exports = routes;
