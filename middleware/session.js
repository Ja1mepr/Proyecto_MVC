const handleHttpError = require('../utils/handleError')
const {verifyToken} = require('../utils/handleJWT')
const UserModel = require('../models/user')

const authMiddleware = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }
        //Nos llega la palabra reservada Bearer (es un estandar) y el Token, asi que me quedo con la ultima parte
        const token = req.headers.authorization.split(' ').pop()
        //Verificamos el token
        const dataToken = await verifyToken(token)
        if(!dataToken._id){
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return 
        }
        const user = await UserModel.findbyId(dataToken._id)
        req.user = user //Inyecta al user en la peticion
        next()
    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESION", 401)
    }
}

module.exports = authMiddleware