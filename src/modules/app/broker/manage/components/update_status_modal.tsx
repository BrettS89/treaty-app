import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Typography } from '@material-ui/core'

const UpdateStatusModal = ({ closeModal, isOpen, updateTimelineStatus }) => {
  const [status, setStatus] = useState(null);

  const onUpdateTimelineStatus = () => {
    updateTimelineStatus(status);
  }

  return (
    <Dialog open={isOpen}>
      <div style={{ width: 420 }}>
        <div className="market-edit-modal">
          <div style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 15, paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Update Task Status</Typography>
          </div>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1"  onChange={e => setStatus(e.target.value)}>
                <FormControlLabel value="not_started" control={<Radio color="primary" />} label="Not Started" />
                <FormControlLabel value="started" control={<Radio color="primary" />} label="Started" />
                <FormControlLabel value="complete" control={<Radio color="primary" />} label="Complete" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeModal}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation={true}
              disabled={!status}
              onClick={onUpdateTimelineStatus}
            >
              Okay
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateStatusModal;
