const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require('module-alias/register'); // para que funcione @/ en los archivos

// Middlewares
dotenv.config();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// OAuth
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, sameSite: "lax" }
}));

// Routes
const routeAuth = require("@/routes/auth");
const routeUsers = require("@/routes/users");
const routeGeocodes = require("@/routes/geocodes");
const routeGiras = require("@/routes/giras");
const routeConciertos = require("@/routes/conciertos");
const routeReservas = require("@/routes/reservas");
app.use("/api/auth", routeAuth);
app.use("/api/users", routeUsers);
app.use("/api/geocodes", routeGeocodes);
app.use("/api/giras", routeGiras);
app.use("/api/conciertos", routeConciertos);
app.use("/api/reservas", routeReservas);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log("*** Conexión exitosa con BBDD ***") })
    .catch((error) => { console.log("*** Error en la conexión con la BBDD ***", error) })

const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
app.listen(BACKEND_PORT, () => {
    console.log("API desplegada en puerto: ", BACKEND_PORT)
})