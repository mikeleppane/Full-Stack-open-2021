import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, Container, Divider, Header } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { diagnosesCreator, patientsCreator, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientView from "./components/PatientView";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(patientsCreator(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(diagnosesCreator(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/:id">
              <PatientView />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
