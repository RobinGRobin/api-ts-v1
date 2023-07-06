import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import morgan from "morgan";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("tiny"));
app.use(router);

db().then(() => console.log("Mongo connection succesfully"));

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
