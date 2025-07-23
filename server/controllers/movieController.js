const Movie = require("../model/movieModel");

const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();

        res.send({
            success: true,
            message: "New movie has been added!"
        })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find({});
        res.send({
            success: true,
            message: "All movies have been fetched!",
            data: allMovies,
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.movieId, req.body);
        res.send({
            success: true,
            message: "Movie Updated!"
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.movieId);
        res.send({
            success: true,
            message: "Movie Deleted!",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        res.send({
            success: true,
            message: "Movie fetched successfully",
            data: movie,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById }