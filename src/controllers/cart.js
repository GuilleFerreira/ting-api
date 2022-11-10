const { response } = require('express');
const Cart = require('../models/cart');
const cartSchema = require('../models/cart');

//Obtener cart por usuario
const getCartUsername = async(req, res = response) => {

    try{
        const cart = await Cart.find({ username : req.params.username});

        if(cart){
            return res.status(200).json(cart);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Actualizar cart por username
const putCartUsername = async(req, res = response) => {
    const { username } = req.params;
    const { movie, theater, date, time, exhibition, seats, selectedExtras } = req.body;

    try{
        const cart = await Cart.updateOne({ username: username }, 
            { $set: { movie: movie, theater: theater, date: date, time: time, exhibition: exhibition, seats: seats, selectedExtras: selectedExtras }});

        if(cart){
            return res.status(200).json(cart);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


//Añadir carrito
const addCartUsername = async(req, res = response) => {

    const cartNew = cartSchema(req.body);

    try{
        const cart = await Cart.findOne({ username : cartNew.username});

        if(cart){
            return res.status(400).send('Ya existe una imagen con este id');
        }

        await cartNew.save();

        return res.status(201).json({
            ok: true,
            uid: cartNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


module.exports = {
    getCartUsername,
    putCartUsername,
    addCartUsername
}