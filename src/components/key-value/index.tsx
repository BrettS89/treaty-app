import { FC } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

interface KeyValueProps {
  keyString: string;
  valueString: string | number;
}

const KeyValue: FC<KeyValueProps> = ({ keyString, valueString }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography className={classes.key}>
        {keyString}
      </Typography>
      <Typography>
        {valueString}
      </Typography>
    </div>
  );
};

export default KeyValue;
