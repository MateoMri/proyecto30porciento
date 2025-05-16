//importar todo lo de express que instale con npm install
import express from 'express';
import clientRoutes from "./src/routes/client.js";
import cookieParser from 'cookie-parser';
import employeeRoutes from './src/models/employee.js';

// Crea una constante que es igual a la librería que importe
const app = express();

//Recordar siempre agregar el cors

app.use(express.json());

app.use(cookieParser());


app.use("/api/client", clientRoutes);
app.use("/api/employee", employeeRoutes);

// Exporta la constante app en otros archivos
export default app;

