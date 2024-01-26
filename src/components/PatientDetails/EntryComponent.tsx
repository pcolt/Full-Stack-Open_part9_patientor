// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { Diagnose, Entry } from "../../types";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BadgeIcon from '@mui/icons-material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const EntryComponent = ({diagnosis, entry}: {diagnosis: Diagnose[], entry: Entry}) => {

  const entryType = () => {switch (entry.type) {
      case "HealthCheck":
        return <div><LocalHospitalIcon /> Health Check</div>;
      case "Hospital":
        return <div><VaccinesIcon /> Hospital Entry</div>;
      case "OccupationalHealthcare":      
        return <div><BadgeIcon /> Occupational Healthcare Leave</div>;
      default:  
        return null;
    }
  };

  return (
    <Card key={entry.id} variant="outlined">
      <CardContent>
        <h4>{entryType()}</h4>
        <div>{entry.date} - <i>{entry.description}</i></div>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>{code} - {diagnosis.find(d => d.code === code)?.name}</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EntryComponent;
