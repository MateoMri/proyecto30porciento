/*
campos: 
titulo
descripcion
director
genero
año
duracion
imagen
*/

import { Schema, model } from "mongoose";

const movieShema = new Schema(
    {
        tittle: {
            type: String,
            requiere: true
        },
        description: {
            type: String
        },
        director: {
            type: String,
            requiere: true
        },
        genre: {
            type: String,
            requiere: true
        },
        year: {
            type: Number,
            requiere: true
        },
        duration: {
            type: Number,
            requiere: true
        },
        image: {
            type: String,
            requiere: true
        }
    },{
        timestamps: true,
        strict: false
    }
)

export default model("movie", movieShema)