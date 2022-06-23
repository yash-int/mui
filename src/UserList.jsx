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
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

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
  const [temp, setTemp] = useState([]);
  const [edit, setEdit] = useState(); //this is for edit pop-up
  const [open1, setOpen1] = React.useState(false);
  const [status, setStatus] = useState(false); //setting status to active or suspend
  const [open, setOpen] = React.useState(false);
  const [editScreen, setEditScreen] = useState(false);
  // const [maxWidth, setMaxWidth] = React.useState("md"); // setting the width of popup to default
  // const [fullWidth, setFullWidth] = React.useState(true);
  const [suspend, setSuspend] = React.useState(true); //changing suspend button to re-activate and vice-versa
  const [open3, setOpen3] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [delUser, setDelUser] = useState(null);
  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [phone, setPhone] = useState(null);
  const [userEdit, setUserEdit] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusdd, setStatusdd] = React.useState("");
  const [buttonStatus, setButtonStatus] = useState(null);
  const [clicked,setClicked]=useState(false)


  
  const handleclicked=()=>{
    setClicked(true)
  }
  
  useEffect(()=>{
get()
  },[])
  
  useEffect(() => {
    searchFilter(searchText); //this function is fetching user data
  }, [searchText]); // yha pe array me jo bhi hum pass krte usse to data fetch hota fir passed value m agr kuch chnage hua to firse dekhega vo kya change h
  
  async function get(e) {
    // const res = await fetch(`http://localhost:3010/data?q=${e}&_sort=first_name&_order=asc`);
    const res = await fetch(`https://backend-ai-postgres.herokuapp.com/users`);
    
    // const {q} = req.query

    // data fetch yha ho rha h
    const data = await res.json();
    // console.log("All Users",data.Users);
    
    // ye get function api s data fetch bhi kr rha h or search bhi
    // search k lie humne bus q pass kia h with some value as e here
    // console.log(data[0].first_name);
    setRows(data.Users); //setting all data inside rows which is an []
    setTemp(data.Users); // ye yha filtering k lie use hora, kuch ni bus ek state or bnai h jisme ho kya rha h ki original
    //data na change ho isliye ek or state rkhi h temp nam ki
  }
  const searchFilter=(el)=>{
    let result = rows.filter((e)=>{
      return e.first_name[0] && e==el

    })
    console.log("res",result);

  }
  


  console.log('meri bat sun',rows);


  function filtering(el) {
    // console.log("el", el);
    //ek parameter pass krre kuch bhi jo dropdown m select hoga
    //if el = all h to setrows m sara k sara data vse hi set hojyga jsa h 
    if (el === "All") {
      //if value==all
      return setRows(temp); //then return those values and set them to temp
    }
    // pr agr el active ya suspend h toh hum temp me se filter krege or respective result ko setRows me newdata bhjge set kr dege
    const newData = temp.filter((e) => {
      //now filter from temp where
      return e.user_status === el; //status value == parameter from dropdown
    });
    // console.log(newData);
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
    // console.log(e);
    fetch(`http://localhost:3010/data/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json().then((ress) => {
          setAnchorEl(false);
          get(searchText);
          // console.log("delete");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //patch function for updating status of user i.e. active,suspend

  function patch(e,el) {
    console.log(e,el)
    // fetch(`http://localhost:3010/data/${el}`, {
    fetch(`https://backend-ai-postgres.herokuapp.com/user/edit/${el}`, {
      method: "PUT",
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
          get(searchText);
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
      field:  "full_name",//yha pr first name or last name dono pass krne
      headerName: "Name",
      width: 170,
      disableClickEventBubbling: true,
      valueGetter: (params) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },

    {
      field: "email_id",
      headerName: "E-mail",
      width: 330,
      disableClickEventBubbling: true,
    },
    {
      field: "contact_no",
      headerName: "Phone Number",
      width: 240,
      disableClickEventBubbling: true,
    },
    { field: "user_status",
      headerName: "Status",
      width: 120,
      sortable: false 
    },

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
                if (e.row.user_status === "Active") {
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
                        patch("Active",delUser);
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
                        patch("Suspend",delUser);//FUNCTION KA NAM H PATCH

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
    <div style={{flexGrow: 1,}}>
      <div
        style={{
          width: "100%",
          // marginBottom:"10px",
          backgroundColor: "white",
          borderBottom:"1px solid black",
          height: "120px",
          position: "sticky",
          top:0,
          zIndex:10
        }}
      >
        <ToastContainer />
        <Box 
        // onClick={()=>{setClicked(false)}}
        // setClicked={"false"}
        display="flex" justifyContent={"space-between"} 
        >
          <div style={{ display: "flex", marginBottom:"10px" }}>
            <Typography marginTop="15px" variant="h5">
              User List
            </Typography>

            <TextField
              fullWidth
              style={{ marginLeft: "50px", width: "500px", height: "10px" }}
              label="Search"
              onClick={handleclicked}
              // onClose={handleClose}
              
              helperText= {clicked ? "Your search will look into user ID, first name, last name, email ID, company and alternate person":""}
              variant="standard"
              onChange={(e) => {

                setSearchText(e.target.value);
               
              }}
            />
          </div>

              {/* this is dropdown div */}

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

            {/* this is create user */}
            <Create 
            // onClick={()=>{setClicked(false)}} 
            get={()=>{
              get("") // in get request we have passed a parameter that is why we are passing it here like this
            }} />
          </div>
        </Box>
      </div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
        style={{cursor:"pointer"}}
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          displayRowCheckbox={false}
          onCellClick={(e) => {
            if (e.value !== undefined) {
              setStatus(true);
            }
            // console.log("e",e) //row= material ui ki row

            setDelUser(e.row.id);//row?
            setId(e.id);
            setOpen3(true);

          }}
        />

        {status ? (
          <MaxWidthDialog
            get={get}
            open3={open3}
            toogleStatus={toogleStatus}
            setEditScreen={setEditScreen}
            editScreen={editScreen}
            id={id}
            deleteUsers={deleteUsers}
            patch={patch}
            buttonStatus={buttonStatus}
          />
        ) : null}
      </div>
    </div>
  );
}

export default UserList;
