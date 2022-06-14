
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import MaxWidthDialog from "./View";

import Create from "./Create";
import { TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            display: "flex",
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function UserList() {
  const [rows, setRows] = useState([]); //this is for user list table containing whole data fetched from API
  const [edit, setEdit] = useState(); //this is for edit pop-up
  const [open1, setOpen1] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg"); // setting the width of popup to default
  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(false); //setting status to active or suspend
  const [open, setOpen] = React.useState(false);
  const [suspend, setSuspend] = React.useState(true); //changing suspend button to re-activate and vice-versa
  const [delUser, setDelUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userEdit, setUserEdit] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(null);
  const [editScreen, setEditScreen] = useState(false);
  const [open3, setOpen3] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusdd, setStatusdd] = React.useState("");
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    get(searchText); //this function is fetching user data
  }, [status, searchText]); // yha pe array me jo bhi hum pass krte usse to data fetch hota fir passed value m agr kuch chnage hua to firse dekhega vo kya change h

  async function get(e) {
    const res = await fetch(`http://localhost:3010/data?q=${e}`); // data fetch yha ho rha h
    const data = await res.json();

    // ye get function api s data fetch bhi kr rha h or search bhi
    // search k lie humne bus q pass kia h with some value as e here

    setRows(data); //setting all data inside rows which is an []
    setTemp(data); // ye yha filtering k lie use hora, kuch ni bus ek state or bnai h jisme ho kya rha h ki original
    //data na change ho isliye ek or state rkhi h temp nam ki
  }
  function filtering(el) {
    console.log("el",el)
    //ek parameter pass krre kuch bhi jo dropdown m select hoga
    if (el === "All") {
      //if value==all
      return setRows(temp); //then return those values and set them to temp
    }
    const newData = temp.filter((e) => {
      //now filter from temp where
      return e.status === el; //status value == parameter from dropdown
    });
    console.log(newData)
    setRows(newData);
  }
  const handleStatusdd = (e) => {
    setStatusdd(e.target.value);
  };

  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    setOpen1(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose1}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function toogleStatus() {
    setStatus(false);
  }
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null); //helping in closing the pop-up's by clicking on anywhere
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleshut = (e) => {
    setOpen(false);
  };

  function deleteUsers(e) {
    console.log(e)
    fetch(`http://localhost:3010/data/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json().then((ress) => {
          setAnchorEl(false);
          get();
          console.log("delete");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //patch function for updating status of user i.e. active,suspend

  function patch(e) {
    
    fetch(`http://localhost:3010/data/${delUser}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: e,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res.json().then((ress) => {
          setAnchorEl(false);
          get();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // edit user info

  //suspend and re-active
  const handleSuspend = () => {
    setSuspend(!suspend);
    setOpen1(true);
  };
  // console.log("edit",edit)
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 140,
      disableClickEventBubbling: true,
    },
    {
      field: "first_name",
      headerName: "Name",
      width: 170,
      disableClickEventBubbling: true,
    },

    {
      field: "email",
      headerName: "E-mail",
      width: 330,
      disableClickEventBubbling: true,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 240,
      disableClickEventBubbling: true,
    },
    { field: "status", headerName: "Status", width: 120, sortable: false },

    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (e) => {
        //rendercell is helping setting icon three dot

        return (
          <>
            <Box
              onClick={() => {
                if (e.row.status === "Active") {
                  setButtonStatus(true);
                } else {
                  setButtonStatus(false);
                }
                // editFetch(e.id);
                setUserEdit(e.id);
                setOpen3(false);
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon />
                <div>
                  <AccountCircle sx={{ marginLeft: 140 }} />
                </div>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "right",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  variant="text"
                  onClick={() => {
                    handleClickOpen();
                    setStatus(true);
                    setEditScreen(true);
                    handleClose(``);
                  }}
                >
                  Edit
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleSuspend();
                    handleClick1();
                  }}
                >
                  {!buttonStatus ? (
                    <div
                      onClick={() => {
                        patch("Active");
                        toast.success("User activated successfully", {
                          position: "bottom-right",
                        });
                      }}
                    >
                      Re-Activate
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        patch("Suspend");

                        toast.success("User suspended successfully", {
                          position: "bottom-right",
                        });
                      }}
                    >
                      Suspend
                    </div>
                  )}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    if (
                      window.confirm(
                        "You will not be able to reactivate the user and retrieve their information. Are you sure you want to proceed"
                      )
                    ) {
                      deleteUsers(delUser);
                      toast.error("User de-activated successfully", {
                        position: "bottom-right",
                      });
                    }
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </>
        );
      },
    },
  ];
  const [id, setId] = React.useState("");

  return (
    <div style={{ height: 700, width: "100%" }}>
      <ToastContainer />
      <Box display="flex" justifyContent={"space-between"}>
        <div style={{ display: "flex" }}>
          <Typography marginTop="15px" variant="h5">
            User List
          </Typography>

          <TextField
            fullWidth
            style={{ marginLeft: "50px", width: "500px", height: "10px" }}
            label="Search"
            variant="standard"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl sx={{ width: 150, marginRight: 3 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusdd}
              label="Status"
              onChange={handleStatusdd}
            >
              <MenuItem
                value={"All"}
                onClick={() => {
                  filtering("All");
                }}
              >
                All
              </MenuItem>
              <MenuItem
                value={"Active"}
                onClick={() => {
                  filtering("Active");
                }}
              >
                Active
              </MenuItem>
              <MenuItem
                value={"Suspend"}
                onClick={() => {
                  filtering("Suspend");
                }}
              >
                Suspend
              </MenuItem>
            </Select>
          </FormControl>
          <Create />
        </div>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        displayRowCheckbox={false}
        onCellClick={(e) => {
          if (e.value !== undefined) {
            setStatus(true);
          }

          setDelUser(e.row.id);
          setId(e.id);

          setOpen3(true);
        }}
      />

      {status ? (
        <MaxWidthDialog
          open3={open3}
          toogleStatus={toogleStatus}
          setEditScreen={setEditScreen}
          editScreen={editScreen}
          id={id}
          deleteUsers={deleteUsers}
        />
      ) : null}
    </div>
  );
}

export default UserList;
