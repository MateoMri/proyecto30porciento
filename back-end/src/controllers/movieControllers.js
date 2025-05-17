import movieModel from "../models/Movie.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";

//1- cloudinary primero
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

//array de funciones de vacio

const movieController = {};

//select
movieController.getAllMovies = async (req, res) => {
    const movie = await movieModel.find();
    res.json(movie);
};

//insert
movieController.insertMovie = async (req, res) => {
    const {tittle, description, director, genre, year, duration} = req.body;
    let imageURL = "";

    //subir imagen a cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "png", "jpeg"],
        });
        imageURL = result.secure_url;
    }
    //guardar el registro en la base de datos
    const newMovie = new movieModel({tittle, description, director, genre, year, duration, image: imageURL });
    newMovie.save();

    res.json({message: "provider saved"});

};

//update
movieController.putMovie = async (req, res) => {
    const {tittle, description, director, genre, year, duration} = req.body;
    let imageURL = "";

    //subir la nueva imagen a cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
           folder: "public",
           allowed_formats: ["jpg", "png", "jpeg"], 
        });
        imageURL = result.secure_url;
    }
    //actualizar el registro en la base de datos
    await movieModel.findByIdAndUpdate(req.params.id,
        { tittle, description, director, genre, year, duration, image: imageURL}, {new: true}
    
    );

    res.json({ message: "movie saved"});
};

// DELETE
movieController.deleteMovie = async (req, res) => {
    const deletedMovie = await movieModel.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie does not exists" });
    }
    res.json({ message: " deleted movie" });
  };

export default movieController;