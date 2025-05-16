import express from "express";
import clientController from "../controllers/clientControllers.js";
//Router nos ayuda a colocar los metodos que tendra mi ruta

const router = express.Router();

router
.route("/")
.get(clientController.getclient)
.post(clientController.createclient);

router.route("/:id")
.put(clientController.updateclient)
.delete(clientController.deleteclient);

export default router;