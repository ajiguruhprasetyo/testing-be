import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

//init express
const app = express();
const port = process.env.PORT;

//import route and db connection
import Router from "./routes/index.js";
import dbConn from "./db/db.js";

//use middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
//use Router
app.use(Router);

app.listen(port, () => console.log('Server Running at http://localhost:'+port));