const { response } = require('express');
const Extras = require('../models/extras');
const extrasSchema = require('../models/extras');

//Obtener todos los extras
const getExtras = async(req, res = response) => {

    try{
        const extra = await Extras.find({});

        if(extra){
            return res.status(200).json(extra);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Buscar precio del extra por ID
const getExtraPriceID = async(req, res = response) => {

    try{
        const extra = await Extras.find({id : req.params.id}).select({"_id": 0,"price": 1});

        if(extra){
            return res.status(200).json(extra);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

////////////////////////////////////////////////////////
//           COSAS INNECESARIAS                       //
////////////////////////////////////////////////////////

//Añadir extras
const addExtras = async(req, res = response) => {

    const extraNew = extrasSchema(req.body);

    try{
        const extra = await Extras.findOne({ id : extraNew.id});

        if(extra){
            return res.status(400).send('Ya existe una imagen con este id');
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

//Buscar extra por ID
const getExtraID = async(req, res = response) => {

    try{
        const extra = await Extras.find({id : req.params.id});

        if(extra){
            return res.status(200).json(extra);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}




//Actualizar extra por ID
const putExtraID = async(req, res = response) => {
    const { id } = req.params;
    const { price } = req.body;

    try{
        const extra = await Extras.updateOne({ id: id }, { $set: { price: price}});

        if(extra){
            return res.status(200).json(extra);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


//Eliminar extra por ID
const removeExtraID = async(req, res = response) => {

    try{
        const extra = await Extras.deleteOne({id : req.params.id});

        if(extra){
            return res.status(200).json(extra);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

////////////////////////////////////////////////////////
//           FIN COSAS INNECESARIAS                   //
////////////////////////////////////////////////////////


module.exports = {
    getExtras,
    addExtras,
    getExtraID, 
    getExtraPriceID,
    putExtraID,
    removeExtraID
}