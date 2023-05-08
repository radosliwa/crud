// src/controllers/animalController.ts

import { Request, Response } from "express";
import Animal from "../models/Animal";
import { errorHelper } from "../utils/errorHelper";

export const getAnimals = async (req: Request, res: Response) => {
  const animals = await Animal.find();
  res.json(animals);
};

export const createAnimal = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const animal = new Animal({ name });
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (err: unknown) {
    errorHelper(err, res);
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    // find previously selected and turn it off
    const turnedOffAnimal = await Animal.findOneAndUpdate(
      { selected: true },
      { $set: { selected: false } }
    );
    // toggle of previously selected animal
    if (name === turnedOffAnimal?.name) {
      res.json(turnedOffAnimal);
      return;
    }
    const updatedAnimal = await Animal.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { selected: true, name } },
      { new: true }
    );

    if (!updatedAnimal) throw new Error("No animal found");
    res.json(updatedAnimal);
  } catch (error: unknown) {
    errorHelper(error, res);
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  await Animal.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: "Animal deleted" });
};
