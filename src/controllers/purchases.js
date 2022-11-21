const { response } = require('express');
const Purchases = require('../models/purchases');
const purchasesSchema = require('../models/purchases');

//Obtener purchases por usuario
const getPurchasesUsername = async(req, res = response) => {

    let username = req.user;
    try{
        const purchase = await Purchases.find({ username : username});

        if(purchase){
            return res.status(200).json(purchase);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }
}

const addPurchase = async (req, res) => {
    
    const purchase = {
        username: req.user,
        qrcode: req.body.purchase.qrcode,
        movie: req.body.purchase.movie,
        theater: req.body.purchase.theater,
        date: req.body.purchase.date,
        time: req.body.purchase.time,
    };

    const purchaseNew = purchasesSchema(purchase);
    try {
        await purchaseNew.save();
        return res.status(201).json({
            ok: true,
            uid: purchase._id
        });

    } catch (error) {
        return res.status(500).send('Ha ocurrido un problema');
    }
}

module.exports = {
    getPurchasesUsername,
    addPurchase
}