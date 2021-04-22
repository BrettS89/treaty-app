import './styles.css';
import View from './view';
import authorization from '../../../../components/authorization';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store';

const MyDeals = (props) => {
  const deal = useSelector((state: StoreState) => state.deal);

  const navigateToDeal = (_id: string, screen: string): void => {
    if (screen === 'manage') {
      props.history.push('/app/broker/manage/' + _id);
    } else if (screen === 'edit') {
      props.history.push('/app/broker/my-deals/' + _id);
    }
    
  };

  return (
    <View
      myDeals={deal.myDeals}
      navigateToDeal={navigateToDeal}
    />
  );
};

export default authorization(MyDeals);
