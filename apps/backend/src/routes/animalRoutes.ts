import express from "express";
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController";

const router = express.Router();

router.get("/", getAnimals);
router.post("/", createAnimal);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
