import { useState } from 'react';
import useStyles from '../styles';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import { components } from '../config.json';

const ContractTerm = ({ onClose, setComponent, setTreaty, treaty }) => {
  const classes = useStyles();

  const [term, setTerm] = useState<string>(null);
  const [customTerm, setCustomTerm] = useState<string>(null);
  const [showInput, setShowInput] = useState<boolean>(false);

  const onSelect = (e): void => {
    if (e.target.value === 'other') {
      setTerm(null);
      setShowInput(true);
    } else {
      setCustomTerm(null);
      setShowInput(false);
      setTerm(e.target.value);
    }
  };

  const renderInput = () => {
    if (showInput) {
      return (
        <TextField
          label="Custom contract term"
          variant="outlined"
          size="small"
          onChange={e => setCustomTerm(e.target.value)}
        />
      );
    }
  };

  const onClickNext = (): void => {
    setTreaty({
      ...treaty,
      contract_term: term || customTerm,
    });

    setComponent(components.COVERAGE_RISKS);
  };

  return (
    <div className={classes.subComponent}>
      <>
        <DialogTitle id="form-dialog-title">What is the contract term?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1"  onChange={onSelect}>
              <FormControlLabel value="Annual" control={<Radio color="primary" />} label="Annual" />
              <FormControlLabel value="18 Months" control={<Radio color="primary" />} label="18 Months" />
              <FormControlLabel value="24 Months" control={<Radio color="primary" />} label="24 Months" />
              <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
            </RadioGroup>
          </FormControl>

          <div style={{ marginTop: 5 }}>
            {renderInput()}
          </div>
          
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
          disabled={!term && !customTerm}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default ContractTerm;
