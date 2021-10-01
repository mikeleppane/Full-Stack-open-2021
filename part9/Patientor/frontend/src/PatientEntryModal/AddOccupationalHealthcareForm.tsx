import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Field, Form, Formik } from "formik";

import { DiagnosisSelection, TextField } from "./FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { isValidDate } from "./Validators";

interface Props {
  onSubmit: (values: Omit<OccupationalHealthcareEntry, "id">) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthcareForm = ({
  onSubmit,
  onCancel,
}: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        description: "",
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [key: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else {
          if (!isValidDate(values.date)) {
            errors.date = "Incorrect date format.";
          }
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave - start date"
              placeholder="Start date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave - end date"
              placeholder="Criteria"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthcareForm;
