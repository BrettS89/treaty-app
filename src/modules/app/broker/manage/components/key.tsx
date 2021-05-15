import { Typography } from '@material-ui/core';

const Key = ({ title, color }) => {
  return (
    <div className="Manage-Key">
      <div className="Manage-key-color" style={{ backgroundColor: color }}></div>
      <Typography>{title}</Typography>
    </div>
  );
};

export default Key;
