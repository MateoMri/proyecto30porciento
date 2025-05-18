//importar todo lo de express que instale con npm install
import express from 'express';
import clientRoutes from "./src/routes/client.js";
import cookieParser from 'cookie-parser';
import employeeRoutes from "./src/routes/employee.js";
import movieRoutes from "./src/routes/movie.js";
import registerClientRoutes from "./src/routes/registerClient.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";

// Crea una constante que es igual a la librería que importe
const app = express();

//Recordar siempre agregar el cors
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(cookieParser());


app.use("/api/client", clientRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/registerClient", registerClientRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

// Exporta la constante app en otros archivos
export default app;

