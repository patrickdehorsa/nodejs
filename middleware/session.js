const { verifyToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {

    try {
        if(!req.headers.authorization) {
            handleHttpError(res,"NOT_TOKEN", 401);
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken) {
            handleHttpError(res, "ERROR_NO_PAYLOAD_DATA", 401)
            return
        }


        /////
      const query = {
        [propertiesKey.id]: dataToken[propertiesKey.id]
      }
        const user = await usersModel.findOne(query);
        req.user = user;
        next()

    } catch(e) {
        handleHttpError(res, "NOT_SESSION", 401);
        console.log(e);
    }
}

module.exports = authMiddleware 