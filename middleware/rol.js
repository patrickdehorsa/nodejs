//const { handleHttpError } = require("../utils/handleError")

const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {

    try{
        const { user } = req;
        const rolesByUser = user.role; 
        console.log(rolesByUser);
        console.log(roles);
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        console.log(checkValueRol);
        if (!checkValueRol){
            handleHttpError(res, "USER_NOT_PERMISSIONS",403);
            return
        }
        next();
    } catch(e) {
     handleHttpError(res,"ERROR_PERMISSIONS", 403);
    }
}

module.exports = checkRol;