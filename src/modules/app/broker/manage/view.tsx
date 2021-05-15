import { Button, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';
import DateCard from './components/date-card';
import Key from './components/key';
const dates = ['10-15-2021', '10-22-2021', '10-29-2021', '11-05-2021', '11-12-2021', '11-19-2021', '11-26-2021', '12-3-2021', '12-10-2021', '12-17-2021', '12-24-2021', '12-31-2021'];

const ManageView = ({ deal }) => {
  const renderDates = () => dates.map(d => (
    <DateCard
      key={d}
      date={d}
    />
  ));

  const renderProgress = ({ field, row }) => {

  };
  
  return (
    <div className="Manage">
      <Typography variant="h4" className="title">
        {deal.title}
      </Typography>
      <div className="Manage-content">
        <div className="Manage-content-keys">
          <Key title="Not started" color="#e0e0e0" />
          <Key title="In Progress" color="#e0e0e0" />
          <Key title="Complete" color="#50c878" />
        </div>
        <div className="Manage-content-dates">
          {renderDates()}
        </div>
      </div>
    </div>
  );
};

export default ManageView;
