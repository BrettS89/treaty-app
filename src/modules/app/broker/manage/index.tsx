import '../../../../components/timeline/styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import authorization from '../../../../components/authorization';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import View from './view';

import moment from 'moment';

const Manage = (props) => {
  // const date = moment('05112021', 'MMDDYYYY').subtract(7, 'days').calendar();
  // const date2 = moment('05172021', 'MMDDYYYY').subtract(14, 'days').calendar();
  // const date3 = moment('05172021', 'MMDDYYYY').subtract(21, 'days').calendar();
  // console.log(date, date2, date3);


  const dispatch = useDispatch();
  const deal_id = props.match.params.id;
  const deals = useSelector((state: StoreState) => state.deal);
  const deal = deals.myDeals.filter((deal) => deal._id === deal_id)[0];

  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [updateField, setUpdateFields] = useState({
    field: '',
    row: '',
    _id: '',
  });

  const updateTimelineStatus = (status: 'not_started' | 'started' | 'complete'): void => {
    dispatch({
      type: ActionTypes.UPDATE_TIMELINE,
      payload: {
        deal_id,
        field: updateField.field,
        row: updateField.row,
        status,
        _id: updateField._id,
      },
    });
    closeUpdateModal();
  };

  const openUpdateModal = (field: 'broker' | 'insurer' | 'reinsurer', row: 'row_1' | 'row_2', _id: string) => {
    setUpdateModalOpen(true);
    setUpdateFields({
      field,
      row,
      _id,
    });
  };

  const closeUpdateModal = () => {
    setUpdateFields({
      field: '',
      row: '',
      _id: '',
    });
    setUpdateModalOpen(false);
  };

  useEffect(() => {
    if (!deal) {
      dispatch({ type: ActionTypes.GET_MY_DEALS });
    }
  }, []);

  return deal ? (
    <View
      closeUpdateModal={closeUpdateModal}
      deal={deal}
      openUpdateModal={openUpdateModal}
      updateModalOpen={updateModalOpen}
      updateTimelineStatus={updateTimelineStatus}
    />
  )
    : <div>Loading...</div>
};

export default authorization(Manage);
