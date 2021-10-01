import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Field, Form, Formik } from "formik";

import { DiagnosisSelection, NumberField, TextField } from "./FormField";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import { isValidDate } from "./Validators";

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
  onCancel: () => void;
}

export const AddHealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "HealthCheck",
        description: "",
        healthCheckRating: 0,
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
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
              label="Health Check Rating"
              name="healthCheckRating"
              min={0}
              max={3}
              component={NumberField}
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

export default AddHealthCheckForm;
