const { response } = require('express');
const Purchases = require('../models/purchases');
const purchasesSchema = require('../models/purchases');

//Obtener purchases por usuario
const getPurchasesUsername = async(req, res = response) => {
    let username = req.user;
    console.log("usernamePurchases: " + username);
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
    
    console.log("body: " + req.body);
    console.log("username: " + req.body.qrcode);
    console.log("movie: " + req.body.movie);
    const purchase = {
        username: req.user,
        qrcode: req.body.purchase[0].qrcode,
        movie: req.body.purchase[0].movie,
        theater: req.body.purchase[0].theater,
        date: req.body.purchase[0].date,
        time: req.body.purchase[0].time,
    };
    const purchaseNew = purchasesSchema(purchase);
    console.log("purchaseNew: " + purchaseNew);
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