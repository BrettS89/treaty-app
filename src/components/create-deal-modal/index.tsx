import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState, ActionTypes } from '../../store';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  textInput: {
    marginBottom: 10,
  },
  inputButton: {
    marginBottom: 15,
  },
  content: {
    width: 500,
  }
});

const CreateDealModal = (props: any) => {
  const dispatch = useDispatch();
  const appState = useSelector((state: StoreState) => state.app);
  const user = useSelector((state: StoreState) => state.user);
  const classes = useStyles();
  
  const [dealTitle, setDealTitle] = useState<string>('');

  const onClose = (): void => {
    dispatch({ type: ActionTypes.TOGGLE_DEAL_MODAL, payload: false });
  };

  const createDeal = (): void => {
    dispatch({
      type: ActionTypes.CREATE_DEAL,
      payload: {
        data: {
          title: dealTitle,
          user_id: user.details._id,
          account_id: user.details.account_id,
        },
        navigate: props.history.push,
      },
    });
  };

  return (
    <Dialog open={appState.dealModalOpen}>  
      <DialogTitle id="form-dialog-title">Create a new deal</DialogTitle>
      <DialogContent className={classes.content}>

        <TextField
          className={classes.textInput}
          name="title"
          margin="dense"
          id="title"
          label="Title"
          type="text"
          variant="outlined"
          autoComplete="off"
          onChange={e => setDealTitle(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={createDeal}
          disableElevation={true}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default withRouter(CreateDealModal);
