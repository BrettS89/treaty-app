import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import FileCard from './file-card';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));

const Files = ({ deal, removeFile, uploadFile }) => {
  const classes = useStyles();

  const renderFiles = () => {
    if (!deal.files || !deal.files.length) {
      return (
        <div className="deal-files-display">
          <Typography>
            You currently have no files uploaded for this deal
          </Typography>
        </div>
      );
    }
    return (
      <div className="deal-files-display">
        {deal.files.map(f => (
          <FileCard
            key={f._id}
            file={f}
            removeFile={removeFile}
            renderDelete
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        multiple={false}
        type="file"
        onChange={uploadFile}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" disableElevation>
          Upload File
        </Button>
      </label>

      {renderFiles()}
    </div>
  );
};

export default Files;
