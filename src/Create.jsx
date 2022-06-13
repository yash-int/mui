import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { FaBeer } from "react-icons/fa";

export default function Create() {
  const [open, setOpen] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  console.log(firstName, lastName, email, phone);

  // validating the email entered is in right format or not
  function Validate() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (firstName == "" || email == "" || phone == "" || password == "") {
      alert("fill all fields ");
    } else {
      if (!email || regex.test(email) === false) {
        alert("Email is not valid");
        return false;
      }
      store();
      handleClose();
      return true;
    }
  }

  // this is a function which is given on create user button inside create user pop-up
  // on clicking create user this function will get called checking the if else cond and posting data to server
  async function store() {
    if (
      firstName.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      alert("Please fill the required fields");
    } else {
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
      });
    }
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Create User
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create User</DialogTitle>
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
                helperText={firstName === "" ? "firstname is mandatory" : ""}

                // placeholder="type your first name"
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

              <Input
                required
                id="outlined-password-input"
                label="Password"
                startAdornment={
                  <InputAdornment position="end">
                    {/* <IoInformationCircle />
                     */}
                  </InputAdornment>
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                />
                {/* <FaBeer/> */}
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
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
