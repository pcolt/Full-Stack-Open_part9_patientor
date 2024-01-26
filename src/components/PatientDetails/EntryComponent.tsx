// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { Diagnose, Entry } from "../../types";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BadgeIcon from '@mui/icons-material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const EntryComponent = ({diagnosis, entry}: {diagnosis: Diagnose[], entry: Entry}) => {


  const dateAndDescription = () => { 
    return (
      <div>
        <p>{entry.date} - <i>{entry.description}</i></p>
        <p>Specialist: {entry.specialist}</p>
      </div>
    );
  };

  const diagnosisList = () => {
    if (!entry.diagnosisCodes) return null;

    return (
      <div>
      <h5>Diagnosis codes:</h5>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>
              {code} - {diagnosis.find(d => d.code === code)?.name}
            </li>
          )}
        </ul>
    </div>
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return (<Card key={entry.id} variant="outlined">
        <CardContent>
          <h4><LocalHospitalIcon /> Health Check</h4>
          {dateAndDescription()}
          <p>Health check rating: {entry.healthCheckRating} / 3</p>
          {diagnosisList()}
        </CardContent>
      </Card>
      );
    case "Hospital":
      return (<Card key={entry.id} variant="outlined">
        <CardContent>
          <h4><VaccinesIcon /> Hospital Entry</h4>
          {dateAndDescription()}
          <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>
          {diagnosisList()}
        </CardContent>
      </Card>
      );
    case "OccupationalHealthcare":
      return (<Card key={entry.id} variant="outlined">
        <CardContent>
          <h4><BadgeIcon /> Occupational Healthcare Leave</h4>
          {dateAndDescription()}
          <p>Employer name: {entry.employerName}</p>
          <p>Sick leave: {entry.sickLeave != undefined ? `${entry.sickLeave?.startDate} - ${entry.sickLeave?.endDate}` : "no data"}</p>
          {diagnosisList()}
        </CardContent>
      </Card>
      );
    default:
      const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
      };

      return assertNever(entry);
  }
};

export default EntryComponent;
