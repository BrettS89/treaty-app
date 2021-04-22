import './styles.css';
import { useState } from 'react';
import authorization from '../../../../components/authorization';
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
  const dealState = useSelector((state: StoreState) => state.deal);
  const isFollowing = !!dealState.dealsFollowing.find(d => d._id === deal_id)
  let deal = dealState.accessibleDeals.filter(deal => deal._id === deal_id)[0];

  const [rightComponent, setRightComponent] = useState<string>('TreatyInformation');

  const followDeal = (): void => {
    dispatch({ type: ActionTypes.FOLLOW_DEAL, payload: deal._id });
  };

  const unFollowDeal = () => {
    dispatch({ type: ActionTypes.UNFOLLOW_DEAL, payload: deal._id });
  };

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
        followDeal={followDeal}
        isFollowing={isFollowing}
        rightComponent={rightComponent}
        setRightComponent={setRightComponent}
        unFollowDeal={unFollowDeal}
      />
    )
    : <div>Loading...</div>
};

export default authorization(ReDeal);
