import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Pmplaws = () => {
  const [laws, setLaws] = useState([]);

  useEffect(() => {
    fetchLaws();
  }, []);

  const fetchLaws = async () => {
    try {
      const response = await axiosInstance.get('/getLaws');
      setLaws(response.data);
    } catch (error) {
      console.error('Error fetching laws:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Legi
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          {laws.map((law) => (
            <Accordion key={law.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{law.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body1">Date: {new Date(law.date).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Description: {law.description}</Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Pmplaws;
