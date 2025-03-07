
const express = require('express');
const {getItem, getItems, createItem, updateItem, deleteItem}= require('../controllers/user.js');
const { validatorGetItem, validatorCreateItem } = require('../validators/tracks.js');
//const UserModel = require('../models/users.js')

const router = express.Router();
router.use(express.json());

router.get('/', getItems, validatorGetItem)

router.get('/:email', getItem, validatorGetItem);

router.post('/', createItem, validatorCreateItem);

router.put('/:mail', (req, res) => {
    console.log(req.params);
    updateItem(req, res); 
});

router.delete('/:mail', deleteItem);

module.exports = router;