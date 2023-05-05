"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://judge:1rYV1Qi7HPvoGF8Z@animaliacluster.otwtzbj.mongodb.net/');
    }
    catch (error) {
        console.log(`Error connecting to MongoDB Atlas: ${error}`);
        process.exit(1);
    }
};
// Create a schema and model for your data
const animalSchema = new mongoose_1.default.Schema({
    name: String,
    selected: Boolean,
    createdAt: { type: Date, default: Date.now },
});
const Animal = mongoose_1.default.model('Animal', animalSchema);
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to CRUD Animalia!');
});
// Create
app.post('/api/items', async (req, res) => {
    const newItem = new Animal(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});
// Read
app.get('/api/items', async (req, res) => {
    const items = await Animal.find();
    res.json(items);
});
// Update
app.put('/api/items/:id', async (req, res) => {
    // Set all animals to unselected
    await Animal.updateMany({ selected: true }, { $set: { selected: false } });
    // Set the specified animal to selected
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, { $set: { selected: true } }, { new: true });
    res.json(updatedAnimal);
});
// Delete
app.delete('/api/items/:id', async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Animal deleted' });
});
// Start the server
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
        console.error('Error starting the server:', err);
        process.exit(1);
    }
};
startServer();
