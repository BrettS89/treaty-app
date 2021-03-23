import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { components } from '../config.json';

const EffectiveDate = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [date, setDate] = useState<string>(null);

  const onSelectDate = (e): void => {
    setDate(e.target.value);
  };

  const onClickNext = (): void => {
    setTreaty({
      ...treaty,
      effective_date: date,
    });

    setComponent(components.CONTRACT_TERM);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">What is the proposed effective date of the agreement?</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            variant="outlined"
            onChange={onSelectDate}
          />
        </DialogContent>
      </>
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
          onClick={onClickNext}
          disableElevation={true}
          disabled={!date}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default EffectiveDate;
