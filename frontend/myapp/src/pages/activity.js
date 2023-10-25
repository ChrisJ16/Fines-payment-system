import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axiosInstance from '../axios';

const Activity = () => {
  const [policemen, setPolicemen] = useState([]);
  const [postmen, setPostmen] = useState([]);
  const [activities, setActivity] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch logged-in policemen
    /*
    axiosInstance.get('/getPoliceman')
      .then((response) => {
        setPolicemen(response.data);
      })
      .catch((error) => {
        console.error('Error fetching policemen:', error);
      });
  
    // Fetch logged-in postmen
    axiosInstance.get('/getPostman')
      .then((response) => {
        setPostmen(response.data);
      })
      .catch((error) => {
        console.error('Error fetching postmen:', error);
      });
      */

      axiosInstance.get('/getUsers')
      .then((response) => {
        const fetchedUsers = response.data.filter(user => user.password !== "password" && user.loggedIn === true);
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

      axiosInstance.get('/getActivities')
      .then((response) => {
        //console.log(response.data);
        setActivity(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  

  return (
    <div>
      <Typography variant="h6">Users Activity</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UserID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Logged In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.loggedIn ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt:10 }}>Users Actions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>User</TableCell>
              <TableCell>User id</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.username}</TableCell>
                <TableCell>{activity.userId}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Activity;
