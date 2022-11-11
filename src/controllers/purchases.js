const { response } = require('express');
const Purchases = require('../models/purchases');
const purchasesSchema = require('../models/purchases');

//Obtener purchases por usuario
const getPurchasesUsername = async(req, res = response) => {

    try{
        const purchase = await Purchases.find({ username : req.params.username});

        if(purchase){
            return res.status(200).json(purchase);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Añadir purchase
const addPurchase = async(req, res = response) => {

    const purchase = purchasesSchema(req.body);

    try{
        await purchase.save();

        return res.status(201).json({
            ok: true,
            uid: purchase._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

module.exports = {
    getPurchasesUsername,
    addPurchase
}