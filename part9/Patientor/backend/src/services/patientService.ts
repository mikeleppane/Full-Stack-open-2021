import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  Patient,
  PatientEntry,
  PatientEntrySsnExcluded,
} from "../types";
import { v1 as uuidv1 } from "uuid";
import patients from "../../data/patients";

const getEntries = (): PatientEntrySsnExcluded[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getAll = (): Patient[] => {
  console.log(patients);
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      ssn,
      entries,
    })
  );
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  console.log(entry);
  const newPatientEntry = {
    id: uuidv1(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryForPatient = (entry: EntryWithoutId, id: string): Entry => {
  console.log(entry);
  const newEntry = {
    id: uuidv1(),
    ...entry,
  };
  console.log("NEW ENTRY: ", newEntry);
  const patientToBeupdated = patients.find((p) => p.id === id);
  if (patientToBeupdated) {
    patientToBeupdated.entries = [...patientToBeupdated.entries, newEntry];
    return newEntry;
  }
  throw new Error(`Cannot find patient with an ID: ${id}`);
};
export default {
  getEntries,
  addEntry,
  getAll,
  addEntryForPatient,
};
