//importar lib de errors
require("express-async-errors");
require("dotenv/config");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require('./config/upload')

const cors = require("cors");
const express = require("express");
const { use } = require("express/lib/application");
const routes = require("./routes");

migrationsRun();

//para utilizar o express é necessário executá-lo
const app = express();
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);


app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    
    console.error(error)
    
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    })
})

//definir a porta
const PORT = process.env.PORT || 3333;

//fica escutando a porta
app.listen(PORT, () => {console.log(`Server is running on Port ${PORT}`)});
