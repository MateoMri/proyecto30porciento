import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/client.js";
import employeeModel from "../models/employee.js";
import { config } from "../config.js";

//array de funciones
const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let userFound; //guardar el usuario que se encontro
        let userType; // guardar el tipo de usuario

        if (email === config.admin.email && password === config.admin.password) {
            userType = "admin";
            userFound =  { _id: "admin"};
        } else {
            //empleado
            userFound = await employeeModel.findOne({ email });
            userType = "employee";

            if (!userFound) {
                userFound = await clientModel.findOne({ email });
                userType = "client";
            }
        }

        if (!userFound) {
            return res.json({ message: "user not found"});
        }

        if (userType !== "admin") {
            const isMatch = bcryptjs.compare(password, userFound.password);
            if (!isMatch) {
                res.json({ message: "invalid password" });
            }
        }

        jsonwebtoken.sign(
            {id: userFound._id, userType},

            config.JWT.secret,

            {expiresIn: config.JWT.expires },

            (error, token) => {
                if (error) console.log("error" + error);
                res.cookie("authToken", token);
                res.json({ message: "login successful" }); 
            }
        );
    } catch (error) {
        console.log("error" + error);
    }
    
};

export default loginController;