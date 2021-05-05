import { FC } from 'react';
import { Checkbox, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { Deal as DealType } from '../../../../../types/services/insurance'; 
import { config } from '../../../../../config';

interface TerritoryProps {
  deal: DealType;
  updateTerritory: any;
}

const Territory: FC<TerritoryProps> = ({ deal, updateTerritory }) => {
  const classes = useStyles();

  const selectAll = () => {
    if (deal.territories.length !== 51) {
      console.log(';hi')
      updateTerritory(null, null, config.states.map(s => s.abbreviation));
    } else {
      updateTerritory(null, null, [])
    }
  }

  const createTable = () => {
    const territories = deal.territories || [];
    return territories.reduce((acc, curr) => {
      return { ...acc, [curr]: true };
    }, {});
  };

  const renderTerritories = () => {
    const table = createTable();

    return config.states.map(s => {
      return (
        <div className="Deal-territories-territory">
          <Checkbox
            size="small"
            value={s.abbreviation}
            checked={table[s.abbreviation]}
            color="primary"
            onChange={() => updateTerritory(s.abbreviation, table[s.abbreviation])}
          />
          <div className="Deal-territories-name">{s.name}</div>
        </div>
      )
    });
  }

  return (
    <div>
      <div className="Deal-territories-top">
        <Typography variant="h6" className={classes.detailsSectionTitle}>
          Territory
        </Typography>
        <div className="Deal-territories-top-select-all">
          <Checkbox
            size="small"
            checked={deal.territories.length === 51}
            color="primary"
            onChange={selectAll}
          />
          <Typography>
            Select all
          </Typography>
        </div>
      </div>

      <div className="Deal-territories-list">
        {renderTerritories()}
      </div>
    </div>
  );
};

export default Territory;
