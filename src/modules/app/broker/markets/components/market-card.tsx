import { Button, TextField, Typography } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const MarketCard = ({ deleteMarket, market, setMarketFieldModal }) => {
  const marketData = market?.contact ?? {
    name: 'Click to edit',
    email: '',
    phone: '',
  };

  const renderField = (field: string): JSX.Element => {
    if (field === 'name') {
      return (
        <div className="market-list-field color-blue hover">
          <span onClick={() => selectField(field)}>{marketData[field]}</span>
        </div>
      );
    }
    return (
      <div className="market-list-field">
        <span>{marketData[field]}</span>
      </div>
    );
    
  };

  const selectField = (field: string): void => {
    setMarketFieldModal(true, { field, id: market._id, account_id: market.account_id });
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell component="th" scope="row">
          {market.account.name}
        </TableCell>
        <TableCell align="right"><div>{renderField('name')}</div></TableCell>
        <TableCell align="right"><div>{renderField('title')}</div></TableCell>
        <TableCell align="right"><div>{renderField('email')}</div></TableCell>
        <TableCell align="right">{renderField('phone')}</TableCell>
        <TableCell
          align="right"
          onClick={() => deleteMarket(market._id)}
        >
          <DeleteForeverRoundedIcon
            className="market-list-trashcan"
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default MarketCard;
