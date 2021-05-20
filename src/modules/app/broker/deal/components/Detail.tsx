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
  const { detail: { _id, display_text, key, value }, editingDetail, onSaveField, setEditedValue, setEditingDetail } = props;
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
              {display_text}:
            </Typography>
            <TextField
              className={classes.detailInput}
              variant="outlined"
              placeholder={key}
              autoComplete="off"
              size="small"
              onChange={e => setEditedValue(e.target.value)}
            />
          </div>
          <div className="Deal-row">
            <Button
              className={classes.leftMargin}
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
        </div>
      );
    }
    return (
      <div className="Detail">
        <div className="Detail-content">
          <Typography className={classes.detailKey}>
            {display_text}:
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
