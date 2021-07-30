const Film = require('../models/film.model');

module.exports.index = (request, response) => {
response.json({
    message: "Hello World"
});
}

module.exports.createFilm = (request, response) => {
    const { title, type, duration, year, genre, imageName, description } = request.body;
    Film.create({ title, type, duration, year, genre, imageName, description })
        .then(person => response.json(person))
        .catch(err => response.json(err));
} 

module.exports.getAllFilms = (request, response) => {
  Film.find({})
      .then(films => response.json(films))
      .catch(err => response.json(err))
}

module.exports.getFilm = (request, response) => {
    Film.findOne({_id:request.params.id})
        .then(Film => response.json(Film))
        .catch(err => response.json(err))
}

module.exports.updateFilm = (request, response) => {
    Film.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedFilm => response.json(updatedFilm))
        .catch(err => response.json(err))
}

module.exports.deleteFilm = (request, response) => {
  Film.deleteOne({ _id: request.params.id })
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => response.json(err))
}

module.exports.getGenreFilms = (request, response) => {
    Film.find({genre:request.params.genre})
        .then(films => response.json(films))
        .catch(err => response.json(err))
}

module.exports.getTrendingFilms = (request, response) => {
    Film.find({year:2021}).limit(12)
        .then(films => response.json(films))
        .catch(err => response.json(err))
}

module.exports.getWatchAgainFilms = (request, response) => {
    Film.find({}).limit(12)
        .then(films => response.json(films))
        .catch(err => response.json(err))
}

module.exports.getAllMovies = (request, response) => {
    Film.find({type:"movie"})
        .then(films => response.json(films))
        .catch(err => response.json(err))
}

module.exports.getAllSeries = (request, response) => {
    Film.find({type:"series"})
        .then(films => response.json(films))
        .catch(err => response.json(err))
}

module.exports.getAllNew = (request, response) => {
    Film.find({$or: [{year: '2021'},{year: '2020'}]})
        .then(films => response.json(films))
        .catch(err => response.json(err))
}

module.exports.getKidsFilms = (request, response) => {
    Film.find({$or: [{genre: 'Children'},{genre: 'Anime'}]})
        .then(films => response.json(films))
        .catch(err => response.json(err))
}