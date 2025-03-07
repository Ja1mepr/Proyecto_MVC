const { matchedData } = require('express-validator');
const UserModel = require('../models/user')
const { validatorCreateItem } = require('../validators/user')

const getItem = async (req, res) => {
    const data = await UserModel.findOne({email: req.params.email});
    res.json(data);
}

const getItems = async (req, res) => {
    const data = await UserModel.find();
    res.json(data);
}

const createItem = async (req, res, validatorCreateItem) => {
    try{
        //Usar el validatorCreateItem antes de matchedData
        const body = matchedData(req.body)
        const data = await UserModel.create(body)
        console.log('Recurso creado')
        res.status(401).json(data)
    }catch(err){
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const updateItem = async (req, res) => {
    const email = req.params.email;
    const data = await UserModel.findOneAndReplace({email: req.body.params})
}

const deleteItem = async (req, res) => {
    const result = await UserModel.findByIdAndDelete();
}

module.exports = {getItem, getItems, createItem, updateItem, deleteItem}