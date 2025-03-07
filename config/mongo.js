// Conexion a Mongo
const mongoose = require('mongoose');
const dbConnect = () => {
    const db_uri = process.env.DB_URI;
    mongoose.set('strictQuery', false);
    console.log("Conexion con Mongo establecida")
    try{
        mongoose.connect(db_uri)
    }catch(error){
        console.error("Error conenctando a la BD: ", error);
    }
}

module.exports = dbConnect;