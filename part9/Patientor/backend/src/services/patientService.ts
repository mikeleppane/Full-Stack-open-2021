import { PatientEntrySsnExcluded } from "../types";
import patientEntries from "../../data/patients";

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
