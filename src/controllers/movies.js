const { response } = require('express');
const Movies = require('../models/movies');
const moviesSchema = require('../models/movies');
const verifyToken = require('../controllers/auth');

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

//Obtener movie por nombre
const getAllMoviesNames = async(req, res = response) => {
    try{
        const movies = await Movies.distinct("name");
        console.log(movies);
        if(movies){
            return res.status(200).json(movies);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


//Obtener movie por nombre
const getMovieName = async(req, res = response) => {

    try{
        const movie = await Movies.find({ name : req.params.name});

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Buscar imagen wide de movie por nombre
const getMovieImgWide = async(req, res = response) => {

    try{
        const movie = await Movies.find({ name : req.params.name}).select({"_id": 0,"postImg.urlWide": 1});

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
        const movie = await Movies.find({ name : req.params.name}).select({"_id": 0,"postImg.url": 1});

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

/////////////////////////////////////////////////////////////////
//            COSAS INNECESARIAS, BORRAR LUEGO                 //
/////////////////////////////////////////////////////////////////

//Añadir movie
const addMovie = async(req, res = response) => {

    const movieNew = moviesSchema(req.body);

    try{
        const movie = await Movies.findOne({ id : movieNew.id});

        if(movie){
            return res.status(400).send('Ya existe una imagen con este id');
        }

        await movieNew.save();

        return res.status(201).json({
            ok: true,
            uid: movieNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Buscar movie por id
const getMovieID = async(req, res = response) => {

    try{
        const movie = await Movies.find({ id : req.params.id});

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Actualizar movie por name
const putMovieName = async(req, res = response) => {
    const { name } = req.params;
    const { postImg, description, tags } = req.body;

    try{
        const movie = await Movies.updateOne({ name: name }, { $set: { postImg: postImg, description: description, tags: tags }})

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Eliminar movie por name
const removeMovieName = async(req, res = response) => {

    try{
        const movie = await Movies.deleteOne({name : req.params.name});

        if(movie){
            return res.status(200).json(movie);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

////////////////////////////////////////////////////////
//            FIN COSAS INNECESARIAS                  //
////////////////////////////////////////////////////////

module.exports = {
    getMovies,
    getAllMoviesNames,
    addMovie,
    getMovieID,
    getMovieName,
    getMovieImgWide,
    getMovieImg,
    putMovieName,
    removeMovieName
}