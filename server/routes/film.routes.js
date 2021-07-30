const FilmController = require('../controllers/film.controller');
const FeaturedController = require('../controllers/featured.controller');
const User = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {
    app.get('/api', FilmController.index);
    app.get('/api/status', authenticate);
    app.post("/api/register", User.register);
    app.post("/api/login", User.login);
    app.get("/api/logout", User.logout);
    app.get('/api/films/trending', FilmController.getTrendingFilms);
    app.get('/api/films/watch-again', FilmController.getWatchAgainFilms);
    app.get('/api/films/movies', FilmController.getAllMovies);
    app.get('/api/films/series', FilmController.getAllSeries);
    app.get('/api/films/new', FilmController.getAllNew);
    app.get('/api/films/kids', FilmController.getKidsFilms);
    app.get('/api/films/:genre', FilmController.getGenreFilms);
    app.get('/api/featured/:type', FeaturedController.getTypeFeatured);
}
