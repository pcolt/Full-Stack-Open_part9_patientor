import { useEffect, useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

import patientService from "../services/patients";


const PatientDetails = () => {
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

  return (
    patient ?
    <div>
      <h2>{patient.name}</h2>
      <div>gender {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
    : <div>Loading...</div>
  );
};

export default PatientDetails;
