
const customHeader = (req, res, next) => {
    try{
        const apiKey = req.header.api_key
        if(apiKey==process.env.API_KEY){
            next()
        }else{
            res.status(400).send('Api key incorrecta')
        }
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports = customHeader