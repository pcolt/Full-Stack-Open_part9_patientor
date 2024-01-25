import { useEffect, useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from "../constants";
import { Patient, Diagnose } from "../types";

import patientService from "../services/patients";


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
      <h2>{patient.name}</h2>
      <div>gender {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries ? 
      <div>
        {patient.entries.map(entry => 
          <div key={entry.id}>
            <div>{entry.date} - <i>{entry.description}</i></div>
            <ul>
              {entry.diagnosisCodes?.map(code => 
                <li key={code}>{code} - {diagnosis.find(d => d.code === code)?.name}</li>
              )}
            </ul>
          </div>
        )}
      </div>
      : <div>no entries found</div>}
    </div>
  );
};

export default PatientDetails;
