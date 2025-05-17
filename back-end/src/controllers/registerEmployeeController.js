//importamos el modelo de la base de datos
import employeeModel from "../models/employee.js";
//importamos librerias
import bcryptjs from "bcryptjs"; //encriptar
import jsonwebtoken from "jsonwebtoken"; //token
import { config } from "../config.js";

// cremos un array de las funciones
const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
    //pedimos los campos que vamos a registrar
    const {
        name,
        email,
        password,
        phone,
        direction,
        charge,
        contratation,
        salary,
        DUI,
        isVerified,
    } = req.body

    try {
        //verificamos si el emepleado ya existe
        const employeeExist = await employeeModel.findOne({ email });
        if (employeeExist) {
            return res.json({ message: "employee already exists"});
        }

        //encriptar la contraseña bro
        const passwordHash = await bcryptjs.hash(password, 10);

        //guardamos el empleado en la base de datos
        const newEmployee = new employeeModel({
            name,
        email,
        password: passwordHash,
        phone,
        direction,
        charge,
        contratation,
        salary,
        DUI,
        isVerified,
        });

        await newEmployee.save();

        //TOKEN
        jsonwebtoken.sign(
            {id: newEmployee._id },

            config.JWT.secret,

            {expiresIn: config.JWT.expires },

            (error, token) => {
                if (error) console.log("error");

                res.cookie("authToken", token);
                res.json({ message: "Employee registed "});
            }
        );
    } catch (error) {
        console.log("error" + error);
        res.json({ message: "error" });
    }
};

export default registerEmployeeController;