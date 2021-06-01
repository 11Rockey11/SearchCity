const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  majoroccupation: {
    type: String,
    required: true
  },
  famousfood: {
    type: String,
    required: true
  },
  famousplaces: {
    type: String,
    required: true
  },
  culture: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, { timestamps: true });

const City = mongoose.model('place', citySchema);
module.exports = City;