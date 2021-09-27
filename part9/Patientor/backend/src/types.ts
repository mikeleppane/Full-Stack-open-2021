export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientEntrySsnExcluded = Omit<PatientEntry, "ssn">;
export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface NewPatientEntryFields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
}

export enum GenderEnum {
  Male = "male",
  Female = "female",
}
