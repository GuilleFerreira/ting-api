const { response } = require('express');
const Extras = require('../models/extras');
const extrasSchema = require('../models/extras');

//Obtener todos los extras
const getExtras = async(req, res = response) => {

    try{
        const extra = await Extras.find({}).select({"_id": 0,"id" : 1,"name": 1, "price": 1, "img":1});

        if(extra){
            return res.status(200).json(extra);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

//Añadir extras ((TEMPORAL))
const addExtras = async(req, res = response) => {

    const extraNew = extrasSchema(req.body);

    try{
        const extra = await Extras.findOne({ id : extraNew.id});

        if(extra){
            return res.status(400).send('Ya existe un extra con este id');
        }

        await extraNew.save();

        return res.status(201).json({
            ok: true,
            uid: extraNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

module.exports = {
    getExtras,
    addExtras
}