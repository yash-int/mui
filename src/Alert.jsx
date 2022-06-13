import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

  
function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const [suspend, setSuspend] = useState(true);

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(suspend ? "user activated" : "user suspended!", {
      variant,
    });
    setSuspend(!suspend);
  };
  const handleDeleteVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("User Deleted Successfully", {
      variant,
    });
    setSuspend(!suspend);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant("success")}>
        {suspend ? "reactivate" : "activate"}
      </Button>

      <Button onClick={handleDeleteVariant("error")}>
        {/* {suspend ? "reactivate" : "activate"} */}
        Delete User
      </Button>
    </React.Fragment>
  );
}
export default function IntegrationNotistack() {

  return (
    <SnackbarProvider maxSnack={1} autoHideDuration={1000}>
      <MyApp />
    </SnackbarProvider>
  );
}
