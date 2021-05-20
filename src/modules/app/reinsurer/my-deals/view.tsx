import { FC } from 'react';
import { Typography } from '@material-ui/core';
import { Deal as DealType } from '../../../../types/services/insurance';
import DealCard from './components/deal-card';
import useStyles from './styles';

interface MyDealsViewProps {
  deals: DealType[];
  navigateToDeal(str: string, timeline: boolean): void;
}

const View: FC<MyDealsViewProps> = ({ deals, navigateToDeal }) => {
  const classes = useStyles();

  const renderDeals = () => 
    deals.map(deal => (
      <DealCard
        deal={deal}
        navigateToDeal={navigateToDeal}
      />
    ));

  return (
    <div className="reinsurerDeals">
      <Typography variant="h5" className={classes.pageTitle}>
        My Deals
      </Typography>
      <div>
        {renderDeals()}
      </div>
    </div>
  );
};

export default View;
