import { FC } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../styles';
import optionsConfig from '../../../broker/deal/options.config.json';
import { Deal as DealType } from '../../../../../types/services/insurance';

interface DetailsProps {
  deal: DealType;
  section: string;
  title: string;
}

const Details: FC<DetailsProps> = ({ deal, section, title }) => {
  const classes = useStyles();

  const createTable = () =>
    [
      ...optionsConfig[section].general,
      ...optionsConfig[section].xol,
      ...optionsConfig[section].surplus,
      ...optionsConfig[section].quotaShare,
      ...optionsConfig[section].programBusiness,
    ].reduce((acc, curr) => {
      return { ...acc, [curr.value]: true };
    }, {});

  const renderDetails = (): JSX.Element[] => {
    const table = createTable();

    return deal.details
      .filter((d) => table[d.key])
      .map((detail, i) => (
        <div className="ReDeal-details-display" style={i % 2 !== 0 ? { backgroundColor: '#F6F7FB', borderRadius: 3  } : {  }}>
          <Typography className={classes.detailsSectionKey}>{detail.key}:</Typography>
          <Typography>{detail.value}</Typography>
        </div>
      ));
  };

  return (
    <div>
      <Typography variant="h6" className={classes.detailsSectionTitle}>
        {title}
      </Typography>
      <div className="ReDeal-details">
        {renderDetails()}
      </div>
    </div>
  );
};

export default Details;
