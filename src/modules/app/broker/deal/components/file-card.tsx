import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Typography } from '@material-ui/core';
import useStyles from '../styles';
import { downloadFile, limitText } from '../../../../../utilities/helpers';

const FileCard = ({ file, removeFile, renderDelete }) => {
  const classes = useStyles();

  const formatExtension = (contentType: string): string =>
    contentType.split('/')[1];

  const formatName = (filename: string): string => {
    const arr = filename.split('.');
    arr.pop();
    return arr.join('.');
  };

  const renderDeleteButton = () => {
    if (renderDelete) {
      return (
        <span
          className="hover"
          onClick={() => removeFile(file._id)}
        >
          <CloseRoundedIcon style={{ color: 'red', fontSize: 22 }} />
        </span>
      );
    }
    return <span />;
  };

  return (
    <div className="FileCard">
      <div className="FileCard-delete-row">
        {renderDeleteButton()}
      </div>
      <div
        className="hover FileCard-content"
        onClick={() => downloadFile(file.urls.delivery, file.name)}
      >
        <InsertDriveFileRoundedIcon
          style={{ fontSize: 65, color: '#069CEC' }}
        />
        <div className="FileCard-format">
          <Typography className={classes.fileFormat}>
            Format:
          </Typography>
          <Typography className={classes.fileType}>
            {formatExtension(file.meta.type)}
          </Typography>
        </div>
        <div className="FileCard-name">
          <Typography className={classes.fileName}>
            {limitText(formatName(file.name), 49)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
