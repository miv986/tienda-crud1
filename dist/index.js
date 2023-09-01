"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path = __importStar(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//swagger
// const swaggerUI = require("swagger-ui-express");
// const swaggerJSDoc = require("swagger-jsdoc");
const app = (0, express_1.default)();
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MySql API2",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http//localhost:1488"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*")}`]
};
app.set("port", process.env.PORT || 9000);
//middleware
app.use(express_1.default.json());
app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swaggerSpec)));
// routes
app.use("/", index_route_1.default);
app.use("*", (req, res) => {
    res.send("404 not found");
});
// start server
app.listen(app.get("port"), () => {
    console.log("server is running on port", app.get("port"));
});
// connect to database
db_1.default.connect()
    .then(() => {
    console.log("Connected to database");
})
    .catch((err) => {
    console.log("Error ", err);
});
