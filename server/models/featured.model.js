const mongoose = require('mongoose');

const FeaturedSchema = new mongoose.Schema({
    title: { type: String },
    type: {type: String },
    duration: { type: String },
    year: { type: String },
    genre: { type: String },
    imageName: { type: String },
    smallImage: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Featured', FeaturedSchema);