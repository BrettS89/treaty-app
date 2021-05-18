import './styles.css';
import { Typography } from '@material-ui/core';

const Key = ({ title, color }) => {
  return (
    <div className="Timeline-Key">
      <div className="Timeline-key-color" style={{ backgroundColor: color }}></div>
      <Typography>{title}</Typography>
    </div>
  );
};

export default Key;
