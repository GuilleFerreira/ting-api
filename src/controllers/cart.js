const { response } = require('express');
const Cart = require('../models/cart');
const cartSchema = require('../models/cart');

//Obtener cart por usuario
const getCartUsername = async(req, res = response) => {

    try{
        const cart = await Cart.find({ username : req.params.username}).select({"_id": 0});

        if(cart){
            if(cart.length == 0){
                addCart(req.params.username);
                return res.status(200).json("Cart created");
            }
            return res.status(200).json(cart);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

function addCart(username) {
    const cart = {
        username: username,
        movie: "",
        theater: "",
        date: "",
        time: "",
        exhibition: "",
        seats: [],
        selectedExtras: []
    };
    const cartNew = cartSchema(cart);
    cartNew.save();
    return;
}

//Actualizar cart por username
const putCartUsername = async(req, res = response) => {
    const username = req.params.username;
    const  movie  = req.body.movie;
    console.log("hola");
    console.log("username", username, " movie", movie);
    try{
        const cart = await Cart.updateOne({ username: username }, 
            { $set: { movie: movie /* , theater: theater, date: date, time: time, exhibition: exhibition, seats: seats, selectedExtras: selectedExtras*/ }});

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