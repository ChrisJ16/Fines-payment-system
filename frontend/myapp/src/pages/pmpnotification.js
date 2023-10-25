import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Typography,
} from '@mui/material';
import moment from 'moment';

const LawsView = () => {
  const [unviewedLaws, setUnviewedLaws] = useState([]);
  const [viewedLaws, setViewedLaws] = useState([]);

  useEffect(() => {
    fetchLaws();
  }, []);

  const fetchLaws = async () => {
    try {
      const response = await axiosInstance.get('/getLaws');
      const laws = response.data;
      setUnviewedLaws(laws.filter((law) => !law.viewed));
      setViewedLaws(laws.filter((law) => law.viewed));
    } catch (error) {
      console.error('Error fetching laws:', error);
    }
  };

  const markAsViewed = async () => {
    const lawsId = unviewedLaws.map((law) => law.id);
    try {
        lawsId.forEach(async (id) => {  
            console.log(id);
            await axiosInstance.put(`/law/${id}/viewed`);
            fetchLaws();
        });
      //await axiosInstance.put(`/law/${id}/viewed`);
      
    } catch (error) {
      console.error('Error marking laws as viewed:', error);
    }
  };

  return (
    <Box sx={{ marginLeft: '20px' , mt:4}}>
      <Button variant="contained" onClick={markAsViewed}>
        Mark Laws as Viewed
      </Button>

      <Typography variant="h5" sx = {{ mt : 2}}>
        New Laws
        </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unviewedLaws.map((law) => (
              <TableRow key={law.id} style={{ backgroundColor: 'red' }}>
                <TableCell>{new Date(law.date).toLocaleDateString()}</TableCell>
                <TableCell>{law.title}</TableCell>
                <TableCell>{law.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5">
        Viewed Laws
        </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viewedLaws.map((law) => (
              <TableRow key={law.id}>
                <TableCell>{new Date(law.date).toLocaleDateString()}</TableCell>
                <TableCell>{law.title}</TableCell>
                <TableCell>{law.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LawsView;
