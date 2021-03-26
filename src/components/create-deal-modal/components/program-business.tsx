import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { components } from '../config.json';

const ProgramBusiness = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [isProgramBusiness, setIsProgramBusiness] = useState<boolean>(null);

  const onSelect = (e): void => {
    if (e.target.value === 'yes') {
      setIsProgramBusiness(true);
    } else {
      setIsProgramBusiness(false);
    }
  };

  const onClickNext = (): void => {
    setTreaty({
      ...treaty,
      program_business: isProgramBusiness, 
    });

    setComponent(components.ADMITTED);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">Is this a program business?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1"  onChange={onSelect}>
              <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
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
          disabled={isProgramBusiness === null}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default ProgramBusiness;
