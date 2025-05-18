import express from "express";
import movieController from "../controllers/movieControllers.js";

const router = express.Router();

router
.route("/")
.get(movieController.getAllMovies)
.post(movieController.insertMovie);

router
.route("/:id")
.put(movieController.putMovie)
.delete(movieController.deleteMovie);

export default router;