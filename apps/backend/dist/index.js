"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const GUEST_DB_NAME = process.env.GUEST_DB_NAME;
const GUEST_DB_PASSWORD = process.env.GUEST_DB_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const errorHelper = (err, res) => {
    if (err instanceof Error) {
        res.status(400).json({ message: err.message });
        return;
    }
    res.status(400).json({ message: "An unknown error occurred" });
};
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${GUEST_DB_NAME}:${GUEST_DB_PASSWORD}${MONGO_CLUSTER}`);
    }
    catch (error) {
        console.log(`Error connecting to MongoDB Atlas: ${error}`);
        process.exit(1);
    }
};
const animalSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    selected: { type: Boolean, default: false },
    createdAt: { type: Date, required: false },
});
const Animal = mongoose_1.default.model("Animal", animalSchema);
app.get("/", (req, res) => {
    res.send("Welcome to CRUD Animalia!");
});
// Read
app.get("/api/animals", async (req, res) => {
    const animals = await Animal.find();
    res.json(animals);
});
// POST
app.post("/api/animals", async (req, res) => {
    const { name } = req.body;
    try {
        const animal = new Animal({ name });
        const newAnimal = await animal.save();
        res.status(201).json(newAnimal);
    }
    catch (err) {
        errorHelper(err, res);
    }
});
app.put("/api/animals/:id", async (req, res) => {
    try {
        const { name } = req.body;
        /* Find the currently selected animal and set its 'selected' field to false
        as according to the task description only one animal can be selected at a time
        */
        await Animal.findOneAndUpdate({ selected: true }, { $set: { selected: false } });
        const updatedAnimal = await Animal.findOneAndUpdate({ _id: req.params.id }, { $set: { selected: true, name } }, { new: true });
        if (!updatedAnimal)
            throw new Error("No animal found");
        res.json(updatedAnimal);
    }
    catch (error) {
        errorHelper(error, res);
    }
});
app.delete("/api/animals/:id", async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Animal deleted" });
});
const port = process.env.PORT || 5000;
const startServer = async () => {
    try {
        const TIMEOUT_MS = 10000;
        const connectionPromise = connectDB();
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`Connection timeout after ${TIMEOUT_MS} ms`)), TIMEOUT_MS));
        await Promise.race([connectionPromise, timeoutPromise]);
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
    catch (err) {
        console.error("Error starting the server:", err);
        process.exit(1);
    }
};
startServer();
