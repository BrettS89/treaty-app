import './styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';

import View from './view';

const ReDeal = (props: any) => {
  const deal_id = props.match.params.id;
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user);
  let deal = useSelector((state: StoreState) => state.deal.accessibleDeals)
    .filter(deal => deal._id === deal_id)[0];

  useEffect(() => {
    if (!deal) {
      dispatch({
        type: ActionTypes.SEARCH_DEALS,
        payload: user.details.account_id
      });
    }
  }, []);
  
  return deal
    ? (
      <View
        deal={deal}
      />
    )
    : <div>Loading...</div>
};

export default ReDeal;
