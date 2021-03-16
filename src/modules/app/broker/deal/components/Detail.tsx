import { Button, TextField, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { Detail as DetailType } from '../../../../../types/services/insurance';

interface DetailProps {
  detail: DetailType;
  editingDetail: string;
  onSaveField(str?: string): void
  setEditedValue(str: string): void;
  setEditingDetail(str: string): void;
}

const Detail = (props: DetailProps) => {
  const { detail: { _id, key, value }, editingDetail, onSaveField, setEditedValue, setEditingDetail } = props;
  const classes = useStyles();

  const onCancelEdit = (): void => {
    setEditingDetail('');
    setEditedValue('');
  };

  const renderDetail = () => {
    if (editingDetail === key) {
      return (
        <div className="Detail">
          <div className="Detail-content">
            <Typography className={classes.detailKey}>
              {key}:
            </Typography>
            <TextField
              className={classes.detailInput}
              variant="outlined"
              label={key}
              autoComplete="off"
              size="small"
              onChange={e => setEditedValue(e.target.value)}
            />
          </div>
          <Button
            className={classes.leftMargin}
            color="primary"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
          <Button
            className={classes.leftMargin}
            color="primary"
            onClick={() => onSaveField(_id)}
          >
            Save
          </Button>
        </div>
      );
    }
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
          onClick={() => setEditingDetail(key)}
        >
          Edit
        </Button>
      </div>
    );
  }

  return renderDetail();
};

export default Detail;
