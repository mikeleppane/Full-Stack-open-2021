import { GenderEnum, NewPatientEntry, NewPatientEntryFields } from "./types";

const createPatientEntry = (object: NewPatientEntryFields): NewPatientEntry => {
  return {
    name: validateName(object.name),
    dateOfBirth: validateDateOfBirth(object.dateOfBirth),
    ssn: validateSsn(object.ssn),
    gender: validateGender(object.gender),
    occupation: validateOccupation(object.occupation),
  };
};

const validateName = (name: unknown): string => {
  if (name && isString(name)) {
    return name;
  }
  throw new Error(`Incorrect or missing name: ${name}`);
};

const validateDateOfBirth = (date: unknown): string => {
  if (date && isString(date) && isDate(date)) {
    return date;
  }
  throw new Error(`Incorrect or missing date of birth: ${date}`);
};

const validateSsn = (ssn: unknown): string => {
  if (ssn && isString(ssn) && isValidSsn(ssn)) {
    return ssn;
  }
  throw new Error(`Incorrect or missing ssn: ${ssn}`);
};

const validateGender = (gender: unknown): string => {
  if (gender && isGender(gender)) {
    return gender;
  }
  throw new Error(`Incorrect or missing gender: ${gender}`);
};

const validateOccupation = (occupation: unknown): string => {
  if (occupation && isString(occupation)) {
    return occupation;
  }
  throw new Error(`Incorrect or missing occupation: ${occupation}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is GenderEnum => {
  return Object.values(GenderEnum).includes(gender);
};

const isValidSsn = (ssn: string): boolean => {
  const pattern = /\d{6}[-][A-Za-z\d]{3}/;
  return pattern.test(ssn);
};

export default createPatientEntry;
