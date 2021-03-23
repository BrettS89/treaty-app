import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { components } from '../config.json';

const ExcessTreaty = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [isExcess, setIsExcess] = useState<boolean>(null);

  const onSelect = (e): void => {
    if (e.target.value === 'yes') {
      setIsExcess(true);
    } else {
      setIsExcess(false);
    }
  };

  const onClickNext = (): void => {
    setTreaty({
      ...treaty,
      excess_treaty: isExcess, 
    });

    setComponent(components.ADMITTED);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">Is this an excess treaty?</DialogTitle>
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
          disabled={isExcess === null}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default ExcessTreaty;
