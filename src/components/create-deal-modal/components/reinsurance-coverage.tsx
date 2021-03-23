import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { components } from '../config.json';

const ReinsuranceCoverage = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [coverage, setCoverage] = useState<string>(null);

  const onSelect = (e): void => {
    setCoverage(e.target.value);
  };

  const onClickNext = (): void => {
    setTreaty({
      ...treaty,
      reinsurance_coverage: coverage,
    });

    setComponent(components.EXCESS_TREATY);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">Is the reinsurance coverage risks attaching or losses ocurring durring?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1"  onChange={onSelect}>
              <FormControlLabel value="Risks attaching" control={<Radio color="primary" />} label="Risks Attaching" />
              <FormControlLabel value="Losses ocurring during" control={<Radio color="primary" />} label="Losses ocurring durring" />
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
          disabled={!coverage}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default ReinsuranceCoverage;
