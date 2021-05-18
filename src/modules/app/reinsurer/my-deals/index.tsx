import './styles.css';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import authorization from '../../../../components/authorization';
import View from './view';

const ReinsurereDeals = (props: any) => {
  const deals = useSelector((state: StoreState) => state.deal);

  const navigateToDeal = (_id: string, timeline: boolean): void => {
    if (timeline) {
      props.history.push('/app/reinsurer/my-deals/timeline/' + _id);
    } else {
      props.history.push('/app/reinsurer/my-deals/' + _id);
    }
  };

  return (
    <View
      deals={deals.dealsFollowing}
      navigateToDeal={navigateToDeal}
    />
  );
};

export default authorization(ReinsurereDeals);
