import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import useStyles from '../styles';

const Title = ({ onClose }) => {
  const classes = useStyles();

  return (
    <>
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
        // onChange={e => setDealTitle(e.target.value)}
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
        // onClick={createDeal}
        disableElevation={true}
      >
        Create
      </Button>
    </DialogActions>
    </>
  );
};

export default Title;
