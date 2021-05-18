import './styles.css';

const DateCard = ({ date }) => {
  return (
    <div className="DateCard">
      <div style={{ borderRight: '1px solid lightgray', padding: 5 }}>
      {date}
      </div>
    </div>
  );
};

export default DateCard;
