import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const Plaws = () => {
  const [laws, setLaws] = useState([]);
  const [newLaw, setNewLaw] = useState({
    date: new Date(),
    title: '',
    description: '',
    viewed: false,
  });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchLaws();

    const newSocket = new WebSocket('ws://localhost:8080/socket');
     setSocket(newSocket);
 
     // Cleanup WebSocket connection on unmount
     return () => {
       newSocket.close();
     };
  }, []);

  const addActivity = (Message) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
  
    const newActivity = {
      action: Message,
      userId: sessionStorage.userId,
      username: sessionStorage.username,
      date: formattedDate,
    };
  
  
      axiosInstance.post(`\addActivity`, newActivity);
  };

  const fetchLaws = async () => {
    try {
      const response = await axiosInstance.get('/getLaws');
      setLaws(response.data);
    } catch (error) {
      console.error('Error fetching laws:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLaw((prevLaw) => ({ ...prevLaw, [name]: value }));
  };

  const sendAlert = (newMessage) => {
    // Send an alert message to the server
    console.log("Sending message: ", newMessage);
    const message = {
      content: newMessage,
    };
    socket.send(JSON.stringify(message));
  };

  const handleAddLaw = async () => {
    if (newLaw.title !== '' || newLaw.description !== '') {
      setNewLaw({
          date: new Date(),
          title: '',
          description: '',
          viewed: false,
        });
      try {
        await axiosInstance.post('/addLaw', newLaw);
        fetchLaws();

        sendAlert("A new LAW has been added!");
        addActivity(`(Policeman): A new law has been added!`);
      } catch (error) {
        console.error('Error adding law:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteLaw = async (id) => {
    try {
      await axiosInstance.delete(`/law/${id}`);
      fetchLaws();

      addActivity(`(Policeman): A new law has been deleted, with id ${id}!`);
    } catch (error) {
      console.error('Error deleting law:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Laws
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Add Law
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={newLaw.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Title"
              name="title"
              value={newLaw.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={newLaw.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddLaw}>
              Add Law
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            View Laws
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Viewed</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laws.map((law) => (
                  <TableRow key={law.id}>
                    <TableCell>{new Date(law.date).toLocaleDateString()}</TableCell>
                    <TableCell>{law.title}</TableCell>
                    <TableCell>{law.description}</TableCell>
                    <TableCell>{law.viewed ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleDeleteLaw(law.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Plaws;
