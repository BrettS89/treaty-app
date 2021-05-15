import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authorization from '../../../../components/authorization';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
// import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import View from './view';

const Manage = (props) => {
  const dispatch = useDispatch();
  const deal_id = props.match.params.id;
  const deals = useSelector((state: StoreState) => state.deal);
  const deal = deals.myDeals.filter((deal) => deal._id === deal_id)[0];

  useEffect(() => {
    if (!deal) {
      dispatch({ type: ActionTypes.GET_MY_DEALS });
    }
  }, [deal]);

  return deal ? (
    <View
      deal={deal}
    />
  )
  : <div>Loading...</div>
};

export default authorization(Manage);
