import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import authorization from '../../../../components/authorization';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import View from './view';
import app from '../../../../feathers';

const defaultDeal: DealType = {
  account_id: '',
  user_id: '',
  title: 'Title',
  detail_ids: [],
  details: [],
  executive_summary: 'Executive Summary',
  location: ['New York', 'New Jersey'],
};

const Deal = (props: any) => {
  const dispatch = useDispatch();
  const deal_id = props.match.params.id;
  const deals = useSelector((state: StoreState) => state.deal);
  const deal = deals.myDeals.filter((deal) => deal._id === deal_id)[0];
  let dealData: DealType;

  if (deal) {
    dealData = {
      ...defaultDeal,
      ...deal,
    };
  }

  const [editing, setEditing] = useState<string>('');
  const [editedValue, setEditedValue] = useState<string | number>(null);
  const [detailsList, setDetailsList] = useState<JSX.Element[]>([]);

  const onSaveField = () => {
    dispatch({
      type: ActionTypes.EDIT_DEAL,
      payload: {
        _id: deal._id,
        data: { [editing]: editedValue }
      },
    });

    setEditing('');
    setEditedValue(null);
  };

  const onCancel = () => {
    setEditing('');
    setEditedValue(null);
  };

  const addDetail = (e: any): void => {
    const key = e.target.value;

    app.service('insurance/detail')
      .create({
        deal_id: deal._id,
        key,
        value: 'default',
      })
      .then((detail: DetailType) => {
        dispatch({
          type: ActionTypes.EDIT_DEAL,
          payload: {
            _id: deal._id,
            data: { detail_ids: [...deal.detail_ids, detail._id] },
          },
        });
      });
  };
  
  useEffect(() => {
    if (!deal) {
      dispatch({ type: ActionTypes.GET_MY_DEALS });
    }
  }, []);
  
  return deal
    ? (
    <View
      addDetail={addDetail}
      deal={dealData}
      detailsList={detailsList}
      editing={editing}
      onCancel={onCancel}
      onSaveField={onSaveField}
      setDetailsList={setDetailsList}
      setEditedValue={setEditedValue}
      setEditing={setEditing}
    />
  )
  : <div></div>
};

export default authorization(Deal);