const mongoose = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
        url:  String,
        filename: String
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
module.exports = mongoose.model("storages", StorageSchema) // Nombre de la colección