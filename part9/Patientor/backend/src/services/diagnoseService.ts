import { DiagnoseEntry } from "../types";
import diagnoseEntries from "../../data/diagnoses";

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoseEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
