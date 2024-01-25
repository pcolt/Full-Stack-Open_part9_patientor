// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { Diagnose, Entry } from "../../types";

const EntryComponent = ({diagnosis, entry}: {diagnosis: Diagnose[], entry: Entry}) => {


  return (
    <div>
      <div key={entry.id}>
        <div>{entry.date} - <i>{entry.description}</i></div>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>{code} - {diagnosis.find(d => d.code === code)?.name}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EntryComponent;
