import React, { useState } from "react";
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axiosInstance from "../axios";

const PPersonal = () => {
  const [policemen, setPolicemen] = useState([]);
  const [editingPolicemanId, setEditingPolicemanId] = useState("");
  const [newPoliceman, setNewPoliceman] = useState({ name: "", cnp: "", password:"", officerId: "", policeBadge: "", grade: "" });

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

  const handleEditPoliceman = (policemanId) => {
    setEditingPolicemanId(policemanId);
  };

  const handlePolicemanFieldChange = (e, fieldName, policemanId) => {
    const updatedPolicemen = policemen.map((policeman) => {
      if (policeman.id === policemanId) {
        return {
          ...policeman,
          [fieldName]: e.target.value,
        };
      }
      return policeman;
    });
  
    setPolicemen(updatedPolicemen);
  };

  const handleUpdatePoliceman = () => {
    const updatedPoliceman = policemen.find((policeman) => policeman.id === editingPolicemanId);
  
    axiosInstance
      .put(`/policeman/${editingPolicemanId}`, updatedPoliceman)
      .then((response) => {
        // Handle successful update
        // Update the "policemen" state with the updated data
        setPolicemen((prevState) =>
          prevState.map((policeman) =>
            policeman.id === editingPolicemanId ? response.data : policeman
          )
        );
        setEditingPolicemanId("");

        addActivity(`(Policeman): Editted policeman with id ${editingPolicemanId}`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating policeman:", error);
      });
  };

  const handleDeletePoliceman = (policemanId) => {
    axiosInstance
      .delete(`/policeman/${policemanId}`)
      .then(() => {
        // Handle successful deletion
        // Update the "policemen" state by filtering out the deleted policeman
        setPolicemen((prevState) => prevState.filter((policeman) => policeman.id !== policemanId));

        addActivity(`(Policeman): Deleted policeman with id ${policemanId}`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting policeman:", error);
      });
  };

  const handleAddPoliceman = () => {
    const newPolicemanData = {
      name: newPoliceman.name,
      password: newPoliceman.password,
      cnp: newPoliceman.cnp,
      officerId: newPoliceman.officerId,
      policeBadge: newPoliceman.policeBadge,
      grade: newPoliceman.grade
    };
  
    axiosInstance
      .post("/addPoliceman", newPolicemanData)
      .then((response) => {
        // Handle successful addition
        // Update the "policemen" state with the new policeman if necessary
        setNewPoliceman({ name: "", cnp: "", password: "", officerId: "", policeBadge: "", grade: "" });
  
        // Fetch all policemen after successful addition
        axiosInstance.get("/getPoliceman")
        .then((response) => {
          setPolicemen(response.data);

          addActivity(`(Policeman): Added a new policeman`);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
          })
      .catch((error) => {
        // Handle error
        console.error("Error adding new policeman:", error);
      });
  };

  const handleSearchAll = () => {
    axiosInstance.get("/getPoliceman")
    .then((response) => {
      setPolicemen(response.data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
  };

  const [searchPoliceman, setNewSearchPoliceman] = useState({ name: "", cnp: "", grade: "" });
  const handleSearchUserByCriteria = () => {
    axiosInstance
      .get("/getPoliceman")
      .then((response) => {
          var filteredUsers = response.data.filter((item) => item.name.includes(searchPoliceman.name));
          filteredUsers = filteredUsers.filter((item) => item.cnp.includes(searchPoliceman.cnp));
          filteredUsers = filteredUsers.filter((item) => item.grade.includes(searchPoliceman.grade));
          setPolicemen(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Policemen
      </Typography>
      <TextField
          label="Name"
          value={searchPoliceman.name}
          onChange={(e) => setNewSearchPoliceman({ ...searchPoliceman, name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="CNP"
          value={searchPoliceman.cnp}
          onChange={(e) => setNewSearchPoliceman({ ...searchPoliceman, cnp: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Grade"
          value={searchPoliceman.grade}
          onChange={(e) => setNewSearchPoliceman({ ...searchPoliceman, grade: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handleSearchUserByCriteria}>
          Seatch Policeman
        </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNP</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Officer ID</TableCell>
              <TableCell>Police Badge</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policemen.map((policeman) => (
              <TableRow key={policeman.id}>
              {editingPolicemanId === policeman.id ? (
                <>
                  <TableCell>
                    <TextField
                      value={policeman.name}
                      fullWidth
                      onChange={(e) => handlePolicemanFieldChange(e, "name", policeman.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={policeman.cnp}
                      fullWidth
                      onChange={(e) => handlePolicemanFieldChange(e, "cnp", policeman.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={policeman.password}
                      fullWidth
                      onChange={(e) => handlePolicemanFieldChange(e, "password", policeman.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={policeman.officerId}
                      fullWidth
                      onChange={(e) => handlePolicemanFieldChange(e, "officerId", policeman.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={policeman.policeBadge}
                      fullWidth
                      onChange={(e) => handlePolicemanFieldChange(e, "policeBadge", policeman.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={policeman.grade}
                      fullWidth
                      onChange={(e) => handlePolicemanFieldChange(e, "grade", policeman.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleUpdatePoliceman(policeman.id)}>
                      Save
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{policeman.name}</TableCell>
                  <TableCell>{policeman.cnp}</TableCell>
                  <TableCell>{policeman.password}</TableCell>
                  <TableCell>{policeman.officerId}</TableCell>
                  <TableCell>{policeman.policeBadge}</TableCell>
                  <TableCell>{policeman.grade}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleEditPoliceman(policeman.id)}>
                      Edit
                    </Button>
                    <Button variant="outlined" onClick={() => handleDeletePoliceman(policeman.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSearchAll} sx={{ mb: 2 }}>
          Search All
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Add Policeman</Typography>
        <TextField
          label="Name"
          value={newPoliceman.name}
          onChange={(e) => setNewPoliceman({ ...newPoliceman, name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="CNP"
          value={newPoliceman.cnp}
          onChange={(e) => setNewPoliceman({ ...newPoliceman, cnp: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Password"
          value={newPoliceman.password}
          onChange={(e) => setNewPoliceman({ ...newPoliceman, password: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Officer ID"
          value={newPoliceman.officerId}
          onChange={(e) => setNewPoliceman({ ...newPoliceman, officerId: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Police Badge"
          value={newPoliceman.policeBadge}
          onChange={(e) => setNewPoliceman({ ...newPoliceman, policeBadge: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Grade"
          value={newPoliceman.grade}
          onChange={(e) => setNewPoliceman({ ...newPoliceman, grade: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddPoliceman}>
          Add Policeman
        </Button>
      </Box>
    </Box>
  );
};

export default PPersonal;
