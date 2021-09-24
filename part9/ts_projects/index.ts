import express from "express";
import { BMICalculator } from "./calculateBMI";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (!req.query.weight || !req.query.height) {
    res.status(400).json({ error: "malformed parameters" });
    return;
  }

  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
    res.status(400).json({ error: "malformed parameters" });
    return;
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmiResult = BMICalculator(height, weight);
  res.status(200).json({ height: height, weight: weight, bmi: bmiResult });
});

app.post("/exercises", (req, res) => {
  const body = req.body;
  if (!body.daily_exercises) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }
  if (!body.target) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }
  if (
    !Array.isArray(body.daily_exercises) ||
    body.daily_exercises.length === 0
  ) {
    console.log("herer");
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }
  const exercises = body.daily_exercises.map((e: number | string) => Number(e));
  for (const value of exercises) {
    if (isNaN(value)) {
      res.status(400).json({
        error: "malformatted parameters",
      });
      return;
    }
  }
  if (exercises.filter((e: number) => e < 0).length > 0) {
    res.status(400).json({
      error: "Negative values are not allowed",
    });
    return;
  }
  const target = Number(body.target);
  if (isNaN(target) || target < 0) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }
  res.status(200).json(exerciseCalculator(exercises, target));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
