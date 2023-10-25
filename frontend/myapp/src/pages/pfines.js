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
  Stack
} from '@mui/material';
import axiosInstance from '../axios';
import moment from 'moment/moment';
import { format } from 'date-fns';

const PFines = () => {
  const [fines, setFines] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchNote, setSearchNote] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchSum, setSearchSum] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newSum, setNewSum] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [editingFineId, setEditingFineId] = useState("");
  const [editedFine, setEditedFine] = useState({user: "", sum: "", note: "", date: "", paid: "", userId: "" });
  const [xmlUserId, setXmlUserId] = useState("");

  useEffect(() => {
    fetchAllFines();
    fetchAllUsers();
  }, []);

  const [lastFineId, setLastFineId] = useState(null);

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
}

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
    // Fetch all users from the backend
    axiosInstance.get('/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const searchFines = () => {
    // Search fines based on the provided criteria
  
    axiosInstance
      .get('/getFines')
      .then((response) => {
        const allFines = response.data;
        let filteredFines = [...allFines];
        console.log(allFines);
        // Apply filters based on criteria
        if (searchNote) {
          filteredFines = filteredFines.filter((fine) =>
            fine.note.toLowerCase().includes(searchNote.toLowerCase())
          );
        }
  
        if (searchDate) {
          filteredFines = filteredFines.filter((fine) =>
            moment(fine.date).isSame(moment(searchDate, 'DD/MM/YYYY'), 'day')
          );
        }
     
        if (searchSum) {
          const searchSumNumber = parseFloat(searchSum);
          filteredFines = filteredFines.filter((fine) => parseFloat(fine.sum) === searchSumNumber);
        }
  
        setFines(filteredFines);
      })
      .catch((error) => {
        console.error('Error searching fines:', error);
      });
  };
  

  const handleEditFine = (fineId, finePaid) => {
    const fineToEdit = fines.find((fine) => fine.id === fineId);
  
    setEditingFineId(fineId);
    setEditedFine({
      user: fineToEdit.user.name,
      sum: fineToEdit.sum,
      note: fineToEdit.note,
      date: fineToEdit.date,
      paid: fineToEdit.paid,
      userId: fineToEdit.user.id,
    });
  };  


  const handleFineFieldChange = (e, fieldName) => {
    setEditedFine((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }));
  };

  const handleUpdateFine = () => {
    const updatedFine = {
      sum: editedFine.sum,
      note: editedFine.note,
      date: editedFine.date,
      paid: editedFine.paid,
      user: {
        id: editedFine.userId,
        name: editedFine.user, // Add the name property here
      },
    };
  
    axiosInstance
      .put(`/fine/${editingFineId}`, updatedFine)
      .then((response) => {
        // Handle successful update
        // Update the "fines" state with the updated data
        setFines((prevState) =>
          prevState.map((fine) =>
            fine.id === editingFineId ? response.data : fine
          )
        );
        setEditingFineId("");
        
        addActivity(`(Policeman):Edited fine with ${editingFineId}`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating fine:", error);
      });
  };

  const addNameToFine = (userName, userId) => {
    // Add a new fine with the selected user
    setSelectedUserName(userName);
    setSelectedUserId(userId);
  };

  const addFine = (user) => {
    const formattedDate = moment(newDate, 'DD/MM/YYYY').format('YYYY-MM-DD'); // Convert date format to 'YYYY-MM-DD'
  
    const newFine = {
      note: newNote,
      date: formattedDate,
      sum: newSum,
      isPaid: false,
      user: {
        id: selectedUserId,
        name: selectedUserName,
        cnp: null,
        password: null,
      },
    };
  
    axiosInstance
      .post('/addFine', newFine)
      .then((response) => {
        const addedFine = response.data; // The newly added fine
        const lastFineId = addedFine.id; // Retrieve the last fine ID
        setFines([...fines, addedFine]); // Update the fines state with the newly added fine
  
        // Add the fine to the respective user
        axiosInstance
          .post(`/user/${selectedUserId}/addFine/${lastFineId}`, addedFine)
          .then((response) => {
            // Clear the input fields
            setNewNote('');
            setNewDate('');
            setNewSum('');

            addActivity(`(Policeman):User ${sessionStorage.userId} added a new fine with id: ${lastFineId + 1}`);
          })
          .catch((error) => {
            console.error('Error adding fine to user:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding fine:', error);
      });
  };
  
  
  const [searchUser, setNewSearchUser] = useState({ name: "", cnp: ""});
  const handleSearchUserByCriteria = () => {
    //alert(searchUser.name + " " + searchUser.cnp);
    axiosInstance
      .get("/getUsers")
      .then((response) => {
          var filteredUsers = response.data.filter((item) => item.name.includes(searchUser.name));
          filteredUsers = filteredUsers.filter((item) => item.cnp.includes(searchUser.cnp));
          setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  

  const deleteFine = (fineId) => {
    // Delete a fine with the specified ID
    axiosInstance.delete(`/fine/${fineId}`)
      .then(() => {
        // Remove the deleted fine from the fines state
        setFines(fines.filter((fine) => fine.id !== fineId));
        addActivity(`(Policeman): User ${sessionStorage.userId} deleted a fine ${fineId}`);
      })
      .catch((error) => {
        console.error('Error deleting fine:', error);
      });
  };

  /*
  const viewUserFines = async (userCNP) => {
    try {
      // Fetch active fines of the selected user
      const activeFinesResponse = await axiosInstance.get(`/finesCnp/${userCNP}`);
      const activeFines = activeFinesResponse.data;
  
      // Fetch all fines for the user
      const allFinesResponse = await axiosInstance.get('/getFines');
      const allFines = allFinesResponse.data;
  
      // Filter past fines that were paid by the user
      const pastFines = allFines.filter((fine) => fine.userId === selectedUserId && fine.paid);
  
      // Set the fines state to include both active and past fines
      setFines([...activeFines, ...pastFines]);
    } catch (error) {
      console.error('Error fetching user fines:', error);
    }
  };
  */
  

  const viewUserFines = (userCNP, userId) => {
    // Fetch fines of the selected user
    // TODO: Trebuie adaugat si in tabela de users_id si fine_id, ca asa se face legatura intre amenzi si useri
    setXmlUserId(userId);
    axiosInstance.get(`/finesCnp/${userCNP}`)
      .then((response) => {
        setFines(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user fines:', error);
      });
  };

  const viewUserPaidFines = (userID) => {
    // Fetch fines of the selected user
    axiosInstance.get(`/getFines`)
      .then((response) => {
        
        const pastFines = response.data.filter((fine) => fine.user.id === userID && fine.paid);
        setFines(pastFines);
      })
      .catch((error) => {
        console.error('Error fetching user fines:', error);
      });
  };

  const handleExport = () => {
    axiosInstance.get(`/exportFine/${xmlUserId}/xml`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching user fines:', error);
    });
  };
  

  return (
    <Box>
      <Typography variant="h4">Fines</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">Search Fines</Typography>
        <TextField
          label="Note"
          value={searchNote}
          onChange={(e) => setSearchNote(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          label="Date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          label="Sum"
          value={searchSum}
          onChange={(e) => setSearchSum(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}> 
          <Button variant="contained" onClick={searchFines} >
            Search Fines
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Fines</Typography>
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Sum</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Paid?</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine) => (
              <TableRow key={fine.id}>
                {editingFineId === fine.id ? (
                  <>
                    <TableCell>{fine.user.name}</TableCell>
                    <TableCell>
                      <TextField
                        value={editedFine.sum}
                        fullWidth
                        onChange={(e) => handleFineFieldChange(e, "sum")}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedFine.note}
                        fullWidth
                        onChange={(e) => handleFineFieldChange(e, "note")}
                      />
                    </TableCell>
                    <TableCell>
                    {new Date(fine.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{fine.paid ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={handleUpdateFine}>
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{fine.user.name}</TableCell>
                    <TableCell>{fine.sum} RON</TableCell>
                    <TableCell>{fine.note}</TableCell>
                    <TableCell>{new Date(fine.date).toLocaleDateString()}</TableCell>
                    <TableCell>{fine.paid ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={() => handleEditFine(fine.id, fine.paid)}>
                          Edit
                        </Button>
                        <Button variant="outlined" onClick={() => deleteFine(fine.id)}>
                          Delete fine
                        </Button>
                      </Stack>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleExport()}>
        Export as XML
      </Button>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Search Users</Typography>
        <TextField
          label="Name"
          value={searchUser.name}
          onChange={(e) => setNewSearchUser({ ...searchUser, name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="CNP"
          value={searchUser.cnp}
          onChange={(e) => setNewSearchUser({ ...searchUser, cnp: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handleSearchUserByCriteria}>
          Seatch User
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Users</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>CNP</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.cnp}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" onClick={() => addNameToFine(user.name, user.id)}>
                        New Fine
                      </Button>
                      <Button variant="outlined" onClick={() => viewUserFines(user.cnp, user.id)}>
                        View Active Fines
                      </Button>
                      <Button variant="outlined" onClick={() => viewUserPaidFines(user.id)}>
                        View Past Fines
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Add Fine</Typography>
        <TextField
          label="User"
          value={selectedUserName}
          readOnly
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          label="Note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          label="Date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          label="Sum"
          value={newSum}
          onChange={(e) => setNewSum(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
        <Button variant="contained" onClick={addFine} sx={{ mt: 1 }}> 
          Add Fine
        </Button>
      </Box>
    </Box>
  );
};

export default PFines;
