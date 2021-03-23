import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { components } from '../config.json';

const InsuranceType = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (e): void => {
    if (e.target.value === 'both') {
      setSelected(['Property', 'Casualty']);
    } else {
      setSelected([e.target.value]);
    }
  };

  const onClickNext = () => {
    setTreaty({
      ...treaty,
      insurance_type: selected,
    });

    setComponent(components.EFFECTIVE_DATE);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">What type of insurance?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1"  onChange={onSelect}>
              <FormControlLabel value="Property" control={<Radio color="primary" />} label="Property" />
              <FormControlLabel value="Casualty" control={<Radio color="primary" />} label="Casualty" />
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
          disabled={!selected.length}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default InsuranceType;
