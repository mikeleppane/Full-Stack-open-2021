import { DiagnoseEntry } from "../types";
import diagnoseEntries from "../../data/diagnoses";

const getEntries = (): DiagnoseEntry[] => {
  return diagnoseEntries;
};

export default {
  getEntries,
};
