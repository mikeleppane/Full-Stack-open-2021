import express = require("express");
import cors = require("cors");
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
