import nodemailer from "nodemailer"; //correo
import crypto from "crypto"; //codigo random
import jsonwebtoken from "jsonwebtoken"; //token
import bcryptjs from "bcryptjs"; //encriptar

import clientModel from "../models/client.js";
import { config } from "../config.js";
import e from "express";
import { error } from "console";

//array de funcion
const registerClientController = {};

registerClientController.register = async (req, res) => {
    //pedimos las cosas que se van a guardar
    const {
        name,
        email,
        password,
        phone,
        direction,
        DUI,
        isVerified,
    } = req.body;

    try {
        //1- verificar si el cliente ya existe
        const existsClient = await clientModel.findOne({ email });
        if (existsClient) {
            return res.json({message: "Client alredy exists"});
        }

        //2- encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        //3- guardar el nuevo cliente
        const newClient = new clientModel({
            name,
            email,
            password: passwordHash,
            phone,
            direction,
            DUI: DUI || null,
            isVerified: isVerified || false,
        });

        await newClient.save();

        //generar un codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex");

        //genero un codigo para guardar el codigo aleatorio
        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode},

            config.JWT.secret,

            { expiresIn: "2h" }
        );

        res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000});

        //enviar correo
        //1- transporter a quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass,
            },
        });

        //2- mailOtions a quien lo recibe
        const mailOtions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "verification of your account",
            text: "to verifie your account, use this code: " + verificationCode + "expira en dos horas",

        };

        //3- ebviar el codigo
        transporter.sendMail(mailOtions, (error, info) => {
            if (error) console.log("error" + error);
            res.json({ message: "Email sent" + info});
        });
        res.json({ message: "Client registered, please verify your email"});

    } catch (error) {
        console.log("error" + error);
        res.json({ message: "error" + error});
    }
};


//verificar codigo

registerClientController.verifyCodeEmail = async (req, res) => {
    const { verificationCodeRequest } = req.body;

    //1- obtener el token
    const token = req.cookies.verificationToken;

    //2- decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    //3- comparar los codigos
    if (verificationCodeRequest !== storedCode) {
        return res.json({ message: "Invalid code."});
    }

    const client = await clientModel.findOne ({ email });
    client.isVerified = true;
    await client.save();

    res.clearCookie("verficicationToken");

    res.json({ message: "Email verified seccessfully"});
};

export default registerClientController;