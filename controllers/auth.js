const { matchedData } = require("express-validator")
const UserModel = require('../models/user')
const { tokenSign } = require("../utils/handleJWT")

const registerCtrl = async (req, res) => {
    try{
        req=matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await UserModel.create(body)
        dataUser.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_REGISTING_USER")
    }
}

const loginCtrl = async (req, res) => {
    try{
        req = matchedData(req)
        const user = UserModel.findOne({email: req.email}).select('password name role email')
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashedPassword = user.password
        const check = await compare(req.password, hashedPassword)
        if(!check){
            handleHttpError(req, "INVALID_PASSWORD", 401)
            return
        }
        user.set('password', undefined, {strinct: false}) //Si no queremos que se mueste el hash en la respuesta
        const data = {
            token: await tokenSign(user),
            user
        }
        res.json(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = {registerCtrl, loginCtrl}