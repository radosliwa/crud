import { Response } from "express";

export const errorHelper = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
    return;
  }
  res.status(400).json({ message: "An unknown error occurred" });
};
