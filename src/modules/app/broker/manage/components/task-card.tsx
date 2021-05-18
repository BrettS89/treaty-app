const TaskCard = ({ field, row, index, task, openUpdateModal }) => {
  const backgroundColor = () => {
    if (task.status === 'not_started') return '#e0e0e0';
    if (task.status === 'started') return '#fbc02d';
    if (task.status === 'complete') return '#50c878';
  };

  const color = task.status === 'not_started' ? 'black' : '#fff';

  const renderBlank = () => {
    return (
      <div style={{ display: 'flex', width: `${task.weeks}%`, padding: 5 }}>
        <div></div>
      </div>
    );
  };

  const renderTask = () => {
    return (
      <div style={{ display: 'flex', width: `${task.weeks}%`, padding: 5 }} className="hover" onClick={() => openUpdateModal(field, row, task._id)}>
        <div style={{ backgroundColor: backgroundColor(), color, width: '100%', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, padding: 5  }}>
          {task.name}
        </div>
        
      </div>
    );
  };

  return task.is_blank ? renderBlank() : renderTask();
};

export default TaskCard;
