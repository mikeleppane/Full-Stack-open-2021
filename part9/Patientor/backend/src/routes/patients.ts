import express from "express";
import patientService from "../services/patientService";
import createPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAll());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getAll().filter((p) => p.id === req.params.id);
  res.status(200).json(patient);
});

router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation, entries } =
      createPatientEntry(req.body);
    const newPatientEntry = patientService.addEntry({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    });
    res.json(newPatientEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message).end();
    }
  }
});

export default router;
