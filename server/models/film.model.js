const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    title: { type: String },
    type: {type: String },
    duration: { type: String },
    year: { type: String },
    genre: { type: String },
    description: { type: String },
    imageName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Film', FilmSchema);