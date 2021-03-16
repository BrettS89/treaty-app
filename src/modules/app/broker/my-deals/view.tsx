import { Typography } from '@material-ui/core';
import { Deal } from '../../../../types/services/insurance';
import DealCard from './components/DealCard';
import useStyles from './styles';

interface MyDealsProps {
  myDeals: Deal[];
  navigateToDeal(_id: string): void
}

const View = (props: MyDealsProps) => {
  const { myDeals, navigateToDeal } = props;
  const classes = useStyles();

  const renderMyDeals = () =>
    myDeals.map(deal => (
      <DealCard
        deal={deal}
        navigateToDeal={navigateToDeal}
      />
    ));
  
  return (
    <div className="MyDeals">
      <Typography variant="h4" className={classes.title}>
        My deals
      </Typography>
      <div>
        {renderMyDeals()}
      </div>
    </div>
  );
};

export default View;
