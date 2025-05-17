import express from "express";
import registerClientController from "../controllers/registerClientControllers.js";
const router = express.Router();

router.route("/").post(registerClientController.register);
router.route("/verifyCodeEmail").post(registerClientController.verifyCodeEmail);

export default router;