const { response } = require('express');
const User = require('../models/user');
const userSchema = require('../models/user');

//Obtener todos los usuarios
const getUsers = async(req, res = response) => {

    try{
        const users = await User.find({});

        if(users){
            return res.status(200).json(users);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Añadir usuarios
const addUser = async(req, res = response) => {

    const userNew = userSchema(req.body);

    try{
        const user = await User.findOne({ username : userNew.username});

        if(user){
            return res.status(400).send('Ya existe una imagen con este id');
        }

        await userNew.save();

        return res.status(201).json({
            ok: true,
            uid: userNew._id
        });
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}

//Buscar usuario por username
const getUserUsername = async(req, res = response) => {

    try{
        const user = await User.find({username : req.params.username});

        if(user){
            return res.status(200).json(user);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}



//Actualizar usuario por username
const putUserUsername = async(req, res = response) => {
    const { username } = req.params;
    const { password } = req.body;

    try{
        const user = await User.updateOne({ username: username }, { $set: { password: password }})

        if(user){
            return res.status(200).json(user);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


//Eliminar usuario por username
const removeUserUsername = async(req, res = response) => {

    try{
        const user = await Extras.deleteOne({username : req.params.username});

        if(user){
            return res.status(200).json(user);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
        
    }catch(error){
        return res.status(500).send('Ha ocurrido un problema');
    }

}


module.exports = {
    getUsers,
    addUser,
    getUserUsername,
    putUserUsername,
    removeUserUsername
}