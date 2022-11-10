const { response } = require('express');
const Exhibition = require('../models/exhibition');
const exhibitionSchema = require('../models/exhibition');

//Obtener todos las exhibition
const getExhibition = async(req, res = response) => {

    try{
        const exhibition = await Exhibition.aggregate([
            {$lookup: {from: "movies", localField: "movie", foreignField: "_id", as: "pelicula"}},
            {$lookup: {from: "rooms", localField: "room", foreignField: "_id", as: "room"}},
            {$project: {theater:1, pelicula: {name:1, description:1}, room: {id:1}}}
            ]);

        if(exhibition){
            return res.status(200).json(exhibition);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Añadir exhibition
const addExhibition = async(req, res = response) => {

    const exhibitionNew = exhibitionSchema(req.body);

    try{
        const exhibition = await Exhibition.findOne({ id : exhibitionNew.id});

        if(exhibition){
            return res.status(400).send('Ya existe una imagen con este id');
        }

        await exhibitionNew.save();

        return res.status(201).json({
            ok: true,
            uid: exhibitionNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

module.exports = {
    getExhibition,
    addExhibition
}