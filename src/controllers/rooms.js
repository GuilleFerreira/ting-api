const { response } = require('express');
const Rooms = require('../models/rooms');
const roomsSchema = require('../models/rooms');

//Obtener todos los rooms
const getRooms = async(req, res = response) => {

    try{
        const room = await Rooms.find({});

        if(room){
            return res.status(200).json(room);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Añadir rooms
const addRoom = async(req, res = response) => {

    const roomNew = roomsSchema(req.body);

    try{
        const room = await Rooms.findOne({ id : roomNew.id});

        if(room){
            return res.status(400).send('Ya existe una imagen con este id');
        }

        await roomNew.save();

        return res.status(201).json({
            ok: true,
            uid: roomNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Buscar room por id
const getRoomID = async(req, res = response) => {

    try{
        const room = await Rooms.find({ id : req.params.id});

        if(room){
            return res.status(200).json(room);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Actualizar usuario por username
const putRoomID = async(req, res = response) => {
    const { id } = req.params;
    const { seats } = req.body;

    try{
        const room = await Rooms.updateOne({ id: id }, { $set: { seats: seats }})

        if(room){
            return res.status(200).json(room);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Eliminar usuario por username
const removeRoomID = async(req, res = response) => {

    try{
        const room = await Rooms.deleteOne({id : req.params.id});

        if(room){
            return res.status(200).json(room);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


module.exports = {
    getRooms,
    addRoom,
    getRoomID,
    putRoomID,
    removeRoomID
}