import { useState } from 'react';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../styles';
import MarketCard from './market-card';

const ConfigureList = ({ addMarketToList, deleteList, deleteMarket, list, setMarketFieldModal, updateListName, visibleMarkets }) => {
  const classes = useStyles();

  const [editingName, setEditingName] = useState(false);
  const [listName, setListName] = useState('');

  const onClickCancel = () => {
    setEditingName(false)
    setListName('');
  };

  const onClickSave = () => {
    updateListName(listName);
    setListName('');
    setEditingName(false);
  }

  const renderMarkets = () => {
    return list.market_list.map(m => (
      <MarketCard
        deleteMarket={deleteMarket}
        key={m._id}
        market={m}
        setMarketFieldModal={setMarketFieldModal}
      />
    ));
  };

  const renderName = () => {
    if (!editingName) {
      return (
        <div className="configure-list-name">
          <Typography variant="h6">{list.name}</Typography>
          <Button 
            className={classes.editButton}
            color="primary"
            onClick={() => setEditingName(true)}
          >
            Edit
          </Button>
        </div>
      );
    }
    return (
      <div className="configure-list-name">
        <TextField
          label="Enter name of list"
          variant="outlined"
          size="small"
          style={{ width: 400 }}
          //@ts-ignore
          onChange={e => setListName(e.target.value)}
        />
        <Button 
          className={classes.editButton}
          onClick={onClickCancel}
        >
          Cancel
        </Button>
        <Button 
          className={classes.editButton}
          color="primary"
          onClick={onClickSave}
        >
          Save
        </Button>
      </div>
    );
  };

  return (
    <div className="Markets-configure">
      <div className="Markets-configure-header">
        {renderName()}
        <Button
          className="Market-configure-delete"
          onClick={deleteList}
        >
          Delete List
        </Button>
      </div>
      <div>
        <Autocomplete
          id="combo-box-demo"
          size="small"
          options={visibleMarkets}
          getOptionLabel={(option: any) => option.name}
          style={{ width: 400 }}
          renderInput={(params) => <TextField size="small" {...params} label="Add markets to this list" variant="outlined" />}
          onChange={(event, newValue) => addMarketToList(newValue)}
        />
      </div>
      <div className="configure-list-markets">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.subHeader}>Company name</TableCell>
                <TableCell align="right" className={classes.subHeader}>Name</TableCell>
                <TableCell align="right" className={classes.subHeader}>Title</TableCell>
                <TableCell align="right" className={classes.subHeader}>Email</TableCell>
                <TableCell align="right" className={classes.subHeader}>Phone</TableCell>
                <TableCell align="right" className={classes.subHeader}>Remove</TableCell>
              </TableRow>
            </TableHead>
            {renderMarkets()}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ConfigureList;
