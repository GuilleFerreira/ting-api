const { response } = require('express');
const Movies = require('../models/movies');

//Obtener todos las movies
const getMovies = async(req, res = response) => {

    try{
        const movie = await Movies.find({});
        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

//Obtener todos las movies
const getMoviesList = async(req, res = response) => {
    moviess = [];
    try{
        const movie = await Movies.find({}).select({"_id": 0,"name": 1});
        
        if(movie){
            movie.forEach(moviee => {
                moviess.push(moviee.name);
            });

            return res.status(200).json(moviess);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

//Buscar imagen wide de movie por nombre
const getMovieImgWide = async(req, res = response) => {

    try{
        const movie = await Movies.find({ name : req.params.name}).select({"_id": 0,"movieImg.urlWide": 1});

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

//Buscar imagen de movie por nombre
const getMovieImg = async(req, res = response) => {

    try{
        const movie = await Movies.find({ name : req.params.name}).select({"_id": 0,"movieImg.url": 1});

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

module.exports = {
    getMovies,
    getMovieImgWide,
    getMovieImg,
    getMoviesList
}