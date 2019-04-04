const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema for locating the co-ordinates
// We will use the geoJSON - with 2dsphere type of co-ordinates

const LocationSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],  // [Number array] because we need to store [longitude, latitude]
    index: '2dsphere' // index 2dsphere make sure the actual distance takes the circumference of earth.
  }
})

// Create Avenger schema and models.
const AvengerSchema = new Schema({
  name: {
      type: String,
      required: [true, 'This is a required field']
    },
  avenger: { type: String },
  dead: { type: Boolean, default: false },

  // This geometry is a property of geoJson which helps to store the co-ordinates[longitude, latitude]
  // Learn about geoJSON . Link --> http://geojson.org/
  // See how geoJSON data looks like --> http://geojson.io/
  geometry: LocationSchema

})

const Avenger = mongoose.model('avenger', AvengerSchema);

module.exports = Avenger;
