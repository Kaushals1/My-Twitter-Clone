import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalState } from "../../App";
import "./Snackbar.css";
function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const globalState = useContext(GlobalState);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    globalState.dispatch({ type: "UPDATE_SNACK", payload: false });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={globalState.state.snack}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Your tweet has been added!
        </Alert>
      </Snackbar>
    </div>
  );
}
