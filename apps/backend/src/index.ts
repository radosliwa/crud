import express, { Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import animalRoutes from "./routes/animalRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to CRUD Animalia!");
});

app.use("/api/animals", animalRoutes);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
};

startServer();
