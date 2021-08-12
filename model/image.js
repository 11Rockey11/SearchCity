const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    _id:{
        type:String,
    },
    img: {
    type: String,
    default: 'download.png',
  }
}, { timestamps: true });

const Image = mongoose.model('image', imageSchema);
module.exports = Image;