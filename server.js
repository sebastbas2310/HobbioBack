require("dotenv").config();


//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const plateRoutes = require("./routes/plateRoutes");
const tableRoutes = require("./routes/tableRoutes");
const ingredientRoutes = require("./routes/ingredientsRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());  
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/auth", authRoutes)    
app.use("/user", userRoutes)
app.use("/menu", plateRoutes)
app.use("/table", tableRoutes)
app.use("/ingredient", ingredientRoutes)



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})