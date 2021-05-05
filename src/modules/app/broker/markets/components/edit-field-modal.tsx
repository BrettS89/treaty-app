import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'

const EditFieldModal = ({ editMarketField, isOpen, marketEditing, setIsOpen }) => {
  const [fieldValue, setFieldValue] = useState('');

  const editField = () => {
    if (fieldValue.length) {
      editMarketField(fieldValue);
      setFieldValue('');
    }
  }

  return (
    <Dialog open={isOpen}>
      <div style={{ height: 200, width: 400 }}>
        <div className="market-edit-modal">
          <DialogTitle id="form-dialog-title">Edit {marketEditing.field}</DialogTitle>
          <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              label={marketEditing.field}
              size="small"
              fullWidth
              style={{ paddingBottom: 20 }}
              onChange={(e) => setFieldValue(e.target.value)}
              value={fieldValue}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsOpen(false, null)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={editField}
              disableElevation={true}
            >
              Okay
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default EditFieldModal;
