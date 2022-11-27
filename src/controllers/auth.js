const { response } = require('express');
const User = require('../models/user');
const jwToken = require('jsonwebtoken');
const fs = require('fs');
const env = require('../server/environment');
var path = require('path');

const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__basepath, 'keys/rsa_private.pem'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__basepath, 'keys/rsa_public.pem'));

const expiresInSec = 1800;

const validateUserAndPassword = async (username, password) => {
    let response;
    await User.findOne({ username: username, password: password }).then((user) => {
        if (user) {
            response = true;
        }
    }
    ).catch((error) => {
        response = false;

    });
    return response;
}

const postLogin = async (req, res = response) => {
    const username = req.body.username,
        password = req.body.password;
    const validateUser = await validateUserAndPassword(username, password);
    if (validateUser) {
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
        res.sendStatus(401);
    }
}

const checkIfAuthenticated = async (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        try {
            const decodedjwt = jwToken.verify(token, RSA_PUBLIC_KEY);
            req.user = decodedjwt.sub;
            console.log("User: ");
            return next();
        } catch (error) {
            res.status(401).json('Invalid Token')
        }
    } else {
        res.status(401).json('Invalid Token - No token provided')
    }
}

module.exports = {
    postLogin,
    checkIfAuthenticated
}