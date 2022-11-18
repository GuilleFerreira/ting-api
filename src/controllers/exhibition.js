const { response } = require('express');
const { default: mongoose } = require('mongoose');
const Exhibition = require('../models/exhibition');
const exhibitionSchema = require('../models/exhibition');

//Obtener todos las exhibition
const getExhibition = async(req, res = response) => {

    try{
        const exhibition = await Exhibition.aggregate([
            {$lookup: {from: "movies", localField: "movie", foreignField: "_id", as: "pelicula"}},
            {$lookup: {from: "rooms", localField: "room", foreignField: "_id", as: "room"}},
            //{$project: {_id:0, id: 1, theater:1, pelicula: {name:1, description:1}, room: {seats:1}}}
            {$project: {_id:0, id: 1, seatsunavailable:1}}
            ]);

        if(exhibition){
            return res.status(200).json(exhibition);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Obtener theater por nombre de la pelicula
const getTheaterByMovie = async(req, res = response) => {
    theaters = [];
    try{
        const movies = await Exhibition.aggregate([
            {$lookup: {from: "movies", localField: "movie", foreignField: "_id", as: "movie"}},
            {$match: { "movie.name" : req.params.movie }},
            ]);

        if(movies){
            movies.forEach(movie => {
                if (theaters.includes(movie.theater) == false) {
                    theaters.push(movie.theater);
                }
            });
            return res.status(200).json(theaters);
        }
    }
    catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

}


//Obtener exhibitions por movieName, Theater y Date
const getSchedule = async(req, res = response) => {
    exhibitions = [];
    try{
        const movies = await Exhibition.aggregate([
            {$lookup: {from: "movies", localField: "movie", foreignField: "_id", as: "pelicula"}},
            {$match: {"pelicula.name": req.params.movie, theater: req.params.theater, date: req.params.date}},
            ]);

        if(movies){
            return res.status(200).json(movies);
        }
    } catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

///// ACÁ DEBERIA IR LA FUNCION DE BUILD ROOM, QUE UTILIZA
///// GetAsientosOcupados y GetSala para crear la sala
//Obtener asientos ocupados

const buildRoom = async(req, res = response) => {
    seats = [];
    seatsUnavailable = [];
    seats = await getSala(req.params.id);
    seatsUnavailable = await getAsientosOcupados(req.params.id);
    for (let i = 0; i < seatsUnavailable.length; i++) {
        for (let j = 0; j < seats.length; j++) {
          if (seatsUnavailable[i].row === seats[j].row && seatsUnavailable[i].seat === seats[j].seat) {
            seats[j].available = false;
          }
        }
    }
    console.log(seats);
    return res.status(200).json(seats);
}

// GET SALA
async function getSala(id) {
    const exhibition = await Exhibition.aggregate([
        {$lookup: {from: "rooms", localField: "room", foreignField: "_id", as: "room"}},
        { $unwind: "$room" },
        {$match: {id: id}},
        {$project: {_id:0, room: {seats:1}}}
        ]);
    var asientos = exhibition[0].room.seats;
    return asientos;
}

// GET SALA
async function getAsientosOcupados(id) {
    seatsUnavailable = [];
    const exhibition = await Exhibition.aggregate([
        {$match: {id: id}},
        {$project: {_id:0, seatsunavailable:1}}
        ]);
    var seatsQuantity = exhibition[0].seatsunavailable.length;
    for (let index = 0; index < seatsQuantity; index++) {
        seatsUnavailable.push(exhibition[0].seatsunavailable[index]);
    }
    return seatsUnavailable;
}




////////////////////////////////////////////////7



//Añadir exhibition (( INNECESARIO ))
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
    addExhibition,
    getTheaterByMovie,
    getSchedule,
    buildRoom
}