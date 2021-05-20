import { Typography } from '@material-ui/core';
import DateCard from '../../../../components/timeline/date-card';
import Key from '../../../../components/timeline/key';
import TaskCard from './components/task-card';
import { buildTimeline } from '../../../../utilities/helpers';

const dates = ['10-15-2021', '10-22-2021', '10-29-2021', '11-05-2021', '11-12-2021', '11-19-2021', '11-26-2021', '12-3-2021', '12-10-2021', '12-17-2021', '12-24-2021', '12-31-2021'];

const TimelineView = ({ deal }) => {
  const timeline = buildTimeline(deal.effective_date);

  const renderDates = () => timeline.map(d => (
    <DateCard
      key={d}
      date={d}
    />
  ));

  const renderProgress = (field, row) => {
    return deal.timeline[field][row].map((task, i) => (
      <TaskCard
        field={field}
        row={row}
        index={i}
        task={task}
        key={i}
      />
    ));
  };

  return (
    <div className="Manage-timeline">
      <Typography variant="h5" className="title">
        {deal.title}
      </Typography>
      <div className="Manage-content">
        <div className="Manage-content-top">
          <div>
            <Typography className="Manage-content-top-title" variant="h6">Treaty Timeline</Typography>
          </div>
          <div className="Manage-content-keys">
            <Key title="Not started" color="#e0e0e0" />
            <Key title="In Progress" color="#f0c201" />
            <Key title="Complete" color="#50c878" />
          </div>
        </div>
        <div className="Manage-content-dates">
          {renderDates()}
        </div>
        <div className="Manage-content-timeline">
          <div className="Manage-content-timeline-row" style={{ paddingBottom: 30, borderBottom: '1px solid lightgray' }}>
            <div style={{ width: 60, marginRight: 20, }}>
              Broker
            </div>
            <div style={{ width: '100%' }}>
              <div className="Manage-content-timeline-row-content">
                {renderProgress('broker', 'row_1')}
              </div>
              <div className="Manage-content-timeline-row-content">
                {renderProgress('broker', 'row_2')}
              </div>
            </div>
          </div>
          <div className="Manage-content-timeline-row" style={{ paddingBottom: 30, paddingTop: 30, borderBottom: '1px solid lightgray' }}>
            <div style={{ width: 60, marginRight: 20 }}>Insurer</div>
            <div style={{ width: '100%' }}>
              <div className="Manage-content-timeline-row-content">
                {renderProgress('insurer', 'row_1')}
              </div>
              <div className="Manage-content-timeline-row-content">
                {renderProgress('insurer', 'row_2')}
              </div>
            </div>
          </div>
          <div className="Manage-content-timeline-row" style={{ paddingBottom: 30, paddingTop: 30 }}>
            <div style={{ width: 60, marginRight: 20 }}>Reinsurer</div>
            <div style={{ width: '100%' }}>
              <div className="Manage-content-timeline-row-content">
                {renderProgress('reinsurer', 'row_1')}
              </div>
              <div className="Manage-content-timeline-row-content">
                {renderProgress('reinsurer', 'row_2')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
