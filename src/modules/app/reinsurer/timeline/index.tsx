import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import TimelineView from './view';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import authorization from '../../../../components/authorization';
import '../../../../components/timeline/styles.css';

const Timeline = (props) => {
  const dispatch = useDispatch();
  const deal_id = props.match.params.id;
  const user = useSelector((state: StoreState) => state.user);
  const dealState = useSelector((state: StoreState) => state.deal);
  let deal = dealState.accessibleDeals.filter(deal => deal._id === deal_id)[0];

  useEffect(() => {
    if (!deal) {
      dispatch({
        type: ActionTypes.SEARCH_DEALS,
        payload: user.details.account_id
      });
    }
  }, [deal])

  return deal ? (
    <TimelineView
      deal={deal}
    />
  )
  : <div>Loading...</div>
};

export default authorization(Timeline);
