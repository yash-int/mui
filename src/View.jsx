import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";



//this is a dialog box function which let view screen appear 
export default function MaxWidthDialog({
  toogleStatus,
  id,
  editScreen,
  setEditScreen,
  deleteUsers,
  patch,
  buttonStatus,
  get,
 
}) {
  // console.log("Status",status)
  // console.log(buttonStatus, 'View');
  // const data = false;
  const [open, setOpen] = React.useState(true);
  // const [maxWidth, setMaxWidth] = React.useState("lg");
  // const [fullWidth, setFullWidth] = React.useState(true);
  const [edit, setEdit] = React.useState(editScreen);
  const [arr, setArr] = React.useState(null);
  const [userEdit, setUserEdit] = React.useState(null);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  // const [buttonStatus, setButtonStatus] = useState(null);

  // const [chkedit,setChkedit]=useState(false)
  React.useEffect(
    () => {
      get("");
    },
    [buttonStatus]
  );
  useEffect(()=>{
    Fetch(id)
  },[id])//everytime id changes you re-render it
  //function to get single user data to present it on view user screen
  async function Fetch(id) {
    // const rows = await fetch(`http://localhost:3010/data/${id}`); // this is helping in auto populating the data from backend as per user info present and showing that in edit pop-up auto filled
    const rows = await fetch(`https://backend-ai-postgres.herokuapp.com/user/${id}`); // this is helping in auto populating the data from backend as per user info present and showing that in edit pop-up auto filled
    const data = await rows.json();

    setArr(data);
    // console.log(data,'daaaattttaaa')
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhone(data.phone);
  }

  // console.log('arr from su',arr);

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
    // fetch(`http://localhost:3010/data/${id}`, {
    fetch(`https://backend-ai-postgres.herokuapp.com/user/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        contact_no: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res.json().then((ress) => {
          Fetch(id);
          get("")
          handleClose();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    Fetch(id);
  }, [id]);

  // this page has view user and edit user pop up

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Click to open whole row info
      </Button> */}

      {/* checking if arr is true then open pop-up of view user */}
      {arr ? (
        <Dialog
          // fullWidth={fullWidth}   if i uncomment these tow fullwidth and maxwidth
          // maxWidth={maxWidth}     then pop-up will expand

          open={open}
          onClose={handleClose}
        >
          <Box display={"flex"} justifyContent="space-between">
            <DialogTitle>{edit ? "Edit User" : "View User"} </DialogTitle>
            <CloseIcon
              onClick={() => {
                handleClose();
                setEditScreen(false);
              }}
            />
          </Box>

          <DialogContent aria-labelledby="responsive-dialog-title">
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
                  defaultValue={arr.user[0].first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    readOnly: edit ? false : true,
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Lastname"
                  defaultValue={arr.user[0].last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    readOnly: edit ? false : true,
                  }}
                />
                <TextField
                  disabled
                  variant="outlined"
                  label="E-mail"
                  defaultValue={arr.user[0].email_id}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  // disabled
                  variant="outlined"
                  label="Status"
                  defaultValue={arr.user[0].user_status}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  defaultValue={arr.user[0].contact_no}
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
                <div
                  onClick={() => {
                    editUser();
                    setEditScreen(false);
                  }}
                >
                  Save Changes
                </div>
              ) : (
                <div onClick={() => setUserEdit(id.id)}>Edit</div>
              )}
            </Button>

            {/* this is delete user with its functionality and everything */}
            {edit ? (
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  if (
                    window.confirm(
                      "You will not be able to reactivate the user and retrieve their information. Are you sure you want to proceed"
                    )
                  ) {
                    deleteUsers(id);
                    handleClose();
                    toast.error("User de-activated successfully", {
                      position: "bottom-right",
                    });
                  }
                  // setEditScreen(false)
                }}
              >
                Delete User
              </Button>
            ) : null}

            {/* {edit?  */}
            {edit ? (
              <div>
                {arr.user[0].user_status=='Active' ? (
                  <div
                    onClick={() => {
                      // setEditScreen(false);
                      handleClose()
                      patch("Suspend",id);
                   
                      toast.success("User suspended successfully", {
                        position: "bottom-right",
                      });
                    }}
                  >
                    <Button variant="contained">

                    Suspend
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      patch("Activate",id);
                      // setEditScreen(false);
                      handleClose()
                      
                      toast.success("User activated successfully", {
                        position: "bottom-right",
                      });
                    }}
                  >
                    <Button variant="contained">

                    Re-Activate
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
          </DialogActions>
        </Dialog>
      ) : null}
    </React.Fragment>
  );
}
