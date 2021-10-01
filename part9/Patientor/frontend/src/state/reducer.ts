import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

interface AddPatientEntry {
  entry: Entry;
  id: string;
}

const isPatient = (patient: unknown): patient is Patient => {
  return (patient as Patient).id !== undefined;
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      payload: AddPatientEntry;
    }
  | {
      type: "ADD_CURRENT_PATIENT";
      payload: Patient;
    };

export const patientsCreator = (
  data: Patient[]
): { type: "SET_PATIENT_LIST"; payload: Patient[] } => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const diagnosesCreator = (
  data: Diagnosis[]
): { type: "SET_DIAGNOSIS_LIST"; payload: Diagnosis[] } => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: data,
  };
};

export const patientEntryCreator = (
  data: AddPatientEntry
): { type: "ADD_PATIENT_ENTRY"; payload: AddPatientEntry } => {
  return {
    type: "ADD_PATIENT_ENTRY",
    payload: data,
  };
};

export const patientCreator = (
  data: Patient
): { type: "ADD_PATIENT"; payload: Patient } => {
  return {
    type: "ADD_PATIENT",
    payload: {
      ...data,
    },
  };
};

export const currentPatientCreator = (
  data: Patient
): { type: "ADD_CURRENT_PATIENT"; payload: Patient } => {
  return {
    type: "ADD_CURRENT_PATIENT",
    payload: { ...data },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_ENTRY":
      const patientToBeupdated = state.patients[action.payload.id];
      if (patientToBeupdated && isPatient(patientToBeupdated)) {
        patientToBeupdated.entries = [
          ...patientToBeupdated.entries,
          action.payload.entry,
        ];
        return {
          ...state,
          patients: {
            ...state.patients,
            [patientToBeupdated.id]: patientToBeupdated,
          },
        };
      }
      return state;
    case "ADD_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: action.payload,
      };
    default:
      return state;
  }
};
