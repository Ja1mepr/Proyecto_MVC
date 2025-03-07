// Comprobamos que existen los campos que consideremos necesarios para evitar la creacion de objetos vacios,
// (como me paso al principio :) )
const {check} = require('express-validator')
const validateResults = require('../utils/handleValidator')
const validatorCreateItem = [
    check('name').exists().notEmpty(), //.isLength(min: 5, max: 90)
    check('album').exists().notEmpty(),
    check('cover').exists().notEmpty(),
    check('duration.end').exists().notEmpty(),
    check('mediaId').exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetItem = [
    check('id').exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorCreateItem, validatorGetItem}