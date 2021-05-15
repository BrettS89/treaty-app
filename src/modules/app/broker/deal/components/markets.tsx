import { useState } from 'react';
import { Button, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../styles';
import MarketRow from './market-row'
import { Deal as DealType } from '../../../../../types/services/insurance'; 

const DealMarkets = ({ deal, lists, marketNotes, updateMarketList, upsertMarketNote }) => {
  const classes = useStyles();
  const list = lists.find(l => l._id === deal.market_list_id);

  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  if (list) {
    list.market_list.forEach(m => {
      m.notes = marketNotes[m.account_id]?.notes ?? null;
    });
  }

  const removeList = () => {
    updateMarketList(null, true);
    setIsRemoving(false);
  }

  const renderMarkets = () => {
    return (list?.market_list ?? []).map(m => (
      <MarketRow
        key={m._id}
        market={m}
        upsertMarketNote={upsertMarketNote}
      />
    ));
  };

  const renderRemove = () => {
    if (isRemoving) {
      return (
        <div className="row-centered">
          <Typography className={classes.removeMarketListText}>
            Are you sure? (market notes will be lost)
          </Typography>
          <Button color="primary" onClick={removeList}>Yes</Button>
          <Button onClick={() => setIsRemoving(false)}>Cancel</Button>
        </div>
      );
    }
    return (
      <Button color="primary" onClick={() => setIsRemoving(true)}>
        Replace market list
      </Button>
    )
  }

  return deal.market_list_id
    ? (
      <div>
        <div className="Deal-markets-top">
          <Typography variant="h6" className="Deal-market-list-name">
            {list.name}
          </Typography>
          {renderRemove()}
        </div>
        <div>
          {renderMarkets()}
        </div>
      </div>
  )
  : (
    <div>
      <Autocomplete
        id="combo-box-demo"
        size="small"
        className="Deal-markets-autocomplete"
        options={lists}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => (
          <TextField
            size="small" {...params}
            label="Select a market list"
            variant="outlined"
          />
        )}
        onChange={(event, newValue) => updateMarketList(newValue)}
      />
    </div>
  );
};

export default DealMarkets;
