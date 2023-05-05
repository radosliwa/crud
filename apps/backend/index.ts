import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const GUEST_DB_NAME = process.env.GUEST_DB_NAME;
const GUEST_DB_PASSWORD = process.env.GUEST_DB_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${GUEST_DB_NAME}:${GUEST_DB_PASSWORD}${MONGO_CLUSTER}`)
  } catch (error) {
    console.log(`Error connecting to MongoDB Atlas: ${error}`);
    process.exit(1);
  }
}

const animalSchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Animal = mongoose.model('Animal', animalSchema);

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
      const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Connection timeout after ${TIMEOUT_MS} ms`)), TIMEOUT_MS)
      );
      await Promise.race([connectionPromise, timeoutPromise]);

      app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (err) {
      console.error('Error starting the server:', err);
      process.exit(1);
  }
};


startServer();