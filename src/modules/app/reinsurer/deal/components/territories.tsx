import { Checkbox } from '@material-ui/core';
import { config } from '../../../../../config';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const Territories = ({ deal }) => {
  const territories = deal.territories || [];

  const createTable = () => {
    return territories.reduce((acc, curr) => {
      return { ...acc, [curr]: true };
    }, {});
  };

  const renderTerritories = () => {
    const table = createTable();

    const renderCheckOrNothing = (state: string) => {
      if (table[state]) {
        return (
          <div className="ReDeal-territory-check-div">
            <Checkbox
            size="small"
            checked={true}
            color="primary"
          />
          </div>
        );
      }
      return <div className="ReDeal-territory-check-div" />
    };

    return config.states.map(s => {
      return (
        <div className="Deal-territories-territory">
          {renderCheckOrNothing(s.abbreviation)}
          <div className="Deal-territories-name">{s.name}</div>
        </div>
      )
    });
  }

  return (
      <div className="Deal-territories-list ReDeal-territories">
        {renderTerritories()}
      </div>
  );
};

export default Territories;
