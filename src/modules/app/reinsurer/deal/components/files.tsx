import { Typography } from '@material-ui/core';
import FileCard from '../../../broker/deal/components/file-card';

const Files = ({ deal }) => {
  const renderFiles = () => {
    if (!deal.files || !deal.files.length) {
      return (
        <div className="deal-files-display">
          <Typography>
            No files are currently uploaded for this deal.
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
            removeFile={() => []}
            renderDelete={false}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {renderFiles()}
    </div>
  );
};

export default Files;
