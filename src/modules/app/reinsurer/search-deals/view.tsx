import { Typography } from '@material-ui/core';
import DealCard from './components/DealCard';
import useStyles from './styles';
import { Deal as DealType } from '../../../../types/services/insurance';

interface SearchDealsProps {
  deals: DealType[];
  navigateToDeal(_id: string): void;
}

const View = (props: SearchDealsProps) => {
  const { navigateToDeal } = props;
  const classes = useStyles();

  const renderDeals = () => 
    props.deals.map(deal => (
      <DealCard
        deal={deal}
        navigateToDeal={navigateToDeal}
      />
    ));

  return (
    <div className="SearchDeals">
      <Typography variant="h4" className={classes.title}>
        Search Deals
      </Typography>
      <div>
        {renderDeals()}
      </div>
    </div>
  );
};

export default View;
