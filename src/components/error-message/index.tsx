import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../store/actions';
import { StoreState } from '../../store';

const useStyles = makeStyles({
  snackysnack: {
  },
});

const ErrorMessage = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: StoreState) => state.app);
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: ActionTypes.CLOSE_SNACKBAR });
  };

  return (
    <Snackbar
      className={classes.snackysnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={app.snackbarOpen}
      onClose={handleClose}
      autoHideDuration={2500}
      key={'top' + 'center'}
    >
       <MuiAlert
        elevation={6}
        variant="filled"
        severity="error"
      >
        {app.error.message}
      </MuiAlert>
    </Snackbar>
  )
};

export default ErrorMessage;
