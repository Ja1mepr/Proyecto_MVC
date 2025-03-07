const {tracksModel} = require('../models/tracks')
const {matchedData} = require('express-validator')
const {handleHttpError} = require('../utils/handleError')
 
const getItem = async (req, res) => {
    const data = await tracksModel.findOne({id: req.params.id})
    res.send(data)
}

const getItems = async (req, res) => {
    try{
        const user = req.user
        const data = await tracksModel.find()
        res.send({data, user})
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR")
    }
}

const createItems = async (req, res) => {
    try{
    //matchedData comprueba los campos que hemos añadido a check en validators/tracks como obligatorios antes de crear el objeto
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

module.exports = {getItem, getItems, createItems}