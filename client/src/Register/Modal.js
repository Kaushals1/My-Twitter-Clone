import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { GlobalState } from "../App";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import setAuthToken from "../setAuthToken";
import "./Modal.css";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Modal({ register, logout }) {
  const globalState = useContext(GlobalState);
  const logoutFunc = () => {
    setAuthToken(false);
    localStorage.removeItem("token");
    globalState.dispatch({ type: "UPDATE_LOGIN", payload: false });
    globalState.dispatch({ type: "UPDATE_POPUP", payload: false });
  };

  const handleClose = () => {
    globalState.dispatch({ type: "UPDATE_POPUP", payload: false });
    globalState.dispatch({ type: "UPDATE_BDROP", payload: false });

    window.location.reload();
  };
  const cl = () => {
    globalState.dispatch({ type: "UPDATE_POPUP", payload: false });
  };
  if (register) {
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={globalState.state.popup}
          className="modal__content"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          ></DialogTitle>
          <DialogContent dividers>
            <Typography className="modal__titl" gutterBottom>
              <h1> Your Twitter Account Was Successfully Created!</h1>
            </Typography>
            <Typography gutterBottom>
              <div className="login__link__modal__div">
                <Link
                  to="/login"
                  onClick={() => {
                    globalState.dispatch({
                      type: "UPDATE_POPUP",
                      payload: false,
                    });
                    globalState.dispatch({
                      type: "UPDATE_BDROP",
                      payload: false,
                    });
                  }}
                  exact={"true"}
                  className="login__link__modal"
                >
                  Click here to login!
                </Link>
              </div>
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={globalState.state.popup}
          className="modal__content"
        >
          <DialogContent dividers>
            <div className="logout__modal__main">
              <div className="logout__icon">
                <TwitterIcon />
              </div>
              <div className="logout__text">
                <h2>Log out of twitter?</h2>
                <p className="logout__text__p">
                  You can always log back in at any time.
                </p>
              </div>
              <div className="logout__buttons__div">
                <Button className="logout__buttons cancel" onClick={cl}>
                  Cancel
                </Button>
                <Button className="logout__buttons" onClick={logoutFunc}>
                  Log Out
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
