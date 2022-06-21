import * as React from "react";
import InfoIcon from '@mui/icons-material/Info';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Popover from '@mui/material/Popover';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';



export default function Create({get}) {
  const [open, setOpen] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [ibutton,setIbutton]=useState(null)

  // this is inside create user button close  button
  const handleClose = () => {
    setOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };
  // this is for user list create user button
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleIclose = () => {
    setIbutton(null);
  };
  const handleIopen=(e)=>{
    setIbutton(e.currentTarget)
  }

  const openI = Boolean(ibutton);
  const id = openI ? 'simple-popover' : undefined;


  // console.log(firstName, lastName, email, phone);

  // validating the email entered is in right format or not
  function Validate() {
    // const regex =
    // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    const regex    = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//for email

    const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 

    const passw    = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/

    //   if (firstName == "" || email == "" || phone == "" || password == "") {
    //   alert("fill all fields ");
    // } 
    // else {
      if (firstName.trim().length === 0) {
        alert("Firstname can't be empty");
        return false;//alert k bad return false krne se pop-up gyab nhi hota
      } 
      if (!email || regex.test(email) === false) {
        alert("Email is not valid");
        return false;
      }
      // else{
        if(!phone || phoneNum.test(phone) === false) {
          alert ('phone number is not valid')
          return false
        }
      // }
      else{
        if(!password||passw.test(password)===false){
          alert('password criteria does not match')
          return false;
        }
      // }
      store();
      handleClose();
      return true;
    }
  }

  // this is a function which is given on create user button inside create user pop-up
  // on clicking create user this function will get called checking the if else cond and posting data to server
  async function store() {

    //https://backend-ai-postgres.herokuapp.com/user

    //
    
    // else {
      const response = await fetch("http://localhost:3010/data", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phone,
        }),
      }).then((res) => {
        res.json().then((ress) => {
          console.log("created")
          get()
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  // }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Create User
      </Button>
      <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{display:"flex",justifyContent:"space-between"}}>Create User
        <CloseIcon onClick={handleClose}/>
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "45ch" },
              }}
              noValidate
              autoComplete="off"
            >

             
              <TextField
                required
                variant="outlined"
                label="Firstname"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                
              />
              <TextField
                variant="outlined"
                label="Lastname"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                required
                variant="outlined"
                label="E-mail"
                helperText="Email ID entered here will be the username"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                required
                id="outlined-password-input"
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoIcon 
                      aria-describedby={id}
                      onClick={handleIopen}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                />
                <Popover
                      id={id}
                      open={openI}
                      ibutton={ibutton}
                      onClose={handleIclose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                    >
                      
                      <Box >
                      <CloseIcon sx={{marginLeft:"540px"}} onClick={handleIclose}/>
                      <ul style={{margin:"20px"}}>
                        <h4>Password criteria should be as below:</h4>
                        <li>Should contain at least 6 characters</li>
                        <li>Should be alphanumeric</li>
                        <li>Should contain at least one special character</li>
                        <li>Should contain one letter in caps</li>
                        <li>Should have a maximum character limit of 15 characters</li>
                      </ul>
                      
                      </Box>
                    </Popover>
                
              <TextField
                required
                variant="outlined"
                label="Phone Number"
                type={"number"}
                onChange={(e) => setPhone(e.target.value)}
                
              />




            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              Validate();
            }}
          >
            Create User
          </Button>
          {/* <Button variant="contained" onClick={handleClose}>
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
