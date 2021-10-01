import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { AddHealthCheckForm } from "./AddHealthCheckForm";
import { entryTypeNames, EntryWithoutId } from "../types";
import AddHospitalForm from "./AddHospitalForm";
import AddOccupationalHealthcareForm from "./AddOccupationalHealthcareForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  type: entryTypeNames;
}

const PatientEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => {
  switch (type) {
    case "HealthCheck":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add health check entry for the patient</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "Hospital":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add health check entry for the patient</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "OccupationalHealthcare":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add health check entry for the patient</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddOccupationalHealthcareForm
              onSubmit={onSubmit}
              onCancel={onClose}
            />
          </Modal.Content>
        </Modal>
      );
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unrecognized patient entry type: ${type}`);
  }
};

export default PatientEntryModal;
