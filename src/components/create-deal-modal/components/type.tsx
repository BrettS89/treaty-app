import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, Checkbox, FormHelperText, FormControlLabel } from '@material-ui/core';
import { components } from '../config.json';

const Type = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (e): void => {
    if (selected.includes(e.target.name)) {
      setSelected(selected.filter(v => v !== e.target.name));
    } else {
      setSelected([...selected, e.target.name]);
    }
  };

  const onClickNext = (): void => {
    setTreaty({
      ...treaty,
      treaty_type: selected,
    });

    setComponent(components.INSURANCE_TYPE);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">What type of treaty is this?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormHelperText>Select all that apply</FormHelperText>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" className={classes.checkbox} checked={selected.includes('Proportional')} onChange={onSelect} name="Proportional" />}
                label="Proportional"
              />
              <FormControlLabel
                control={<Checkbox color="primary" className={classes.checkbox} checked={selected.includes('Excess of loss')} onChange={onSelect} name="Excess of loss" />}
                label="Excess of loss"
              />
              <FormControlLabel
                control={<Checkbox color="primary" className={classes.checkbox} checked={selected.includes('Surplus')} onChange={onSelect} name="Surplus" />}
                label="Surplus"
              />
            </FormGroup>
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

export default Type;

