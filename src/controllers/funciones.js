const { response } = require('express');
const Funciones = require('../models/funciones');
const funcionesSchema = require('../models/funciones');

//Obtener todos las funciones
const getFunciones = async(req, res = response) => {

    try{
        const funcion = await Funciones.aggregate([
            {$lookup: {from: "movies", localField: "movie", foreignField: "_id", as: "pelicula"}},
            {$lookup: {from: "rooms", localField: "room", foreignField: "_id", as: "room"}},
            {$project: {theater:1, pelicula: {name:1, description:1}, room: {room_id:1}}}
            ]);

        if(funcion){
            return res.status(200).json(funcion);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Añadir funcion
const addFuncion = async(req, res = response) => {

    const funcionNew = funcionesSchema(req.body);

    try{
        const funcion = await Funciones.findOne({ id : funcionNew.id});

        if(funcion){
            return res.status(400).send('Ya existe una imagen con este id');
        }

        await funcionNew.save();

        return res.status(201).json({
            ok: true,
            uid: funcionNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

module.exports = {
    getFunciones,
    addFuncion
}