import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from './routes/kpi.js'
import KPI from "./models/KPI.js";
import {kpis} from './Data/data.js'

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/kpi', kpiRoutes)

// mongoose setup

const PORT = process.env.PORT || 1337;

mongoose
  .connect(process.env.MONGO_URL)
  .then(async() => {
      app.listen(PORT, () => console.log(`Server on port: ${PORT}`));

    // add data one time only or as needed
    //   await mongoose.connection.db.dropDatabase();
    //   KPI.insertMany(kpis);
      
  })
  .catch((error) => console.error(`${error} did not connect`));


