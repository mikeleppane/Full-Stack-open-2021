import express from "express";
import { BMICalculator } from "./bmiCalculator";

const app: express.Application = express();
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
