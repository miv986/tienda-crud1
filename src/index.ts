import express from "express"
import db from "./config/db";
import indexRouter from "./routes/index.route";
import swaggerJSDoc from "swagger-jsdoc";
import * as path from 'path';
import swaggerUI from 'swagger-ui-express';

const app = express();
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MySql API22",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:1488"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./**/*.ts")}`] // Corregido: cambia ".ts*" a "*.ts"
}
app.set("port", process.env.PORT || 9000);

//middleware
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))

// routes
app.use("/", indexRouter);
app.use("*", (req, res) => {
    res.send("404 not found");
})

// start server
app.listen(app.get("port"), () => {
    console.log("server is running on port", app.get("port"));
})

// connect to database
db.connect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error ", err);
    })

