const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

const registerCtrl = async (req, res) => {

    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, { strict: false});
    
        const data = {
        token: await tokenSign(dataUser),
        user:dataUser,
        }
        res.status(201);
        res.send({data});
    } catch(e) {
        handleHttpError(res,"ERROR_REGISTER_USER");
    }
    
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email})
        console.log(user);
          // .select('password name role email');
        if (!user) {
            handleHttpError(res,"ERROR_NOT_EXISTS_USER",404);
            return
        }

        const hashPassword = user.get('password');


        const check = await compare(req.password, hashPassword);
       
        if(!check) {
            handleHttpError(res,"ERROR_PASSWORD_INVALID_USER",401);
            return
        }

        user.set('password', undefined ,{strict: false});
        const data = {
            token: await tokenSign(user),
            user: user
        }


        res.send({data});


    } catch(e) {
        handleHttpError(res,"ERROR_LOGIN_USER"+e);

    }
}

module.exports = { registerCtrl, loginCtrl }