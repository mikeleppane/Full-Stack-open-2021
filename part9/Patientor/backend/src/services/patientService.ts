import {
  NewPatientEntry,
  PatientEntry,
  PatientEntrySsnExcluded,
} from "../types";
import patientEntries from "../../data/patients";
import { v1 as uuidv1 } from "uuid";

const getEntries = (): PatientEntrySsnExcluded[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  console.log(entry);
  const newPatientEntry = {
    id: uuidv1(),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
};
