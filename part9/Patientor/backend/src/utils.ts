import {
  EntryWithoutId,
  GenderEnum,
  NewPatientEntry,
  NewPatientEntryFields,
} from "./types";

export const createPatientEntry = (
  object: NewPatientEntryFields
): NewPatientEntry => {
  return {
    name: validateName(object.name),
    dateOfBirth: validateDateOfBirth(object.dateOfBirth),
    ssn: validateSsn(object.ssn),
    gender: validateGender(object.gender),
    occupation: validateOccupation(object.occupation),
    entries: [],
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

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type typeNames = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

export const createEntryForPatient = (
  object: EntryWithoutId
): EntryWithoutId => {
  switch (object.type) {
    case "HealthCheck":
      const entry = {
        date: validateDate(object.date),
        specialist: validateSpecialist(object.specialist),
        type: validateHealthCheckType(object.type),
        description: validateDescription(object.description),
        healthCheckRating: validatehealthCheckRating(object.healthCheckRating),
      };
      if ("diagnosisCodes" in object) {
        return {
          ...entry,
          diagnosisCodes: validateDiagnosisCodes(object.diagnosisCodes),
        };
      }
      return entry;

    case "Hospital":
      const hospitalEntry = {
        date: validateDate(object.date),
        type: validateHospitalType(object.type),
        specialist: validateSpecialist(object.specialist),
        diagnosisCodes: validateDiagnosisCodes(object.diagnosisCodes),
        description: validateDescription(object.description),
        discharge: validateDischarge(object.discharge),
      };
      if ("diagnosisCodes" in object) {
        return {
          ...hospitalEntry,
          diagnosisCodes: validateDiagnosisCodes(object.diagnosisCodes),
        };
      }
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry = {
        date: validateDate(object.date),
        specialist: validateSpecialist(object.specialist),
        type: validateOccupationalHealthcareType(object.type),
        employerName: validateEmployerName(object.employerName),
        description: validateDescription(object.description),
      };
      let occupationalHealthcareEntryAddOns = {} as EntryWithoutId;
      if ("diagnosisCodes" in object) {
        occupationalHealthcareEntryAddOns = {
          ...occupationalHealthcareEntry,
          diagnosisCodes: validateDiagnosisCodes(object.diagnosisCodes),
        };
      } else {
        occupationalHealthcareEntryAddOns = { ...occupationalHealthcareEntry };
      }
      if ("sickLeave" in object) {
        occupationalHealthcareEntryAddOns = {
          ...occupationalHealthcareEntry,
          sickLeave: validateSickLeave(object.sickLeave),
        };
      } else {
        occupationalHealthcareEntryAddOns = { ...occupationalHealthcareEntry };
      }
      return occupationalHealthcareEntryAddOns;
    default:
      return assertNever(object);
  }
};

const validateDiagnosisCodes = (codes: unknown): string[] => {
  if (
    codes &&
    Array.isArray(codes) &&
    codes.every((item) => typeof item === "string")
  ) {
    return codes as string[];
  }
  throw new Error(`Incorrect diagnoses codes: ${codes}`);
};

interface IDischarge {
  date: string;
  criteria: string;
}

const validateDischarge = (discharge: unknown): IDischarge => {
  if (discharge && isDischarge(discharge)) {
    return discharge;
  }
  throw new Error(
    `Incorrect or missing discharge: ${JSON.stringify(discharge)}`
  );
};

const isDischarge = (obj: unknown): obj is IDischarge => {
  return (
    (obj as IDischarge).date !== undefined &&
    isString((obj as IDischarge).date) &&
    (obj as IDischarge).criteria !== undefined &&
    isString((obj as IDischarge).criteria)
  );
};

interface ISickLeave {
  startDate: string;
  endDate: string;
}

const validateSickLeave = (sickLeave: unknown): ISickLeave => {
  if (sickLeave && isSickLeave(sickLeave)) {
    return sickLeave;
  }
  throw new Error(`Incorrect sick leave: ${JSON.stringify(sickLeave)}`);
};

const isSickLeave = (obj: unknown): obj is ISickLeave => {
  return (
    (obj as ISickLeave).startDate !== undefined &&
    isString((obj as ISickLeave).startDate) &&
    (obj as ISickLeave).endDate !== undefined &&
    isString((obj as ISickLeave).endDate)
  );
};

const validateDate = (date: unknown): string => {
  if (date && isString(date) && isDate(date)) {
    return date;
  }
  throw new Error(`Incorrect or missing date: ${date}`);
};

const validateSpecialist = (specialist: unknown): string => {
  if (specialist && isString(specialist)) {
    return specialist;
  }
  throw new Error(`Incorrect or missing specialist: ${specialist}`);
};

const validateDescription = (description: unknown): string => {
  if (description && isString(description)) {
    return description;
  }
  throw new Error(`Incorrect or missing specialist: ${description}`);
};

const validateEmployerName = (employerName: unknown): string => {
  if (employerName && isString(employerName)) {
    return employerName;
  }
  throw new Error(`Incorrect or missing employerName: ${employerName}`);
};

const validateHealthCheckType = (
  type: unknown
): Exclude<typeNames, "Hospital" | "OccupationalHealthcare"> => {
  if (type && isString(type) && type === "HealthCheck") {
    return type;
  }
  throw new Error(`Incorrect or missing type: ${type}`);
};

const validateHospitalType = (
  type: unknown
): Exclude<typeNames, "HealthCheck" | "OccupationalHealthcare"> => {
  if (type && isString(type) && type === "Hospital") {
    return type;
  }
  throw new Error(`Incorrect or missing type: ${type}`);
};

const validateOccupationalHealthcareType = (
  type: unknown
): Exclude<typeNames, "Hospital" | "HealthCheck"> => {
  if (type && isString(type) && type === "OccupationalHealthcare") {
    return type;
  }
  throw new Error(`Incorrect or missing type: ${type}`);
};

const validatehealthCheckRating = (healthCheckRating: unknown): number => {
  if (healthCheckRating && isNumber(healthCheckRating)) {
    return healthCheckRating;
  }
  throw new Error(
    `Incorrect or missing healthCheckRating: ${healthCheckRating}`
  );
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};
