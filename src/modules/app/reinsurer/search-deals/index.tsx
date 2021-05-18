import './styles.css';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import authorization from '../../../../components/authorization';
import View from './view';

const SearchDeals = (props: any) => {
  const deals = useSelector((state: StoreState) => state.deal);

  const navigateToDeal = (_id: string, timeline: boolean = false): void => {
    if (timeline) {
      props.history.push('/app/reinsurer/search-deals/timeline/' + _id);
    } else {
      props.history.push('/app/reinsurer/search-deals/' + _id);
    }
    
  };
  
  return (
    <View
      deals={deals.accessibleDeals}
      navigateToDeal={navigateToDeal}
    />
  );
};

export default authorization(SearchDeals);
