import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import axiosInstance from "../axios";

const Fines = () => {
  const [fines, setFines] = useState([
    { id: 1, date: "2022-01-01", note: "Speeding", sum: 200 },
    { id: 2, date: "2022-01-02", note: "Parking", sum: 100 },
    { id: 3, date: "2022-01-03", note: "Driving under the influence", sum: 500 },
  ]);
  const [selectedFines, setSelectedFines] = useState([]);
  const [totalToPay, setTotalToPay] = useState(0);
  const [selectedCnp, setSelectedCnp] = useState("");

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

  const handleVerify = event => {
    event.preventDefault();
    const selectedCNP = document.getElementById("cnp-input").value;
    
    setSelectedCnp(selectedCNP);
    try {
      axiosInstance.get(`/finesCnp/${selectedCNP}`).
        then(
          response => {
                  console.log(response.data);
                  setFines(response.data);
              })
              .catch(e => {
                  console.log(e);
              });
    } catch (error) {
      console.error("Error fetching fines:", error);
    }
  };

  const handleSelect = (fine) => {
    const index = selectedFines.findIndex((f) => f.id === fine.id);
    if (index !== -1) {
      setSelectedFines((prevSelectedFines) => prevSelectedFines.filter((f) => f.id !== fine.id));
      setTotalToPay((prevTotal) => prevTotal - fine.sum);
    } else {
      setSelectedFines((prevSelectedFines) => [...prevSelectedFines, fine]);
      setTotalToPay((prevTotal) => prevTotal + fine.sum);
    }
  };

  const handleBack = (event) => {
    window.location.replace("/login");
  };

  const handleVerifyAndPay = async () => {
      if (selectedFines.length === 0) {
        alert('No fines to pay.');
        return;
      }
      
      try {
        for (const fine of selectedFines) {
          await axiosInstance.put(`/user/${parseInt(fine.user.id)}/payFine/${parseInt(fine.id)}`);
          // Handle the response or any necessary actions after each request
          setFines((prevFines) => prevFines.filter((f) => f.id !== fine.id));
        }
  
        alert('All fines paid!');
        setSelectedFines([]);
        setTotalToPay(0);
      } catch (error) {
        console.error('Error paying fines:', error);
      }
      addActivity(`(Civillian): Civillian with CNP:${selectedCnp} paied some fines, using the platform`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Pay Fines
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
    <TextField id="cnp-input" label="CNP" sx={{ width: '10%' }} />
    <Button variant="contained" onClick={handleVerify} startIcon={<SearchIcon />} sx={{ width: "10%", mt: 2 }}>
        Verify
    </Button>
    </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No. Fine Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Sum</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine) => (
              <TableRow key={fine.id} selected={selectedFines.includes(fine)}>
                <TableCell>{fine.id}</TableCell>
                <TableCell>{new Date(fine.date).toLocaleDateString()}</TableCell>
                <TableCell>{fine.note}</TableCell>
                <TableCell>{fine.sum} RON</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleSelect(fine)}>
                    {selectedFines.includes(fine) ? "Deselect" : "Select"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Total to pay: {totalToPay} RON
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
      <Button variant="contained" onClick={handleVerifyAndPay} sx={{ mt: 2 }}>
        Pay selected fines
        </Button>
        <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
        Back
        </Button>
        </Box>
    </Box>
    );
};
export default Fines;
