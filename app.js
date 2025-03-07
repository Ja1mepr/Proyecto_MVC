// Importamos
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dbConnect = require('./config/mongo.js')
const routers = require('./routes')

// Instanciamos la app con express
const app = express();

// Indicamos a express que use cors lo cual nos permite recibir peticiones de fuera de nuestro dominio (evita error Cross-Domain)
// Aplicamos middleware
app.use(express.json());
app.use('/api', routers);
app.use(cors());

//Definimos el puerto 
const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log("Servidor escuchando en el puerto: ", port);
})

dbConnect();