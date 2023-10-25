import React, { useState, useEffect} from "react";
import {
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { People, Description, Person, LogoutRounded, NotificationAdd, Newspaper } from "@mui/icons-material";
import PCivil from "./pcivil";
import PMPersonal from "./pmpersonal";
import PMFines from "./pmfines";
import { css } from '@emotion/react';
import axiosInstance from "../axios";
import Pmplaws from "./pmplaws";
import LawsView from "./pmpnotification";

const useStyles = () => {
  return {
    drawer: css`
      width: 300px;
    `,
    drawerPaper: css`
      width: 300px;
    `,
  };
};


const Postman = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = new WebSocket('ws://localhost:8080/socket');
    setSocket(newSocket);
    newSocket.addEventListener('message', handleIncomingMessage);
    // Cleanup WebSocket connection on unmount
    console.log("open");
    return () => {
      newSocket.close();
      console.log("close");
    };
  }, []);


  const handleIncomingMessage = (event) => {
    // Handle incoming WebSocket messages
    const message = event.data;
    const { content } = JSON.parse(message);
    alert(message);
  };

  const handleLogOut = () =>{
    axiosInstance.put(`/user/logOut/${sessionStorage.userId}`).then(
      res => {
              console.log(res);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    alert("LogOut");
  }

  const handleListItemClick = (item) => {
    setSelectedItem(item);
    if(item === "Logout"){
      handleLogOut();
      window.location.replace("/login");
    }
    if(item === "Civilians")
      setSelectedItem(<PCivil />);
    if(item === "Pay Fines")
      setSelectedItem(<PMFines />);
    if(item === "Postoffice Personal")
      setSelectedItem(<PMPersonal />);
    if(item === "Notifications")
      setSelectedItem(<LawsView />);
    if(item === "News")
      setSelectedItem(<Pmplaws />);
  };

  const menuItems = [
    {
      text: "Civilians",
      icon: <People />,
    },
    {
      text: "Pay Fines",
      icon: <Description />,
    },
    {
      text: "Postoffice Personal",
      icon: <Person />,
    },
    {
        text: "Notifications",
        icon: <NotificationAdd />,
    },
    {
        text: "News",
        icon: <Newspaper />,
    },
    {
    text: "Logout",
    icon: <LogoutRounded />,
    },
  ];

  return (
    <div>
      <Grid container spacing={2}>
          <Grid item xs={1.5}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
            <Typography variant="h5" sx={{ m: 2 }}>
              Hi Postman: {sessionStorage.username}
            </Typography>
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    sx={{
                      backgroundColor: selectedItem === item.text
                    }}
                    onClick={() => handleListItemClick(item.text)}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
          </Drawer>
        </Grid>
        <Grid item xs={10}>
          {selectedItem}
        </Grid>
      </Grid>
    </div>
  );
};

export default Postman;
