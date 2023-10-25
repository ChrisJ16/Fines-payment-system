import React, { useState } from "react";
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Select, MenuItem } from "@mui/material";
import axiosInstance from "../axios";

const PCivil = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState("");
  const [newUser, setNewUser] = useState({ name: "", cnp: "", password: ""});
  
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

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleUserFieldChange = (e, fieldName, userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          [fieldName]: e.target.value,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleUpdateUser = () => {
    const updatedUser = users.find((user) => user.id === editingUserId);

    axiosInstance
      .put(`/user/${editingUserId}`, updatedUser)
      .then((response) => {
        setUsers((prevState) =>
          prevState.map((user) =>
            user.id === editingUserId ? response.data : user
          )
        );
        setEditingUserId("");

        addActivity(`(Policeman):Updates user with id ${editingUserId}`);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    axiosInstance
      .delete(`/user/${userId}`)
      .then(() => {
        setUsers((prevState) => prevState.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleAddUser = () => {
    const newUserData = {
      name: newUser.name,
      password: "password",
      cnp: newUser.cnp,
    };

    axiosInstance
      .post("/addUser", newUserData)
      .then((response) => {
        setNewUser({ name: "", cnp: "", password: "", email: "", address: "" });

        axiosInstance
          .get("/getUsers")
          .then((response) => {
            setUsers(response.data);

            addActivity(`(Policeman):Added a new user`);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding new user:", error);
      });
  };

  const handleSearchAll = () => {
    var request = "/getUsers";
    
    if(selectedUser === "postman")
      request = "/getPostman";
    else if(selectedUser === "policeman")
      request = "/getPoliceman";
    
    axiosInstance
      .get(request)
      .then((response) => {
        if(selectedUser === "civilian")
        {
          const onlyCiv = response.data.filter(user => user.password === "password");
          //console.log(onlyCiv);
          setUsers(onlyCiv);
        }
        else
          setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const [selectedUser, setSelectedUser] = useState('');

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  //const [searchText, setSearchText] = useState('');
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

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Users
      </Typography>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNP</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {editingUserId === user.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={user.name}
                        fullWidth
                        onChange={(e) => handleUserFieldChange(e, "name", user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={user.cnp}
                        fullWidth
                        onChange={(e) => handleUserFieldChange(e, "cnp", user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={user.password}
                        fullWidth
                        onChange={(e) => handleUserFieldChange(e, "password", user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleUpdateUser(user.id)}>
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.cnp}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={() => handleEditUser(user.id)}>
                          Edit
                        </Button>
                        <Button variant="outlined" onClick={() => handleDeleteUser(user.id)}>
                          Delete
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
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSearchAll} sx={{ mb: 2 }}>
            Search All
          </Button>
          <Select
            labelId="user-dropdown-label"
            id="user-dropdown"
            value={selectedUser}
            onChange={handleUserChange}
            label="Select User"
            >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="civilian">Civillians</MenuItem>
            <MenuItem value="policeman">Policemen</MenuItem>
            <MenuItem value="postman">Postmen</MenuItem>
        </Select>
        </Stack>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Add User</Typography>
        <TextField
          label="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="CNP"
          value={newUser.cnp}
          onChange={(e) => setNewUser({ ...newUser, cnp: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default PCivil;
