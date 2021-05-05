import { useState } from 'react';
import { Button, Typography, TextField } from '@material-ui/core';
import useStyles from '../styles';
import { Deal as DealType } from '../../../../../types/services/insurance'; 

const MarketRow = ({ market, upsertMarketNote }) => {
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [editedNote, setEditedNote] = useState('');

  const upsertNote = () => {
    upsertMarketNote(market.account_id, editedNote);
    setEditedNote('');
    setEditingNotes(false);
  };

  const renderNotes = () => {
    if (editingNotes) {
      return (
        <div style={{ width: '100%' }}>
          <TextField
            label="Notes"
            value={market.note}
            onChange={e => setEditedNote(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={2}
          />
          <div style={{ marginTop: 7 }}>
            <Button color="primary" onClick={upsertNote}>Save</Button>
            <Button onClick={() => setEditingNotes(false)}>Cancel</Button>
          </div>
        </div>
      );
    } else {
      return (
        <Typography style={{ fontSize: 13 }}>
          {market.notes ?? 'Notes'}
        </Typography>
      );
    }
  }

  return (
    <div className="Deal-markets-market">
      <div className="Deal-markets-toprow">
        <div style={{ width: 200  }}>
        <Typography style={{ fontSize: 14, fontWeight: 600 }}>
          {market.account.name}
        </Typography>
        </div>
        <Button color="primary" onClick={() => setEditingNotes(true)}>
          Edit notes
        </Button>
        <div style={{ maxWidth: 120, minWidth: 120 }}>
          <Button color="primary">
            {market.name ?? 'No contact'}
          </Button>
        </div>
      </div>
      <div>
        <div className="Deal-markets-top">
          {renderNotes()}
        </div>
      </div>
    </div>
  );
};

export default MarketRow;
