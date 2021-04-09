import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import authorization from '../../../../components/authorization';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import View from './view';
import app from '../../../../feathers';
import optionsConfig from './options.config.json';

const defaultDeal = {
  account_id: '',
  user_id: '',
  title: 'Title',
  detail_ids: [],
  details: [],
  insurance_company: 'Abc Insurance',
  insurance_type: 'TBD',
  business_covered: 'TBD',
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

  const [sideComponent, setSideComponent] = useState<string>('TreatyInformation');
  const [editing, setEditing] = useState<string>('');
  const [editingDetail, setEditingDetail] = useState<string>('')
  const [editedValue, setEditedValue] = useState<string | number>(null);
  const [menuOptions, setMenuOptions] = useState<{ value: string; name: string }[]>([])
  const [generalTermsOptions, setGeneralTermsOptions] = useState<{ value: string; name: string }[]>([])
  const [expensesOptions, setExpensesOptions] = useState<{ value: string; name: string }[]>([])

  if (deal) {
    dealData = {
      ...defaultDeal,
      ...deal,
    };
  }

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
    } else {
      const expensesOptionsArr: { value: string, name: string }[] = [
        ...optionsConfig.expenses.general,
      ];

      const options = [
        { value: 'projected_premium', name: 'Projected premium' },
        { value: 'company_retention', name: 'Company retention' },
        { value: 'limit', name: 'Limit' },
        { value: 'total_insured_value', name: 'Total insured value' },
        { value: 'projected_loss_ratio', name: 'Projected loss ratio' },
      ];

      if (deal.treaty_type.includes('Excess of loss')) {

        // options.push({ value: 'premium_rate', name: 'Premium rate' });
        // options.push({ value: 'reinstatement', name: 'Reinstatement' });
        options.push({ value: 'reinsurance_rate', name: 'Reinsurance rate' });
        options.push({ value: 'reinstatement', name: 'Reinstatement' });
      }

      if (deal.treaty_type.includes('Surplus')) {
        options.push({ value: 'ceding_percentage', name: 'Ceding percentage' });
        options.push({ value: 'surplus_retention', name: 'Surplus retention' });
        options.push({ value: 'surplus_reinsured_proportion_percentage', name: 'Surplus reinsured proportion or percentage' });
        options.push({ value: 'surplus_insured_value', name: 'Surplus insured value' });
      }

      if (deal.treaty_type.includes('Quota share')) {
        // options.push({ value: 'ceding_percentage', name: 'Ceding percentage' });
        options.push({ value: 'ceding_comission', name: 'Ceding comission' });
      }

      if (deal.program_business) {
        options.push({ value: 'mga_mgu', name: 'Name of MGA/MGU' });
        options.push({ value: 'mga_commision', name: 'MGA comission' });
        options.push({ value: 'carrier_retention', name: 'Carrier retention' });
        options.push({ value: 'mga_retention', name: 'MGA retention' });
      }

      const details = deal.details.map(d => d.key);

      const filteredOptions = options.filter(o => !details.includes(o.value));
      const filteredExpenseOptions = expensesOptions.filter(o => !details.includes(o.value));
      const uniqueOptions: { value: string; name: string }[] = [];

      filteredOptions.forEach(o => {
        if (!uniqueOptions.find(option => option.value === o.value)) {
          uniqueOptions.push(o);
        }
      });

      setMenuOptions(uniqueOptions);
      setExpensesOptions(filteredExpenseOptions);
    }
  }, [deal]);
  
  return deal
    ? (
    <View
      addDetail={addDetail}
      deal={dealData}
      editing={editing}
      editingDetail={editingDetail}
      expensesOptions={expensesOptions}
      menuOptions={menuOptions}
      onCancel={onCancel}
      onSaveField={onSaveField}
      setEditedValue={setEditedValue}
      setEditing={setEditing}
      setEditingDetail={setEditingDetail}
      setSideComponent={setSideComponent}
      sideComponent={sideComponent}
    />
  )
  : <div></div>
};

export default authorization(Deal);
