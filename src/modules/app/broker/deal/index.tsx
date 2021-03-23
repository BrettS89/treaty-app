import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import authorization from '../../../../components/authorization';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import View from './view';
import app from '../../../../feathers';

const defaultDeal = {
  account_id: '',
  user_id: '',
  title: 'Title',
  detail_ids: [],
  details: [],
  insurance_company: 'Abc Insurance',
  executive_summary: 'Executive summary',
  additional_details: 'Additional details',
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
  const [editingDetail, setEditingDetail] = useState<string>('')
  const [editedValue, setEditedValue] = useState<string | number>(null);

  const onSaveField = (detail_id?: string) => {
    if (editingDetail) {
      dispatch({
        type: ActionTypes.EDIT_DETAIL,
        payload: {
          _id: detail_id,
          data: {
            value: editedValue,
          },
        },
      });
    } else {
      dispatch({
        type: ActionTypes.EDIT_DEAL,
        payload: {
          _id: deal._id,
          data: { [editing]: editedValue }
        },
      });
    }

    setEditingDetail('');
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
      editing={editing}
      editingDetail={editingDetail}
      onCancel={onCancel}
      onSaveField={onSaveField}
      setEditedValue={setEditedValue}
      setEditing={setEditing}
      setEditingDetail={setEditingDetail}
    />
  )
  : <div></div>
};

export default authorization(Deal);
