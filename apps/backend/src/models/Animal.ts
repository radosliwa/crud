import mongoose from "mongoose";

interface Animal {
  _id?: string;
  name: string;
  selected?: boolean;
  createdAt?: Date;
}

const animalSchema = new mongoose.Schema<Animal>({
  name: { type: String, required: true },
  selected: { type: Boolean, default: false },
  createdAt: { type: Date, required: false },
});

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
