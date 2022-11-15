const { response } = require('express');
const User = require('../models/user');
const userSchema = require('../models/user');
const jwToken = require('jsonwebtoken');
const fs = require('fs');

var { expressjwt: jwt } = require("express-jwt");

const RSA_PRIVATE_KEY = fs.readFileSync('keys/rsa_private.pem');

const RSA_PUBLIC_KEY = fs.readFileSync('keys/rsa_public.pem');

//Buscar usuario por username
const validateUserAndPassword = async (username, password) => {
    let response;
    await User.findOne({ username: username, password: password }).then((user) => {
        console.log("user", user);
        if (user) {
            response = true;
        }
    }
    ).catch((error) => {
        console.log("error", error);
        response = false;

    });
    return response;
}

//Obtener Id del usuario
const findUserIdForUsername = async (username) => {
    console.log(username);
    const user_id = await User.findOne({ username: username }) ;
    if (user_id) {
        return user_id._id.toString();
    }
}
//Obtener todos los usuarios
const getLogin = async (req, res = response) => {
    try {
        const users = await User.find({});
        if (users) {
            return res.status(200).json(users);
        }
        return res.status(400).send('No se pudo procesar su solicitud');
    } catch (error) {
        return res.status(500).send('Ha ocurrido un problema');
    }

}

const postLogin = async (req, res = response) => {
    const username = req.body.username,
        password = req.body.password;
    console.log("email: " + username);
    console.log("password: " + password);
    console.log(req.body);
    const validateUser = await validateUserAndPassword(username, password);
    console.log("val", validateUser);
    if (validateUser) {
        user_id = await findUserIdForUsername(username, res);

        console.log("user_id", user_id);
        const jwtBearerToken = jwToken.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: user_id
        })
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 120
        });

    } else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}

const checkIfAuthenticated = jwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ["RS256"]
});


module.exports = {
    postLogin,
    checkIfAuthenticated
}