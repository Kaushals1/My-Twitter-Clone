import React,{useContext} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from "./App";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop() {
  const globalState = useContext(GlobalState);

  const classes = useStyles();
  const handleClose = () => {
    globalState.dispatch({ type: "UPDATE_BDROP", payload: false });

  };
 

  return (
    <div>
      
      <Backdrop  className={classes.backdrop} open={globalState.state.bdrop} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
