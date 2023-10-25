import React from "react";
import axiosInstance from "../axios";
import {Button, Container, TextField, Grid, Box, Typography} from "@mui/material";
import {Route, useNavigate} from "react-router-dom";
import User from "../User";
import { LoginRounded, Payment } from "@mui/icons-material";

/*function MyButton() {
    const [count, setCount] = useState(0);
    function handleCLick() {
      setCount(count + 1);
    }
    return (
      <Container maxWidth="sm">
          <div>
              <Grid>
                  <form>
                      <Button
                          //onClick={handleCLick}
                          type="button"
                          fullWidth
                          variant="contained"
                          color="secondary"
                      >
                          Plateste amenda
                      </Button>
                  </form>
              </Grid>
          </div>
      </Container>
  );
  }*/

class Login extends React.Component {
  constructor() {
      super();
      this.state = {
        name: "",
        password: ""
      };
  }

  handleInput = event => {
      const {value, name} = event.target;
      this.setState({
          [name]: value
      });
      console.log(value);
  };

  //sumbit function for second button
    onSubmitFine = event => {
        event.preventDefault();
        window.location.replace("/fines");
        //console.log("Credentiale: " + credentials.username + " " + credentials.password);
    }


  onSubmitFun = event => {
      event.preventDefault();
      let credentials = {
          username: this.state.name,
          password: this.state.password
      }


      //console.log("Credentiale: " + credentials.username + " " + credentials.password);
      axiosInstance.post("/login", credentials)
          .then( 
              res => {
                  const val = res.data;
                  sessionStorage.userId = val.id
                  sessionStorage.username = val.username
                
                  if (val.id > 0 ) {
                      //alert("Logged in!");
                      axiosInstance.put(`/user/logIn/${val.id}`).then(
                            res => {
                                console.log(res);
                            }
                        ).catch(
                            error => {
                                console.log(error);
                            }
                        );

                      <Route exact path="/login" element={<User/>}/>
                      if(val.role === "policeman")
                      {
                          window.location.replace("/policeman");
                      }
                      if(val.role === "postman")
                      {
                          window.location.replace("/postman");
                      }
                        
                  }
                  else
                  {
                      alert("Eroare!");
                  }
              }
          )
          .catch(error => {
              console.log(error)
          })
  }

  
  render() {
      return (
          <Container maxWidth="sm">
              <div>
                  <Grid>
                      <form onSubmit={this.onSubmitFun}>
                        <Box sx={{ pt: 5 }} />
                        <Typography variant="h5" sx={{ m: 2 }}>
                            Welcome to the national fines payment system!
                        </Typography>
                        <Box sx={{ pt: 35 }}>
                          <TextField
                              sx={{ input: { color: 'purple' } }} 
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              InputLabelProps={{
                                style: {
                                    color: "purple"
                                }
                              }}
                              name="name"
                              autoComplete="string"
                              onChange={this.handleInput}
                              autoFocus
                          />
                          <TextField
                              sx={{ input: { color: 'purple' } }} 
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              InputLabelProps={{
                                style: {
                                    color: "purple"
                                }
                              }}
                              type="password"
                              id="password"
                              onChange={this.handleInput}
                              autoComplete="current-password"
                          />
                          <Button
                              startIcon={<LoginRounded />}
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                          >
                              Login
                          </Button>
                        </Box>
                      </form>
                      <form onSubmit={this.onSubmitFine}>
                      <Button
                            startIcon={<Payment />}
                            sx={{ marginTop: 2 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                          >
                              Plata Amenda
                          </Button>
                      </form>
                  </Grid>
              </div>
          </Container>
      );
  }
}

export default Login;