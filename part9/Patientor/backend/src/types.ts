export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PatientEntrySsnExcluded = Omit<PatientEntry, "ssn" | "entries">;
export type NewPatientEntry = Omit<PatientEntry, "id">;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export interface NewPatientEntryFields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
}

export enum GenderEnum {
  Male = "male",
  Female = "female",
}
