import React, { useState, useEffect } from "react";
import {
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { People, Description, Person, LoginOutlined, ManageAccountsSharp, ViewAgenda, BookOnline, BookOutlined } from "@mui/icons-material";
import { css } from '@emotion/react';
import PCivil from "./pcivil";
import Pfines from "./pfines";
import PPersonal from "./pppersonal";
import PMPersonal from "./pmpersonal";
import Active from "./activity";
import axiosInstance from "../axios";
import Plaws from "./plaws";

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

  const Policeman = () => {
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
      
      //console.log(item);
      if(item === "Civilians")
        setSelectedItem(<PCivil />);
      if(item === "Fines")
        setSelectedItem(<Pfines />);
      if(item === "Policemen personal")
        setSelectedItem(<PPersonal />);
      if(item === "Manage other accounts")
        setSelectedItem(<PMPersonal />);
      if(item === "Activity")
        setSelectedItem(<Active />);
      if(item === "Laws")
        setSelectedItem(<Plaws />);      
      if(item === "Logout"){
        handleLogOut();
        window.location.replace("/login");
      }
    };

    const menuItems = [
      {
        text: "Civilians",
        icon: <People />,
      },
      {
        text: "Fines",
        icon: <Description />,
      },
      {
        text: "Policemen personal",
        icon: <Person />,
      },
      {
        text: "Manage other accounts",
        icon: <ManageAccountsSharp />,
      },
      {
        text: "Activity",
        icon: <ViewAgenda />,
      },
      {
        text: "Laws",
        icon: <BookOutlined />,
      },
      {
        text: "Logout",
        icon: <LoginOutlined />,
      },
    ];

    return (
      <div>
        <Grid container spacing={2}>
            <Grid item xs={2}>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
              <Typography variant="h5" sx={{ m: 2 }}>
                Hi Policeman: {sessionStorage.username}
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

  export default Policeman;
