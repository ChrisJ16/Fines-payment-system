import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack } from "@mui/material";
import axiosInstance from "../axios";

const PMPersonal = () => {
  const [postmen, setPostmen] = useState([]);
  const [editingPostmanId, setEditingPostmanId] = useState("");
  const [newPostman, setNewPostman] = useState({ name: "", cnp: "", password: "", postmanId: "", postmanBadge: "", experience: "" });
  

  useEffect(() => {
    handleSearchAll();
     // Establish WebSocket connection
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

  const handleEditPostman = (postmanId) => {
    setEditingPostmanId(postmanId);
  };

  const handlePostmanFieldChange = (e, fieldName, postmanId) => {
    const updatedPostmen = postmen.map((postman) => {
      if (postman.id === postmanId) {
        return {
          ...postman,
          [fieldName]: e.target.value,
        };
      }
      return postman;
    });

    setPostmen(updatedPostmen);
  };

  const handleUpdatePostman = () => {
    const updatedPostman = postmen.find((postman) => postman.id === editingPostmanId);

    axiosInstance
      .put(`/postman/${editingPostmanId}`, updatedPostman)
      .then((response) => {
        setPostmen((prevState) =>
          prevState.map((postman) =>
            postman.id === editingPostmanId ? response.data : postman
          )
        );
        setEditingPostmanId("");

        addActivity(`(Postman): Updates postman with id ${editingPostmanId}`);
      })
      .catch((error) => {
        console.error("Error updating postman:", error);
      });
  };

  const handleDeletePostman = (postmanId) => {
    axiosInstance
      .delete(`/postman/${postmanId}`)
      .then(() => {
        setPostmen((prevState) => prevState.filter((postman) => postman.id !== postmanId));

        addActivity(`(Postman): Deleted postman with id ${postmanId}`);
      })
      .catch((error) => {
        console.error("Error deleting postman:", error);
      });
  };


  const handleAddPostman = () => {
    const newPostmanData = {
      name: newPostman.name,
      password: newPostman.password,
      cnp: newPostman.cnp,
      postmanId: newPostman.postmanId,
      postmanBadge: newPostman.postmanBadge,
      experience: newPostman.experience,
    };

    axiosInstance
      .post("/addPostman", newPostmanData)
      .then((response) => {
        setNewPostman({ name: "", cnp: "", password: "", postmanId: "", postmanBadge: "", experience: "" });

        handleSearchAll();

        addActivity(`(Postman): Added a new postman`);
      })
      .catch((error) => {
        console.error("Error adding new postman:", error);
      });

      
  };

  const handleSearchAll = () => {
    axiosInstance
      .get("/getPostman")
      .then((response) => {
        setPostmen(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching postmen:", error);
      });
  };

  const [searchPostman, setSearchPostman] = useState({ name: "", cnp: "", experience: "" });

const handleSearchUserByCriteria = () => {
  axiosInstance
    .get("/getPostman")
    .then((response) => {
      const filteredUsers = response.data.filter((item) =>
        item.name.includes(searchPostman.name) &&
        item.cnp.includes(searchPostman.cnp) &&
        String(item.experience).includes(searchPostman.experience)
      );
      console.log(filteredUsers);
      setPostmen(filteredUsers);
    })
    .catch((error) => {
      console.error("Error fetching postmen:", error);
    });
};

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Postmen
      </Typography>
      <TextField
          label="Name"
          value={searchPostman.name}
          onChange={(e) => setSearchPostman({ ...searchPostman, name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="CNP"
          value={searchPostman.cnp}
          onChange={(e) => setSearchPostman({ ...searchPostman, cnp: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Experience"
          value={searchPostman.experience}
          onChange={(e) => setSearchPostman({ ...searchPostman, experience: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handleSearchUserByCriteria}>
          Search Postman
        </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNP</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Postman ID</TableCell>
              <TableCell>Postman Badge</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postmen.map((postman) => (
              <TableRow key={postman.id}>
                {editingPostmanId === postman.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={postman.name}
                        fullWidth
                        onChange={(e) => handlePostmanFieldChange(e, "name", postman.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={postman.cnp}
                        fullWidth
                        onChange={(e) => handlePostmanFieldChange(e, "cnp", postman.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={postman.password}
                        fullWidth
                        onChange={(e) => handlePostmanFieldChange(e, "password", postman.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={postman.postmanId}
                        fullWidth
                        onChange={(e) => handlePostmanFieldChange(e, "postmanId", postman.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={postman.postmanBadge}
                        fullWidth
                        onChange={(e) => handlePostmanFieldChange(e, "postmanBadge", postman.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={postman.experience}
                        fullWidth
                        onChange={(e) => handlePostmanFieldChange(e, "experience", postman.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleUpdatePostman(postman.id)}>
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{postman.name}</TableCell>
                    <TableCell>{postman.cnp}</TableCell>
                    <TableCell>{postman.password}</TableCell>
                    <TableCell>{postman.postmanId}</TableCell>
                    <TableCell>{postman.postmanBadge}</TableCell>
                    <TableCell>{postman.experience}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => handleEditPostman(postman.id)}>
                          Edit
                        </Button>
                        <Button variant="outlined" onClick={() => handleDeletePostman(postman.id)}>
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
        <Button variant="contained" onClick={handleSearchAll} sx={{ mb: 2 }}>
          Search All
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Add Postman</Typography>
        <TextField
          label="Name"
          value={newPostman.name}
          onChange={(e) => setNewPostman({ ...newPostman, name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="CNP"
          value={newPostman.cnp}
          onChange={(e) => setNewPostman({ ...newPostman, cnp: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Password"
          value={newPostman.password}
          onChange={(e) => setNewPostman({ ...newPostman, password: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Postman ID"
          value={newPostman.postmanId}
          onChange={(e) => setNewPostman({ ...newPostman, postmanId: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Postman Badge"
          value={newPostman.postmanBadge}
          onChange={(e) => setNewPostman({ ...newPostman, postmanBadge: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Experience"
          value={newPostman.experience}
          onChange={(e) => setNewPostman({ ...newPostman, experience: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddPostman}>
          Add Postman
        </Button>
      </Box>
    </Box>
  );
};

export default PMPersonal;