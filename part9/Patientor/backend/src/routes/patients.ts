import express from "express";
import patientService from "../services/patientService";
import createPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = createPatientEntry(
      req.body
    );
    const newPatientEntry = patientService.addEntry({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });
    res.json(newPatientEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message).end();
    }
  }
});

export default router;
