import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';

const EditFieldModal = ({ addExisitngContact, addNewContact, editMarketField, isOpen, list, marketEditing, setIsOpen }) => {
  const market = list?.market_list?.find(m => m._id === marketEditing?.id);

  const [component, setComponent] = useState<'add-new' | 'select-existing'>('select-existing');
  const [selectedContact, setSelectedContact] = useState(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onAddNewContact = () => {
    addNewContact({
      name,
      title,
      email,
      phone,
    });
    setName('');
    setTitle('');
    setEmail('');
    setPhone('');
    setIsOpen(false);
  };

  const onAddExistingContact = () => {
    addExisitngContact(selectedContact._id);
    setIsOpen(false);
  };

  const renderOptionButton = () => {
    if (component === 'add-new') {
      return (
        <Button color="primary" onClick={() => setComponent('select-existing')}>
          Select existing contact
        </Button>
      );
    }
    return (
      <Button color="primary" onClick={() => setComponent('add-new')}>
        Add new contact
      </Button>
    )
  }

  const renderContent = () => {
    if (component === 'add-new') {
      return (
        <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <TextField
              variant="outlined"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              size="small"
              fullWidth
              style={{ marginBottom: 6 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle style={{ color: 'gray' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Title"
              size="small"
              fullWidth
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ marginBottom: 6 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkRoundedIcon style={{ color: 'gray' }} />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ display: 'flex' }}>
              <TextField
                variant="outlined"
                placeholder="Email"
                size="small"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ marginRight: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon style={{ color: 'gray' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                placeholder="Phone"
                size="small"
                fullWidth
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ marginLeft: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneRoundedIcon style={{ color: 'gray' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </DialogContent>
      );
    }
    return (
      <DialogContent>
        <Autocomplete
          id="combo-box-demo"
          size="small"
          options={market?.contacts ?? []}
          getOptionLabel={(option: any) => option.name}
          renderInput={(params) => <TextField size="small" {...params} label="Select a contact" variant="outlined" />}
          style={{ marginBottom: 10 }}
          onChange={(event, newValue) => setSelectedContact(newValue)}
        />
      </DialogContent>
    )
  }

  return (
    <Dialog open={isOpen}>
      <div style={{ width: 420 }}>
        <div className="market-edit-modal">
          <div style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 15, paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Select a Contact</Typography>
            {renderOptionButton()}
          </div>
          {renderContent()}
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
              disableElevation={true}
              onClick={() => {
                component === 'select-existing'
                  ? onAddExistingContact()
                  : onAddNewContact();
              }}
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
