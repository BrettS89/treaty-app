import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { components } from '../config.json';

const Admitted = ({ createDeal, onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [admitted, setAdmitted] = useState<string[]>([]);

  const onSelect = (e): void => {
    if (e.target.value === 'both') {
      setAdmitted(['Admitted', 'Non-Admitted']);
      setTreaty({
        ...treaty,
        admitted: ['Admitted', 'Non-Admitted'],
      });
    } else {
      setAdmitted([e.target.value]);
      setTreaty({
        ...treaty,
        admitted: [e.target.value],
      });
    }
  };

  const onClickNext = (): void => {
    createDeal();
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">Is the underlying portfolio business admitted or non-admitted?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1"  onChange={onSelect}>
              <FormControlLabel value="Admitted" control={<Radio color="primary" />} label="Admitted" />
              <FormControlLabel value="Non-Admitted" control={<Radio color="primary" />} label="Non-Admitted" />
              <FormControlLabel value="both" control={<Radio color="primary" />} label="Both" />
            </RadioGroup>
          </FormControl>          
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
          disabled={!admitted.length}
        >
          Finish
        </Button>
      </DialogActions>
    </div>
  );
};

export default Admitted;
