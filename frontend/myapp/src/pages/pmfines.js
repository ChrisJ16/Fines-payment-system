import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from '@mui/material';
import axiosInstance from '../axios';
import moment from 'moment/moment';

const PMFines = () => {
  const [fines, setFines] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchNote, setSearchNote] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchSum, setSearchSum] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [searchUserCNP, setSearchUserCNP] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserCNP, setSelectedUserCNP] = useState('');
  const [payingFines, setPayingFines] = useState([]);
  const [verificationCNP, setVerificationCNP] = useState('');
  const [fineToPaySum, setFineToPaySum] = useState(0);

  useEffect(() => {
    fetchAllFines();
    fetchAllUsers();
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

  const fetchAllFines = () => {
    axiosInstance
      .get('/getFines')
      .then((response) => {
        const fines = response.data;
        const formattedFines = fines.map((fine) => ({
          ...fine,
          date: new Date(fine.date), // Convert the date to a Date object
        }));
        setFines(formattedFines);
      })
      .catch((error) => {
        console.error('Error fetching fines:', error);
      });
  };

  const fetchAllUsers = () => {
    axiosInstance
      .get('/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const searchFines = () => {
      var filteredFines = fines.filter((fine) => fine.note.includes(searchNote));
      filteredFines = filteredFines.filter((fine) => moment(fine.date).format('DD/MM/YYYY').includes(searchDate));
      filteredFines = filteredFines.filter((fine) => fine.sum.toString().includes(searchSum));
      
      setFines(filteredFines);
  };

  const handleViewFinesForUser = (selectedCNP, selectedName, selectedID) => {
    setSelectedUserName(selectedName);
    setSelectedUserId(selectedID);
    setSelectedUserCNP(selectedCNP);
    setFineToPaySum(0);
    setPayingFines([]);
    try {
      axiosInstance
        .get(`/finesCnp/${selectedCNP}`)
        .then((response) => {
          console.log(response.data);
          setFines(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error('Error fetching fines:', error);
    }
  };

  const handleSearchUserByCriteria = () => {
    axiosInstance
      .get('/getUsers')
      .then((response) => {
        let filteredUsers = response.data.filter((item) => item.name.includes(searchUserName));
        filteredUsers = filteredUsers.filter((item) => item.cnp.includes(searchUserCNP));
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleVerifyAndPay = async () => {
    if (selectedUserId && verificationCNP) {
      if (payingFines.length === 0) {
        alert('No fines to pay.');
        return;
      }
  
      if (selectedUserCNP !== verificationCNP) {
        alert('Verification CNP does not match.');
        return;
      }
  
      try {
        for (const fine of payingFines) {
          await axiosInstance.put(`/user/${parseInt(fine.user.id)}/payFine/${parseInt(fine.id)}`);
          // Handle the response or any necessary actions after each request
        }
  
        alert('All fines paid!');
        setPayingFines([]);
        setVerificationCNP('');
        setFineToPaySum(0);
      } catch (error) {
        console.error('Error paying fines:', error);
      }
    }
    addActivity(`(Postman): User with CNP:${selectedUserCNP} paied some fine, Postman id ${sessionStorage.userId}`);
  };
  
  

  const handlePayFine = (fineId) => {
    const fineToPay = fines.find((fine) => fine.id === fineId);
    setPayingFines([...payingFines, fineToPay]);
    setFines(fines.filter((fine) => fine.id !== fineId));
    setFineToPaySum(fineToPaySum + fineToPay.sum);
  };

  const handleRemoveFine = (fineId) => {
    setPayingFines(payingFines.filter((fine) => fine.id !== fineId));
    setFines([...fines, payingFines.find((fine) => fine.id === fineId)]);
    setFineToPaySum(fineToPaySum - payingFines.find((fine) => fine.id === fineId).sum);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Search Users
      </Typography>

      <TextField
        label="User Name"
        variant="outlined"
        value={searchUserName}
        onChange={(e) => setSearchUserName(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="User CNP"
        variant="outlined"
        value={searchUserCNP}
        onChange={(e) => setSearchUserCNP(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={handleSearchUserByCriteria}>
        Search User
      </Button>

      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User CNP</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.cnp}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleViewFinesForUser(user.cnp, user.name, user.id)}>
                    View Fines
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Fines for {selectedUserName}
      </Typography>

      <TextField
        label="Note"
        variant="outlined"
        value={searchNote}
        onChange={(e) => setSearchNote(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Date (DD/MM/YYYY)"
        variant="outlined"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Sum"
        variant="outlined"
        value={searchSum}
        onChange={(e) => setSearchSum(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={searchFines}>
        Search Fine
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Sum</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines
              .filter((fine) => fine.user.id === selectedUserId)
              .map((fine) => (
                <TableRow key={fine.id}>
                  <TableCell>{fine.note}</TableCell>
                  <TableCell>{moment(fine.date).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{fine.sum}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handlePayFine(fine.id)}>
                      Pay Fine
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Typography variant="h5" gutterBottom>
        Paying Fines
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Sum</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payingFines.map((fine) => (
                <TableRow key={fine.id}>
                  <TableCell>{fine.note}</TableCell>
                  <TableCell>{moment(fine.date).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{fine.sum}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleRemoveFine(fine.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total to pay: {fineToPaySum} RON
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="CNP Verification"
          variant="outlined"
          value={verificationCNP}
          onChange={(e) => setVerificationCNP(e.target.value)}
        />
        <Button variant="contained" onClick={handleVerifyAndPay}>
          Verify and Pay!
        </Button>
      </Stack>
    </Box>
  );
};

export default PMFines;
