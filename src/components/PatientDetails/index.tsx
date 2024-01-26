import { useEffect, useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from "../../constants";
import { Patient, Diagnose } from "../../types";

import patientService from "../../services/patients";
import EntryComponent from "./EntryComponent";


const PatientDetails = ({diagnosis}: {diagnosis: Diagnose[]}) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      const patientData = await patientService.getPatient(id || '');
      console.log("patientData", patientData);
      setPatient(patientData);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  } 

  return (
    <div>
      <h3>{patient.name}</h3>
      <div>gender {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h2>Entries:</h2>
      {(patient.entries && patient.entries.length > 0) ? 
      <div>
        <div>
          {patient.entries.map(entry => 
            <EntryComponent key={entry.id} diagnosis={diagnosis} entry={entry}></EntryComponent>
          )}
        </div>
      </div>
      : <div>no entries found</div>}
    </div>
  );
};

export default PatientDetails;
