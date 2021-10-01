import React from "react";
import { Entry } from "../types";
import { Container, Icon } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientEntryView = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Container
          style={{ border: "1px solid", margin: "5px", padding: "5px" }}
        >
          <h3>
            {entry.date} <Icon name={"user md"} />
          </h3>

          <p>{entry.description}</p>
        </Container>
      );
    case "Hospital":
      return (
        <Container
          style={{ border: "1px solid", margin: "5px", padding: "5px" }}
        >
          <h3>
            {entry.date} <Icon name={"stethoscope"} />
          </h3>

          <p>{entry.description}</p>
        </Container>
      );
    case "OccupationalHealthcare":
      return (
        <Container
          style={{ border: "1px solid", margin: "5px", padding: "5px" }}
        >
          <h3>
            {entry.date} <Icon name={"user md"} />
          </h3>

          <p>{entry.description}</p>
        </Container>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntryView;
