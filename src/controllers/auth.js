const { response } = require('express');
const User = require('../models/user');
const jwToken = require('jsonwebtoken');
const fs = require('fs');
const env = require('../server/environment');
var path = require('path');

//var { expressjwt: jwt } = require("express-jwt");


const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__basepath, 'keys/rsa_private.pem'));

const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__basepath, 'keys/rsa_public.pem'));


const expiresInSec = 1800;

//Buscar usuario por username
const validateUserAndPassword = async (username, password) => {
    let response;
    await User.findOne({ username: username, password: password }).then((user) => {
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


//Obtener Id del usuario - NO LO USAMOS MAS PORQUE LE PASAMOS EL USERNAME EN EL TOKEN
/* const findUserIdForUsername = async (username) => {
    console.log(username);
    const user_id = await User.findOne({ username: username });
    if (user_id) {
        return user_id._id.toString();
    }
} */
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
    const validateUser = await validateUserAndPassword(username, password);
    if (validateUser) {
       // user_id = await findUserIdForUsername(username, res);
        const jwtBearerToken = jwToken.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: expiresInSec,
            subject: username
        })
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: expiresInSec
        });

    } else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}

const checkIfAuthenticated = async (req, res, next) => {
    const token = req.headers['authorization']
    console.log("token", token);
    if (token) {
        console.log("entre");
        try {
            console.log("authorization", token);
            console.log("Entre al try", token);
            console.log("PK", RSA_PUBLIC_KEY); 
            const decodedjwt = jwToken.verify(token, RSA_PUBLIC_KEY);
            req.user = decodedjwt.sub;
            console.log("REQ", req.user);
            return next();
        } catch (error) {
            res.status(401).json('Invalid Token')
        }
    } else {
        res.status(401).json('Invalid Token - No token provided')
    }
}

/* const verifyjwt = async () => {
    console.log("verifyjwt");
} 

const checkIfAuthenticated = jwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ["RS256"]
});*/


module.exports = {
    postLogin,
    checkIfAuthenticated
    /*         checkIfAuthenticated
     */
}