import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function MaxWidthDialog({ toogleStatus, id,editScreen,setEditScreen}) {
// console.log("Status",status)

  const data = false;
  const [open, setOpen] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [edit, setEdit] = React.useState(editScreen);
  const [arr, setArr] = React.useState(null);
  const [userEdit, setUserEdit] = React.useState(null);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  async function Fetch(id) {
    const rows = await fetch(`http://localhost:3010/data/${id}`); // this is helping in auto populating the data from backend as per user info present and showing that in edit pop-up auto filled
    const data = await rows.json();

    setArr(data);
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setPhone(data.phone)
  }


  //close button
  const handleClose = () => {
    toogleStatus();
    setOpen(false);
    setEdit(false);
  };

  //checking either edit or view
  const handleEdit = () => {
    setEdit(true);
  };
  // function to edit a user info
  const editUser = () => {
    fetch(`http://localhost:3010/data/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res.json().then((ress) => {
          Fetch(id)
          handleClose()
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    Fetch(id);
    
  }, [id,]);
console.log("arr",arr)
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Click to open whole row info
      </Button> */}

      {/* checking if arr is true then open pop-up of view user */}
      {arr ? (
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{edit ? "Edit User" : "View User"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* You can set my maximum width and whether to adapt or not. */}
            </DialogContentText>
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
                  variant="outlined"
                  label="Firstname"
                  defaultValue={arr.first_name}
                  onChange={(e)=>setFirstName(e.target.value)}
                  InputProps={{
                    readOnly: edit ? false : true,
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Lastname"
                  defaultValue={arr.last_name}
                  onChange={(e)=>setLastName(e.target.value)}
                  InputProps={{
                    readOnly: edit ? false : true,
                  }}
                />
                <TextField
                  variant="outlined"
                  label="E-mail"
                  defaultValue={arr.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Phone Number"
                  onChange={(e)=>setPhone(e.target.value)}
                  defaultValue={arr.phone_number}
                  InputProps={{
                    readOnly: edit ? false : true,
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleEdit}>
              {edit ? (
                <div onClick={() => {
                  editUser()
                  setEditScreen(false)}}>Save Changes</div>
              ) : (
                <div onClick={() => setUserEdit(id.id)}>Edit</div>
              )}
            </Button>
            <Button variant="contained" onClick={()=>{
              handleClose()
              setEditScreen(false)}}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </React.Fragment>
  );
}
