import { Typography } from '@material-ui/core';

const ListCard = ({ list, selectedList, selectList }) => {
  const color = selectedList?._id === list._id
    ? 'primary'
    : 'inherit'

  return (
    <div className="Markets-list-card" onClick={() => selectList(list)}>
      <Typography color={color} style={{ fontWeight: 600, fontSize: 15 }}>
        {list.name}
      </Typography>
      <span className="Markets-list-card-markets">
        {list.markets.length} Markets
      </span>
    </div>
  );
};

export default ListCard;
