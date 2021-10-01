import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  currentPatientCreator,
  patientEntryCreator,
  useStateValue,
} from "../state";
import { Diagnosis, Entry, entryTypeNames, EntryWithoutId } from "../types";
import { Button, Container, Divider, Dropdown, Icon } from "semantic-ui-react";
import PatientEntryView from "./PatientEntryView";
import PatientEntryModal from "../PatientEntryModal";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { id } = useParams<{ id: string }>();
  const [{ patients, currentPatient, diagnoses }, dispatch] = useStateValue();
  const [currentDiagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType, setEntryType] =
    React.useState<entryTypeNames>("HealthCheck");

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const entryOptions = [
    { text: "HealthCheck", value: "HealthCheck" },
    { text: "Hospital", value: "Hospital" },
    { text: "OccupationalHealthcare", value: "OccupationalHealthcare" },
  ];

  const submitNewPatientEntry = async (values: EntryWithoutId) => {
    console.log(values);
    console.log(id);
    console.log("CURRENT_PATIENT: ", currentPatient);
    if (currentPatient) {
      try {
        const { data } = await axios.post<EntryWithoutId>(
          `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
          values
        );
        const newPatientEntry: Entry = data as Entry;
        dispatch(
          patientEntryCreator({ entry: newPatientEntry, id: currentPatient.id })
        );
        currentPatient.entries = [...currentPatient.entries, newPatientEntry];
        console.log("NEW PATIENT ENTRY ADDED: ", newPatientEntry);
        closeModal();
      } catch (e) {
        console.log(e.response);
        setError(
          `An error occurred while submitting new entry: ${
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            e.response.data || "Unknown error"
          } `
        );
      }
    }
  };

  useEffect(() => {
    if (!currentPatient || (currentPatient && currentPatient.id !== id)) {
      const patient = Object.values(patients).find((p) => p.id === id);
      if (patient) {
        dispatch(currentPatientCreator(patient));
      }
    }
    setDiagnoses(diagnoses);
  }, []);

  const handleEntryOptionChange = (
    event: SyntheticEvent<HTMLElement, Event>,
    { value }: { [key: string]: entryTypeNames }
  ): void => {
    console.log(value);
    setEntryType(value);
  };

  return (
    <div>
      {currentPatient && (
        <Container>
          <h2>
            {currentPatient.name}{" "}
            {currentPatient.gender === "female" ? (
              <Icon name={"venus"} />
            ) : (
              <Icon name={"mars"} />
            )}
          </h2>
          <Divider />
          <p>{currentPatient.ssn && `ssn: ${currentPatient.ssn}`}</p>
          <p>{`occupation: ${currentPatient.occupation}`}</p>
          <Divider />
          <h3>entries</h3>
          {currentPatient.entries.map((entry) => {
            return <PatientEntryView key={entry.id} entry={entry} />;
          })}
          {currentPatient.entries.map((entry) => {
            return (
              <div key={entry.id}>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => {
                      return (
                        <li key={code + entry.id}>
                          {code}{" "}
                          {currentDiagnoses &&
                            currentDiagnoses.length > 0 &&
                            currentDiagnoses.find((d) => d.code === code)?.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
          <PatientEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            error={error}
            onSubmit={submitNewPatientEntry}
            type={entryType}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          <Dropdown
            placeholder="Select Entry Type"
            name="entry-type"
            selection
            onChange={handleEntryOptionChange}
            options={entryOptions}
            value={entryType}
          />
        </Container>
      )}
    </div>
  );
};

export default PatientView;
