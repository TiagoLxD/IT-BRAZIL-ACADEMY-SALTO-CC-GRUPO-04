/* eslint-disable no-unused-vars */
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import { routes } from "./routes/routes";

const app = express();


app.use(express({ extended: true }));
app.disable("x-powered-by");
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3000, () => console.log(`Servidor rodando http://localhost:3000`));
