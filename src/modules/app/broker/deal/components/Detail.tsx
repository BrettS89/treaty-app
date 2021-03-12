import { Button, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { Detail as DetailType } from '../../../../../types/services/insurance';

interface DetailProps {
  detail: DetailType;
  setEditing?(str: string): void
}

const Detail = (props: DetailProps) => {
  const { detail: { key, value }, setEditing} = props;
  const classes = useStyles();

  return (
    <div className="Detail">
      <div className="Detail-content">
      <Typography className={classes.detailKey}>
        {key}:
      </Typography>
      <Typography className={classes.detailValue}>
        {value}
      </Typography>
      </div>
      <Button
        className={classes.leftMargin}
        color="primary"
        onClick={() => setEditing('executive_summary')}
      >
        Edit
      </Button>

    </div>
  );
};

export default Detail;
